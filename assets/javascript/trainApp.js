// Your web app's Firebase configuration


var firebaseConfig = {
    apiKey: "AIzaSyA4E71DgqzRTsOG7qjh0DnVUrssy1vqgWI",
    authDomain: "trainapp-c09d9.firebaseapp.com",
    databaseURL: "https://trainapp-c09d9.firebaseio.com",
    projectId: "trainapp-c09d9",
    storageBucket: "",
    messagingSenderId: "802901132792",
    appId: "1:802901132792:web:5e9cf08a4e11d445"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Create a variable to reference the database
const db = firebase.database();


// Initial Values
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";
var minsAway = "";
let nextArrival = "";
let results;
var timeLeftForTrainToArrive = "";
let nextTrain;

// Capture data on the clcik of add a train Button 
$("#add_train").on("click", function (e) {
    // prevent page from freshing
    e.preventDefault();

    //clear table
    //$("#tableArea").empty();

    //get the values from the input fields
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#firstTime").val().trim();
    frequency = $("#frequency").val().trim();
    //trainSchedule();
    

    // Code for the push
    db.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        //minsAway: minsAway,
        //nextArrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
     //clear form field after submission
     $('#trainForm input[type="text"]').val('');
});




// Firebase watcher + initial loader HINT: .on("value")
db.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    //console.log(snapshot.val());
    results = childSnapshot.val();
    // renderTrainSchedule(results);
    console.log(results.trainName);
    console.log(results.destination);
    console.log(results.frequency);
   
    //values
    trainName = results.trainName;
    destination = results.destination;
    frequency = results.frequency;
     //call the train schedule function
     trainSchedule();
     console.log(nextArrival);
     console.log(minsAway);  

    nextArrival = nextArrival;
    minsAway = minsAway;



    //table_rows.append("<tr><td> " + trainName + "<th><td>" + destination + "</th><th>" + frequency + "</th><th>" + nextArrival + "</th><th>" + minsAway + "</th></tr>");
    $("#customers > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");
   

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});







function nextArrivalTime(firstTime, frequency) {

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    //console.log("firstTime :" + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    // var diffTimes = moment().diff(firstTimeConverted, "minutes");
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);


    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    //console.log(tRemainder);

    // Minute Until Train
    var timeLeftForTrainToArrive = frequency - tRemainder;
    console.log("Next Train arrives in: " + timeLeftForTrainToArrive);
    minsAway = timeLeftForTrainToArrive;

    // Next Train
    var nextTrain = moment().add(timeLeftForTrainToArrive, "minutes");
    nextArrival = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




}
//console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;");


function trainSchedule() {
    nextArrivalTime(firstTime, frequency);
   myVar = setInterval(trainSchedule, 60000);
}





