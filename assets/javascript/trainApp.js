  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAVBAgscXIPiuuOILcRkDHCfu8b8mbYG0g",
    authDomain: "trainapp-cd0db.firebaseapp.com",
    databaseURL: "https://trainapp-cd0db.firebaseio.com",
    projectId: "trainapp-cd0db",
    storageBucket: "",
    messagingSenderId: "95660689069",
    appId: "1:95660689069:web:d1e506299b385795"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//firebase.initializeApp(config);

// Create a variable to reference the database
var db = firebase.database();

// declare variables
var trainName;
var destinatio;
var firstTime;
var frequency;
var name="";




$("#add_train").on("click", function(e){
    e.preventDefault();
    /*
    // create a table in tableArea div
    $("#tableArea").append("<table id='customers'></table>");
     let table=$("#tableArea").children();
    table.append( "<tr><th>Train Name</th><th>Destination</th><th>Frequency(min)</th><th>Next Arrival</th><th>Minutes Away</th></tr>");
*/
let table =$("<table></table>");
//assign attribute
table.attr("Id", "customers");
//append the table to div tableArea
$("#tableArea").append(table);
let table_rows=$("#tableArea").children();
table_rows.append( "<tr><th>Train Name</th><th>Destination</th><th>Frequency(min)</th><th>Next Arrival</th><th>Minutes Away</th></tr>");

//clear form field after submission
$('#trainForm input[type="text"]').val('');



})


let nextTrain;
    function nextArrivalTime(firstTime, tFrequency) {

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
      var tRemainder = diffTime % tFrequency;
      //console.log(tRemainder);

      // Minute Until Train
      var timeLeftForTrainToArrive = tFrequency - tRemainder;
      console.log("Next Train arrives in: " + timeLeftForTrainToArrive);

      // Next Train
      var nextTrain = moment().add(timeLeftForTrainToArrive, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      //function to compute next arrival time
      //assumption Train runs 24/7 
      $("body").append(timeLeftForTrainToArrive);
      $("body").append("<br>");
      $("body").append(moment(nextTrain).format("hh:mm"));



    }
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;");
    

    function trainSchedule(tFrequency) {
      tFrequency = 6;
      firstTime = "05:30";
      nextArrivalTime(firstTime, tFrequency);
      //myVar = setTimeout(trainSchedule, 60000);
      myVar = setInterval(trainSchedule, 60000);
    }

    $(document).ready(function () {
      //trainSchedule();
    });



