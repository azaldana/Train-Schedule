$(document).ready(function(){

// Initialize Firebase //

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

  // Create clock //

  setInterval(function(){
    $('#clock').html(moment().format('hh:mm:ss A'))
  }, 1000);

  
$("#add-train").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself //
    event.preventDefault();

    // Capture user inputs and store them into variables //
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
    
    return false;
})

database.ref().on("child_added", function(snap){
    var save = snap.val();

    var $row = $("<tr>");
    $row.append('<td>' + save.trainName + '</td>');
    $row.append('<td>' + save.destination + '</td>');
    $row.append('<td>' + save.frequency + '</td>');
    $row.append('<td>' + save.nextArrival + '</td>');
    $row.append('<td>' + save.minutesAway + '</td>');
    $('tbody').append($row);
    

    console.log(snap.key, snap.val());

    console.log(save.trainName);
    console.log(save.destination);
    console.log(save.firstTrain);
    console.log(save.frequency);
    })
})
