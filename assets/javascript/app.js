var trainData = new Firebase("https://itstraintime.firebaseio.com/");

trainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;

    // train Info
    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(trainFreq);

    // Add each train's data into the table 
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq + "</td><td>" + "###" + "</td><td>" + "###" + "</td></tr>");

}, function (errorObject) {
     // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);
});

// Capture Button Click
$("#addTrainBtn").on("click", function() {

    // Grabbed values from text boxes
    var trainName = $('#trainName').val().trim();
    var trainDest = $('#destination').val().trim();
    var trainStart = $('#startTime').val().trim();
    var trainFreq = $('#frequency').val().trim();

//     // Code for handling the push
    var newTrain = {
        name: trainName,
        dest: trainDest,
        start: trainStart,
        freq: trainFreq
    };

    trainData.push(newTrain);
        
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);

//     alert("Train has been added");

    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");

    // Don't refresh the page!
    return false;
});