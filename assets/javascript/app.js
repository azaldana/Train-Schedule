var config = {
    apiKey: "AIzaSyCrPOq1mLowcEICph8Q4MiBV2pgDBV7dAM",
    authDomain: "train-schedule-3752d.firebaseapp.com",
    databaseURL: "https://train-schedule-3752d.firebaseio.com",
    projectId: "train-schedule-3752d",
    storageBucket: "train-schedule-3752d.appspot.com",
    messagingSenderId: "738822689827"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;

  var time = null,
  date = null;

  var update = function () {
    date = moment(new Date())
    time.html(date.format('h:mm:ss a'));
};

$(document).ready(function(){
    time = $('#clock')
    update();
    setInterval(update, 1000);
});

  

$("#add-train").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();
    var currentTime = moment();
    var trainTime = moment(firstTrain, "HH:mm");
    var difference = currentTime.diff(trainTime, "minutes");
    var minutesFromLastTrain = difference % Number(frequency);
    var minutesAway = Number(frequency) - minutesFromLastTrain;
    currentTime.add(minutesAway, "minutes");
    var nextArrival = currentTime.format("hh:mm");
    
    console.log("this is the difference", difference);
    console.log("minutes away", minutesAway);

    // $(".jumbotron").append('<p>' + nextArrival + '</p>');
    
    var $row = $("<tr>");
    $row.append('<td>' + trainName + '</td>');
    $row.append('<td>' + destination + '</td>');
    $row.append('<td>' + frequency + '</td>');
    $row.append('<td>' + nextArrival + '</td>');
    $row.append('<td>' + minutesAway + '</td>');
    $('tbody').append($row);

    $("#train-name").val('');
    $("#destination").val('');
    $("#first-train").val('');
    $("#frequency").val('');

    database.ref().push({
        trainName:trainName,
        destination:destination,
        firstTrain:firstTrain,
        frequency:frequency,
        nextArrival:nextArrival,
        minutesAway:minutesAway,

    })
})

database.ref().on("child_added", function(snap){
    var save = snap.val();
    

    console.log(snap.key, snap.val());

    console.log(save.trainName);
    console.log(save.destination);
    console.log(save.firstTrain);
    console.log(save.frequency);
})


