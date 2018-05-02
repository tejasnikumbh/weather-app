const os = require('os');

var user = os.userInfo();

console.log(`Starting app...`);
console.log(`Author: ${user.username}`);

// Simple Async Example
console.log(`Task 1 is printing this.`);
console.log(`Task 2 is printing this.`);

setTimeout(() => {
  console.log(`Async call 1.`);
},2000);

setTimeout(() => {
  console.log(`Async call 2`);
}, 0);

console.log(`Finsihed executing app.`);
