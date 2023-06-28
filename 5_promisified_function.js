
const request = require('request');

const getGoogleHomePage = (finalCallBack) => {
  return new Promise((resolve, reject) => {
    request('http://www.google.com', (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        console.log('statusCode:', response && response.statusCode);// Print the response status
        resolve(response,body);
    }
});
});
};

getGoogleHomePage()
.then((response,body) => {
    console.log('statusCode:', response && response.statusCode);// Print the response status
      finalCallBack(null,body);// Print the HTML for the Google homepage.
  })
  .catch((error) => {
    console.error('error:', error); // Print the error if one occurred
    finalCallBack(error);
  });


console.log(getGoogleHomePage((result)=>{
console.log("RESULT==>",result);