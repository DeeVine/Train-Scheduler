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

var trainName = "some name";
var destination = "director";
var firstTrainTime = "today";
var currentTime = moment();
console.log(currentTime);

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

trainName = $("#train-name-input").val().trim();
console.log(trainName);

destination = $("#destination-input").val().trim();
firstTrainTime = $("#first-train-time-input").val().trim();
tFrequency = $("#frequency-input").val().trim();

database.ref().push({
    name: trainName ,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: tFrequency  
  });

});

database.ref().on("child_added", function(childSnapshot) {
    
//use moment.js to calculate time difference and time till next train
  var tFrequency = childSnapshot.val().frequency;

  // Time is 3:30 AM
  var firstTrainTime = childSnapshot.val().firstTrainTime;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));    

    // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrainTime);
  console.log(childSnapshot.val().tFrequency);
  // full list of items to the well
  $("#table-body").append("<tr>" + "<td class = 'table-name'>" + childSnapshot.val().name + "</td>" + 
    "<td class = 'table-name'>" + childSnapshot.val().destination + "</td>" + 
    "<td class = 'table-name'>" + childSnapshot.val().frequency + "</td>" +
    "<td class = 'table-name'>" + moment(nextTrain).format("hh:mm") + "</td>" +
    "<td class = 'table-name'>" + tMinutesTillTrain + "</td>" +  "</tr>");

  // Handle the errors
  }, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});