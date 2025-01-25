// Asynchronous are non-blocking
setTimeout(() => {
    console.log("1A")
}, 2000)//milliseconds


// Synchronous
console.log("1")
console.log("2")


// javascript is synchronous or asynchronous
// JavaScript is fundamentally single-threaded and synchronous, 
// but it supports asynchronous operations through: Callbacks, Promises, Async/await, Web APIs (e.g. setTimeout, DOM events, fetch)
// these functions comes from node js, global objects