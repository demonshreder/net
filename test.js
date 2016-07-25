var http = require('http');
var a = 0;
var b = 0;
for (var i = 0; i < 10000; i+=1){
http.get('http://localhost:3000', (res) => {
    // if(res.statusCode == 200){
    //     a+=1;
    // }
    // else if(res.sta) {

    // }
  console.log(`Got response: ${res.statusCode}`);
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
}
// for (var i = 0; i < 1000; i+=1){
// http.get('http://localhost:3000', (res) => {
//   console.log(`Got response: ${res.statusCode}`);
//   // consume response body
//   res.resume();
// }).on('error', (e) => {
//   console.log(`Got error: ${e.message}`);
// });
// }
// for (var i = 0; i < 1000; i+=1){
// http.get('http://localhost:3000', (res) => {
//   console.log(`Got response: ${res.statusCode}`);
//   // consume response body
//   res.resume();
// }).on('error', (e) => {
//   console.log(`Got error: ${e.message}`);
// });
// }