var trainData = new Firebase("https://itstraintime.firebaseio.com/");
var currentTime = moment();

// event to pull data from Firebase
trainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;

    // --- not complete/working ---
    // var convertedStartTime = moment(new Date(trainStart));
    // var minutesAway = moment(currentTime - convertedStartTime).format(mmm);

    // convertToMins = moment(trainStart).format(mmm);
    // console.log(convertToMins);

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq + "</td><td>" + trainStart + "</td><td>" + "###" + "</td></tr>");

}, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
});

// click event to add trains
$("#addTrainBtn").on("click", function() {

    var trainName = $('#trainName').val().trim();
    var trainDest = $('#destination').val().trim();
    var trainStart = $('#startTime').val().trim();
    var trainFreq = $('#frequency').val().trim();

    var newTrain = {
        name: trainName,
        dest: trainDest,
        start: trainStart,
        freq: trainFreq
    };

    trainData.push(newTrain);
        
    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");

    return false;
});