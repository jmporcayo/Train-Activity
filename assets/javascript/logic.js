// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCQK4QaTNU6kkfskuU9-UkJ6rtQXjMDvRU",
  authDomain: "ahivieneeltren-fbe42.firebaseapp.com",
  databaseURL: "https://ahivieneeltren-fbe42.firebaseio.com",
  projectId: "ahivieneeltren-fbe42",
  storageBucket: "ahivieneeltren-fbe42.appspot.com",
  messagingSenderId: "458806740679"
};
firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destiNation = $("#destination-input").val().trim();
    var milTime = $("#time-input").val().trim();
    var freQuency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var addTrain = {
      name: trainName,
      destination: destiNation,
      time: milTime,
      frequency: freQuency,
    };
  
    // Uploads train data to the database
    database.ref().push(addTrain);
  
    // Logs everything to console
    console.log(addTrain.name);
    console.log(addTrain.destination);
    console.log(addTrain.time);
    console.log(addTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destiNation = childSnapshot.val().destination;
    var milTime = childSnapshot.val().time;
    var freQuency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destiNation);
    console.log(milTime);
    console.log(freQuency);

    var timeArray = milTime.split(":");

    console.log("this is timeArray: ", timeArray)

    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1])
  
    var maxTime = moment.max(moment(), trainTime);
    // // Prettify the employee start
    var trainStartPretty = moment.unix(milTime).format("HH:mm");
  
    // Calculate next train arrival
    var trainArrival = moment().diff(moment(milTime, "X"), "minutes");
    console.log(trainArrival);
  
    // Calculate minutes until next arrival
    var minAway = milTime * freQuency;
    console.log(minAway);



    var tMinutes;
    var tArrvial;

    if(maxTime === trainTime){
      tArrvial = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    }else{
      var timeDifference = moment().diff(trainTime, "minutes");
      var remainder = timeDifference % freQuency;


      tMinutes = freQuency - remainder;
      tArrvial = moment().add(tMinutes, "m").format("hh:mm A")
    }
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destiNation),
      $("<td>").text(freQuency),
      $("<td>").text(tArrvial),
      $("<td>").text(tMinutes)     
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  