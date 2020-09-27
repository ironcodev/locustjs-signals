"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidSubscriptionException = exports.SubscriptionNotFoundException = exports.EventNotFoundException = exports.InvalidEventHandlerException = exports.SubscriptionManagerDefault = exports.SubscriptionManagerBase = void 0;

var _locustjsException = require("locustjs-exception");

var _locustjsBase = require("locustjs-base");

var _locustjsExtensionsArray = require("locustjs-extensions-array");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InvalidEventHandlerException = /*#__PURE__*/function (_Exception) {
  _inherits(InvalidEventHandlerException, _Exception);

  var _super = _createSuper(InvalidEventHandlerException);

  function InvalidEventHandlerException(host) {
    _classCallCheck(this, InvalidEventHandlerException);

    return _super.call(this, {
      status: 'invalid-event-handler',
      message: "invalid event handler. expected function.",
      host: host
    });
  }

  return InvalidEventHandlerException;
}(_locustjsException.Exception);

exports.InvalidEventHandlerException = InvalidEventHandlerException;

var EventNotFoundException = /*#__PURE__*/function (_Exception2) {
  _inherits(EventNotFoundException, _Exception2);

  var _super2 = _createSuper(EventNotFoundException);

  function EventNotFoundException(event, host) {
    _classCallCheck(this, EventNotFoundException);

    return _super2.call(this, {
      status: 'event-not-found',
      message: "event ".concat(event, " was not found."),
      host: host
    });
  }

  return EventNotFoundException;
}(_locustjsException.Exception);

exports.EventNotFoundException = EventNotFoundException;

var SubscriptionNotFoundException = /*#__PURE__*/function (_Exception3) {
  _inherits(SubscriptionNotFoundException, _Exception3);

  var _super3 = _createSuper(SubscriptionNotFoundException);

  function SubscriptionNotFoundException(subscription, host) {
    _classCallCheck(this, SubscriptionNotFoundException);

    return _super3.call(this, {
      status: 'subscriber-not-found',
      message: "subscriber ".concat(subscription, " was not found."),
      host: host
    });
  }

  return SubscriptionNotFoundException;
}(_locustjsException.Exception);

exports.SubscriptionNotFoundException = SubscriptionNotFoundException;

var InvalidSubscriptionException = /*#__PURE__*/function (_Exception4) {
  _inherits(InvalidSubscriptionException, _Exception4);

  var _super4 = _createSuper(InvalidSubscriptionException);

  function InvalidSubscriptionException(subscription, host) {
    _classCallCheck(this, InvalidSubscriptionException);

    return _super4.call(this, {
      status: 'invalid-subscription',
      message: "invalid subscription '".concat(subscription, "'."),
      host: host
    });
  }

  return InvalidSubscriptionException;
}(_locustjsException.Exception);

exports.InvalidSubscriptionException = InvalidSubscriptionException;

function throwIfInvalidHandler(eventHandler, host) {
  if (typeof eventHandler != 'function') {
    throw new InvalidEventHandlerException(host);
  }
}

