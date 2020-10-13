import { Exception, throwIfInstantiateAbstract, throwNotImplementedException } from 'locustjs-exception';
import { isEmpty, isBool, isNumeric, isString, isFunction } from 'locustjs-base';
import { removeAt } from 'locustjs-extensions-array';

class InvalidEventException extends Exception {
    constructor(host) {
        super({
            status: 'invalid-event',
            message: `invalid event.`,
            host
        });
    }
}

class InvalidEventHandlerException extends Exception {
    constructor(host) {
        super({
            status: 'invalid-event-handler',
            message: `invalid event handler. expected function.`,
            host
        });
    }
}

class EventNotFoundException extends Exception {
    constructor(event, host) {
        super({
            status: 'event-not-found',
            message: `event ${event} was not found.`,
            host
        });
    }
}

class SubscriptionNotFoundException extends Exception {
    constructor(subscription, host) {
        super({
            status: 'subscriber-not-found',
            message: `subscriber ${subscription} was not found.`,
            host
        });
    }
}

class InvalidSubscriptionException extends Exception {
    constructor(subscription, host) {
        super({
            status: 'invalid-subscription',
            message: `invalid subscription '${subscription}'.`,
            host
        });
    }
}

function throwIfInvalidHandler(eventHandler, host) {
    if (typeof eventHandler != 'function') {
        throw new InvalidEventHandlerException(host);
    }
}

function throwIfInvalidEvent(event, host) {
    if (isEmpty(event)) {
        throw new InvalidEventException(host);
    }
}

class SubscriptionManagerBase {
    constructor(config) {
        throwIfInstantiateAbstract(SubscriptionManagerBase, this);

        this._config = Object.assign({
			throwOnDispatchError: false,
            throwInvalidEvents: false,
            haltOnErrors: true
        }, config);
    }
    get config() {
        return this._config;
    }
    subscribe(event, eventHandler, config) {
        throwNotImplementedException('SubscriptionManagerBase.subscribe');
    }
    dispatch(event, data) {
        throwNotImplementedException('SubscriptionManagerBase.dispatch');
    }
    disable(subscription) {
        throwNotImplementedException('SubscriptionManagerBase.disable');
    }
    enable(subscription) {
        throwNotImplementedException('SubscriptionManagerBase.enable');
    }
    unsubscribe(subscription) {
        throwNotImplementedException('SubscriptionManagerBase.unsubscribe');
    }
	pause() {
        throwNotImplementedException('SubscriptionManagerBase.pause');
    }
    resume() {
        throwNotImplementedException('SubscriptionManagerBase.resume');
    }
}

class SubscriptionManagerDefault extends SubscriptionManagerBase {
    constructor(config) {
        super(config);

        this._store = [];
		this._pendingEvents = [];
		this._paused = false;
    }
    _findEvent(event) {
        const index = this._store.findIndex(x => x.event === event);

        return index;
    }
    subscribe(event, eventHandler, state) {
		throwIfInvalidEvent(event);
        throwIfInvalidHandler(eventHandler);

        let result;
        const index = this._findEvent(event);

        if (index >= 0) {
            this._store[index].subscribers.push({
                eventHandler: eventHandler,
                async: false,
                disabled: false,
				state: state
            });

            result = index.toString() + '.' + (this._store[index].subscribers.length - 1).toString()
        } else {
            this._store.push({
                event: event,
                subscribers: [{
						eventHandler: eventHandler,
						async: false,
						disabled: false,
						state: state
					}
                ]
            });

            result = (this._store.length - 1).toString() + '.0';
        }

		if (!this._paused) {
			this._dispatchPendings(event);
		}
		
        return result;
    }
	_dispatchPendings(event) {
		let i = 0;
		
		while (i < this._pendingEvents.length) {
			const item = this._pendingEvents[i];
			
			if (item.event == event || event == undefined) {
				this.dispatch(item.event, item.data);
				
				this._pendingEvents.splice(i, 1);
			} else {
				i++;
			}
		}
	}
    dispatch(event, data) {
		throwIfInvalidEvent(event);
		
        const index = this._findEvent(event);

        if (index >= 0) {
			if (this._paused || this._store[index].subscribers.length == 0) {
				this._pendingEvents.push({ event, data });
			} else {
				this._dispatchPendings(event);
				
				for (let i = 0; i < this._store[index].subscribers.length; i++) {
					const subscriber = this._store[index].subscribers[i];

					if (subscriber.disabled) {
						continue;
					}

					let result;
					
					try {
						result = subscriber.eventHandler(data, subscriber.state, this);
					} catch (e) {
						if (this.config.haltOnErrors) {
							if (this.config.throwOnDispatchError) {
								throw e;
							} else {
								break;
							}
						} else {
							continue;
						}
					}

					if (result != null) {
						if (isBool(result) && !result) {
							break;
						}
					}
				}
			}
        } else {
            if (this.config.throwInvalidEvents) {
                throw new EventNotFoundException(event);
            } else {
				this._store.push({
					event: event,
					subscribers: []
				});
				this._pendingEvents.push({ event, data });
			}
        }
    }
    _findSubscription(subscription) {
        let entryIndex = -1;
        let subscriberIndex = -1;

        if (isFunction(subscription)) {
            for (let i = 0; i < this._store.length; i++) {
                for (let j = 0; j < this._store[i].subscribers.length; j++) {
                    if (this._store[i].subscribers[j].eventHandler == subscription) {
                        entryIndex = i;
                        subscriberIndex = j;
                        break;
                    }
                }
            }
        } else if (isString(subscription)) {
            if (subscription.length) {
                const parts = subscription.split('.');

                if (parts.length > 1 && isNumeric(parts[0]) && isNumeric(parts[1])) {
                    entryIndex = parseInt(parts[0]);
                    subscriberIndex = parseInt(parts[1]);
                } else {
                    throw new InvalidSubscriptionException(subscription);
                }
            }
        } else {
            throw new InvalidSubscriptionException(subscription);
        }

        if (entryIndex >= 0 && subscriberIndex >= 0) {
            return { entryIndex, subscriberIndex };
        } else {
            throw new SubscriptionNotFoundException(subscription);
        }
    }
    unsubscribe(subscription) {
        const item = this._findSubscription(subscription);

        removeAt(this._store[item.entryIndex].subscribers, item.subscriberIndex);
    }
    disable(subscription) {
        const item = this._findSubscription(subscription);

        this._store[item.entryIndex].subscribers[item.subscriberIndex].disabled = true;
    }
    enable(subscription) {
        const item = this._findSubscription(subscription);

        this._store[item.entryIndex].subscribers[item.subscriberIndex].disabled = false;
    }
	pause() {
        this._paused = true;
    }
    resume() {
		this._dispatchPendings();
		
        this._paused = false;
    }
}

export {
	SubscriptionManagerBase,
	SubscriptionManagerDefault,
	InvalidEventException,
    InvalidEventHandlerException,
    EventNotFoundException,
    SubscriptionNotFoundException,
    InvalidSubscriptionException
}