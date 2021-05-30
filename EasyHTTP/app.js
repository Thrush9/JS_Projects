//const http = new EasyHTTP();

// http.get(
//   'https://jsonplaceholder.typicode.com/posts',
//   function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(response);
//     }
//   }
// );

// http.get(
//   'https://jsonplaceholder.typicode.com/posts/1',
//   function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(response);
//     }
//   }
// );

const data = {
  title: 'Custom Post',
  body: 'This is test data body',
};

// http.post(
//   'https://jsonplaceholder.typicode.com/posts',
//   data,
//   function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(response);
//     }
//   }
// );

// http.put(
//   'https://jsonplaceholder.typicode.com/posts/1',
//   data,
//   function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(response);
//     }
//   }
// );

// http.delete(
//   'https://jsonplaceholder.typicode.com/posts/1',
//   function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(response);
//     }
//   }
// );

/////////////////////////////////////////////////////////////////

const http = new EasyHTTP();
http
  .get('https://jsonplaceholder.typicode.com/users')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const data1 = {
  name: 'John Valery',
  username: 'valeryJ',
  email: 'valery@gmail.com',
};

http
  .post('https://jsonplaceholder.typicode.com/users', data1)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

http
  .put('https://jsonplaceholder.typicode.com/users/2', data1)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

http
  .delete('https://jsonplaceholder.typicode.com/users/2')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