var SubscriptionManagerBase = /*#__PURE__*/function () {
  function SubscriptionManagerBase(config) {
    _classCallCheck(this, SubscriptionManagerBase);

    (0, _locustjsException.throwIfInstantiateAbstract)(SubscriptionManagerBase, this);
    this._config = Object.assign({
      throwInvalidEvents: false,
      haltOnErrors: true
    }, config);
  }

  _createClass(SubscriptionManagerBase, [{
    key: "subscribe",
    value: function subscribe(event, eventHandler, config) {
      (0, _locustjsException.throwNotImplementedException)('SubscriptionManagerBase.subscribe');
    }
  }, {
    key: "dispatch",
    value: function dispatch(event, data) {
      (0, _locustjsException.throwNotImplementedException)('SubscriptionManagerBase.dispatch');
    }
  }, {
    key: "disable",
    value: function disable(subscription) {
      (0, _locustjsException.throwNotImplementedException)('SubscriptionManagerBase.disable');
    }
  }, {
    key: "enable",
    value: function enable(subscription) {
      (0, _locustjsException.throwNotImplementedException)('SubscriptionManagerBase.enable');
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(subscription) {
      (0, _locustjsException.throwNotImplementedException)('SubscriptionManagerBase.unsubscribe');
    }
  }, {
    key: "config",
    get: function get() {
      return this._config;
    }
  }]);

  return SubscriptionManagerBase;
}();

exports.SubscriptionManagerBase = SubscriptionManagerBase;

var SubscriptionManagerDefault = /*#__PURE__*/function (_SubscriptionManagerB) {
  _inherits(SubscriptionManagerDefault, _SubscriptionManagerB);

  var _super5 = _createSuper(SubscriptionManagerDefault);

  function SubscriptionManagerDefault(config) {
    var _this;

    _classCallCheck(this, SubscriptionManagerDefault);

    _this = _super5.call(this, config);
    _this._store = [];
    return _this;
  }

  _createClass(SubscriptionManagerDefault, [{
    key: "_findEvent",
    value: function _findEvent(event) {
      var index = this._store.findIndex(function (x) {
        return x.event === event;
      });

      return index;
    }
  }, {
    key: "subscribe",
    value: function subscribe(event, eventHandler, config) {
      throwIfInvalidHandler(eventHandler);
      var result;

      var index = this._findEvent(event);

      if (index >= 0) {
        this._store[index].subscribers.push(Object.assign({
          eventHandler: eventHandler,
          async: false,
          disabled: false
        }, config));

        result = index.toString() + '.' + (this._store[index].subscribers.length - 1).toString();
      } else {
        this._store.push({
          event: event,
          subscribers: [Object.assign({
            eventHandler: eventHandler,
            async: false,
            disabled: false
          }, config)]
        });

        result = (this._store.length - 1).toString() + '.0';
      }

      return result;
    }
  }, {
    key: "dispatch",
    value: function dispatch(event, data) {
      var index = this._findEvent(event);

      if (index >= 0) {
        for (var i = 0; i < this._store[index].subscribers.length; i++) {
          var subscriber = this._store[index].subscribers[i];

          if (subscriber.disabled) {
            continue;
          }

          var result = subscriber.eventHandler(data, subscriber.state, this);

          if (result != null) {
            if ((0, _locustjsBase.isBool)(result) && !result) {
              break;
            }
          }
        }
      } else {
        if (this.config.throwInvalidEvents) {
          throw new EventNotFoundException(event);
        }
      }
    }
  }, {
    key: "_findSubscription",
    value: function _findSubscription(subscription) {
      var entryIndex = -1;
      var subscriberIndex = -1;

      if (isFunction(subscription)) {
        for (var i = 0; i < this._store.length; i++) {
          for (var j = 0; j < this._store[i].subscribers.length; j++) {
            if (this._store[i].subscribers[j].eventHandler == subscription) {
              entryIndex = i;
              subscriberIndex = j;
              break;
            }
          }
        }
      } else if ((0, _locustjsBase.isString)(subscription)) {
        if (subscription.length) {
          var parts = subscription.split('.');

          if (parts.length > 1 && (0, _locustjsBase.isNumeric)(parts[0]) && (0, _locustjsBase.isNumeric)(parts[1])) {
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
        return {
          entryIndex: entryIndex,
          subscriberIndex: subscriberIndex
        };
      } else {
        throw new SubscriptionNotFoundException(subscription);
      }
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(subscription) {
      var item = this._findSubscription(subscription);

      (0, _locustjsExtensionsArray.removeAt)(this._store[item.entryIndex].subscribers, item.subscriberIndex);
    }
  }, {
    key: "disable",
    value: function disable(subscription) {
      var item = this._findSubscription(subscription);

      this._store[item.entryIndex].subscribers[item.subscriberIndex].disabled = true;
    }
  }, {
    key: "enable",
    value: function enable(subscription) {
      var item = this._findSubscription(subscription);

      this._store[item.entryIndex].subscribers[item.subscriberIndex].disabled = false;
    }
  }]);

  return SubscriptionManagerDefault;
}(SubscriptionManagerBase);

exports.SubscriptionManagerDefault = SubscriptionManagerDefault;