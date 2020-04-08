# Common patterns used in Boa

- [Timeouts](#timeouts)

## Timeouts

When using timeouts inside Vue components it's important to clear them upon a component's destruction. This is to avoid timeout's firing should the user navigate away before the time is out (e.g. a route change, when the user has already moved on).

The ideal solution is to use the destroy hook to get rid of a timeout.

```js
const timeout = setTimeout(() => {
  // Do something
}, 4000)
this.$once('hook:destroyed', () => {
  clearTimeout(timeout)
})
```

By using the \$once hook, we avoid unnecessary use of data props to store the timeout. This pattern is common in mounted hooks.

If you need to set a timeout in one place, but might have to clear it from multiple places, you can store a reference in a variable like so:

```js
// Set the timeout somewhere, maybe from a method
this.timeout = setTimeout(() => {
  // Do something
}, 4000);

// Clear the timeout from another method
someOtherMethod() {
  clearTimeout(this.timeout);
}
```
