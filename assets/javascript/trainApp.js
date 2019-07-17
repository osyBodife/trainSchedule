
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCm7PnWkYcEsJ8qhiwLdMB_TvNOt4NNsic",
        authDomain: "trainapp-e8d0a.firebaseapp.com",
        databaseURL: "https://trainapp-e8d0a.firebaseio.com",
        projectId: "trainapp-e8d0a",
        storageBucket: "",
        messagingSenderId: "703731746875",
        appId: "1:703731746875:web:90e45ee0db5a8577"
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


    // function to display the current Time 
    function currentTime() {
        var currentTime = moment();
        let text = "CURRENT TIME: " + moment(currentTime).format("hh:mm");
        $("#currentTime").append(text);
    }
    currentTime();
    //function to refresh page every minute
    function AutoRefresh(t) {
        setTimeout("location.reload(true);", t);
    }


    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    /*
    // Capture data on the clcik of add a train Button 
    $("#add_train").on("click", function (e) {
        // prevent page from freshing
        e.preventDefault(); 
        
    
    
        // Code for the push
        db.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        
        //clear form field after submission
        $('#trainForm input[type="text"]').val('');
    
        
    });
    */
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
        //prevent empty fields being submitted
        if (trainName == "" || destination == "" || firstTime == "" || frequency == "") {
            alert("Error! Empty field(s) present");
            return false;
        } else {
            // push data into DB
            db.ref().push({
                trainName: trainName,
                destination: destination,
                firstTime: firstTime,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            //clear form field after submission
            $('#trainForm input[type="text"]').val('');
        }
    });



    // Firebase watcher + initial loader HINT: .on("value")
    db.ref().on("child_added", function (childSnapshot) {
        //assign generated data to a variable
        let results = childSnapshot.val();
        console.log(results);

        console.log(results.trainName);
        console.log(results.destination);
        console.log(results.frequency);
        console.log(results.firstTime);

        //values
        trainName = results.trainName;
        destination = results.destination;
        frequency = results.frequency;
        firstTime = results.firstTime;

        let firstTimeConverted = moment(results.firstTime, "hh:mm").subtract(1, "years");
        let timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
        let timeRemain = timeDiff % results.frequency;
        let timeLeftForTrainToArrive = results.frequency - timeRemain;
        let nextTrain = moment().add(timeLeftForTrainToArrive, "minutes");


        // Minute Until Train

        //console.log("Next Train arrives in: " + timeLeftForTrainToArrive);
        minsAway = timeLeftForTrainToArrive;
        console.log("The train is away by " + minsAway);

        // Next Train

        nextArrival = moment(nextTrain).format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        let newrow = $("<tr>");
        newrow.append($("<td>" + results.trainName + "</td>"));
        newrow.append($("<td>" + results.destination + "</td>"));
        newrow.append($("<td >" + results.frequency + "</td>"));
        newrow.append($("<td >" + nextArrival + "</td>"));
        newrow.append($("<td >" + minsAway + "</td>"));
        //newrow.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));

        $("#customers > tbody").append(newrow);


        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });




