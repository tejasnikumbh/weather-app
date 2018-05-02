var asyncAdd = (a, b) => {
  return new Promise((resolve, reject)=>{
    if(typeof a === 'number' && typeof b === 'number') {
      resolve(a + b);
    } else {
      reject(`For async add, both operants must be of number type`);
    }
  });
};

// Nested promises. Alternate way below useful here
asyncAdd(5, 7).then((res) => { // Success callback
  console.log(`First result:`, res);
  return asyncAdd(res, 33);
})
.then((res) => {
  console.log(`Should be 45`);
  console.log(`Second nested result:`, res);
  return asyncAdd(res, 12);
})
.then((res) => {
  console.log(`Should be 57`);
  console.log(`Third nested result:`, res);
})
.catch((errorMessage) => { // failure callback, called when reject called inside promise
  console.log(errorMessage);
});

// Alternate way for simple resolve and reject
// asyncAdd(5, '7').then((res) => {
//     console.log(res);
// })
// .catch((errorMessage) =>{
//     console.log(errorMessage);
// });
// Simple resolve and reject for the promise
// asyncAdd(5, '7').then((res) =>{
//   console.log(res);
// }, (errorMessage) =>{
//   console.log(errorMessage);
// });


// var somePromise = new Promise((resolve, reject)=>{
//   setTimeout(() => {
//     resolve('Resolution message...');
//     //reject('Rejection message');
//   },2000);
// });
//
// somePromise.then((message)=>{
//   // Resolve function
//   console.log(`Promise resolved.`);
//   console.log(message);
// }, (message) => {
//   // Reject function
//   console.log(`Promise rejected.`);
//   console.log(message);
// });
