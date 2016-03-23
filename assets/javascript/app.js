var trainData = new Firebase("https://itstraintime.firebaseio.com/");
var currentTime = moment();

// event to pull data from Firebase
trainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;

    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(trainFreq);

    var convertedTime = moment(new Date(trainStart).format('HH:mm'));

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq + "</td><td>" + "###" + "</td><td>" + "###" + "</td></tr>");

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