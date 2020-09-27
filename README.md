# locustjs-signals
This library implements publisher-subscribe pattern and provides utility classes in this topic.

# Classes

## SubscriptionManagerBase
This class is the abstraction of subscription managers.

```javascript
class SubscriptionManagerBase {
	subscribe(event, eventHandler, config) { ... }
	dispatch(event, data) { ... }
	disable(subscription) { ... }
	enable(subscription) { ... }
	unsubscribe(subscription) { ... }
}
```

Methods:

|Method|Description|
|--|--|
|subscribe|subscribes the given event handler for the specified event.|
|dispatch|trigger event, sending data to all subscriber of the given event|
|enable|enable subscriber|
|disable|disable subscriber|
|unsubscribe|unsubscribe the subscriber|



## SubscriptionManagerDefault
Default implementation of SubscriptionManagerBase. It uses an internal array to store subscribers, hence, the instance of this subscription manager should be used as a singleton object in order to perform correctly.

# examples

example 1

```javascript
const sm = new SubscriptionManagerDefault();

const s1 = sm.subscribe('todo_added', x => console.log(`todo added: ${JSON.stringify(x)}`));
const s2 = sm.subscribe('todo_updated', x => console.log(`todo updated: ${JSON.stringify(x)}`));
const s2 = sm.subscribe('todo_removed', x => console.log(`todo removed: ${JSON.stringify(x)}`));

sm.dispatch('todo_added', { id: 1, title: 'Checking emails', done: false });
sm.dispatch('todo_updated', { id: 1, done: true });
sm.dispatch('todo_removed', { id: 1 });

sm.unsubscribe(s1);
sm.unsubscribe(s2);
sm.unsubscribe(s3);
```

example 2
```javascript
class TodoManager {
	constructor(subscriptionManager) {
		this._todos = [];
		this.sm = subscriptionManager;
	}
	add(todo) {
		this._todos.push(todo);
		sm.dispatch('todo_added', todo);
	}
	findIndex(todo) {
		return this._todos.findIndex(x => x.id === todo.id);
	}
	update(newTodo) {
		const index = this.findIndex(newTodo);
		
		if (index >= 0) {
			const oldTodo = this._todos[index];
			const updatedTodo = Object.assign({}, oldTodo, newTodo);
			this._todos.splice(index, 1, updatedTodo);
			
			sm.dispatch('todo_updated', newTodo);
			
			return true;
		}
		
		return false;
	}
	remove(todo) {
		const index = this.findIndex(todo);
		
		if (index >= 0) {
			this._todos.splice(index, 1);
			
			sm.dispatch('todo_removed', todo);
			
			return true;
		}
		
		return false;
	}
	getAll() {
		return this._todos;
	}
}

const sm = new SubscriptionManagerDefault();

const s1 = sm.subscribe('todo_added', x => console.log(`todo added: ${JSON.stringify(x)}`));
const s2 = sm.subscribe('todo_updated', x => console.log(`todo updated: ${JSON.stringify(x)}`));
const s2 = sm.subscribe('todo_removed', x => console.log(`todo removed: ${JSON.stringify(x)}`));

const tm = new TodoManager();

tm.add({ id: 1, title: 'Checking emails', done: false });
tm.update({ id: 1, done: true });
tm.remove{ id: 1 });

sm.unsubscribe(s1);
sm.unsubscribe(s2);
sm.unsubscribe(s3);
```
