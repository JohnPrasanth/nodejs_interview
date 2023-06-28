1. Make a api for phone number login

a. Make add Customer api for customer, assume admin is adding customer ..
use the input params validation, code commenting, logging and check for
duplicates where required .
b. Use of transaction connection in mysql is good to have (not the requirement)

2. Write a sql query for finding the subjects for each student, the subjects should be order by alphabetically .


3. Write a function in node that inserts the following data in mysql , the email should be unique and if the email already exists in the system then the name of the customer will be updated with the new name that is there in the array for that customer.



4. Create a new object which have all the properties of object person and student

5. Make a promisifed function for the functioan having callback below , after the
function is promisifed then call the function like you call a promise

const request = require('request');
function getGoogleHomePage(finalCallBack){
request('http://www.google.com', function (error, response, body) {
console.error('error:', error); // Print the error if one occurred
finalCallBack(error);
console.log('statusCode:', response && response.statusCode); // Print the response status
code if a response was received
console.log('body:', body); // Print the HTML for the Google homepage.
finalCallBack(null,body);
});
};
console.log(getGoogleHomePage((result)=>{
console.log("RESULT==>",result);
}));


6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered
, one number from 1 to 100 is missing , Please write the code for finding the missing
number
