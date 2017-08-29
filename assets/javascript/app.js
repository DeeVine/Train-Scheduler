// Initialize Firebase
var config = {
  apiKey: "AIzaSyDbBmeMeapR-eJi70V-gXj5StSIzxgtpSE",
  authDomain: "train-scheduler-95d1e.firebaseapp.com",
  databaseURL: "https://train-scheduler-95d1e.firebaseio.com",
  projectId: "train-scheduler-95d1e",
  storageBucket: "",
  messagingSenderId: "608903893456"
};
firebase.initializeApp(config);


// Create a variable to reference the database
var database = firebase.database();

var someName = "some name";
var someRole = "director";
var someStartDate = "today";
var someMonthlyRate = 2000;
var monthsWorked = someStartDate;

// database.ref().push({
//     name: someName ,
//     role: someRole,
//     startDate: someStartDate ,
//     monthlyRate: someMonthlyRate  
//   });

$("#submit-button").on("click", function() {

// Prevent default behavior
event.preventDefault();

console.log("this works");
});

$("#form-submission").on("click", function(event) {
// This line allows us to take advantage of the HTML "submit" property
// This way we can hit enter on the keyboard and it registers the search
// (in addition to clicks).
event.preventDefault();

console.log("testing button");

someName = $("#name-input").val().trim();
console.log(someName);

someRole = $("#role-input").val().trim();
someStartDate = $("#start-date-input").val().trim();
someMonthlyRate = $("#monthly-rate-input").val().trim();

database.ref().push({
    name: someName ,
    role: someRole,
    startDate: someStartDate ,
    monthlyRate: someMonthlyRate  
  });

});

database.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
console.log(childSnapshot.val().name);
console.log(childSnapshot.val().role);
console.log(childSnapshot.val().startDate);
console.log(childSnapshot.val().monthlyRate);
// full list of items to the well
$("#table-body").append("<tr>" + "<td class = 'table-name'>" + childSnapshot.val().name + "</td>" + 
  "<td class = 'table-name'>" + childSnapshot.val().role + "</td>" + 
  "<td class = 'table-name'>" + childSnapshot.val().startDate + "</td>" + 
  "<td class = 'table-name'>" + childSnapshot.val().monthlyRate + "</td>" +  "</tr>");

//use moment.js to calculate number of days between today and submitted date
var randomDate = childSnapshot.val().startDate;
var randomFormat = "MM/DD/YYYY";
var convertedDate = moment(randomDate, randomFormat);
var numberOfDays = moment(convertedDate).diff(moment(), "days");
console.log(numberOfDays);

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});

// var randomDate = "02/23/1999";
// var randomFormat = "MM/DD/YYYY";
// var convertedDate = moment(randomDate, randomFormat);
// var numberOfDays = moment(convertedDate).diff(moment(), "days");
// console.log(numberOfDays);