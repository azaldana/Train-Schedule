$("#add-train").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var trainTime = $("#input-train").val().trim();
    var destination = $("#input-destination").val().trim();
    var firstTrain = $("#input-firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    trainList.push(trainTime, destination, firstTrain, frequency);

    // Console log each of the user inputs to confirm we are receiving them
    console.log(trainTime);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    $("#add-train").val('');
})

    // Replaces the content in the "recent-member" div with the new info
//     $("#train-name").text(trainTime);
//     $("#destination").text(destination);
//     $("#next-arrival").text(firstTrain);
//     $("#frequency").text(frequency);

//     // Clear sessionStorage
//     sessionStorage.clear();

//     // Store all content into sessionStorage
//     sessionStorage.setItem("train", trainTime);
//     sessionStorage.setItem("destination", destination);
//     sessionStorage.setItem("first", firstTrain);
//     sessionStorage.setItem("frequency", frequency);
//   });

//   // By default display the content from sessionStorage
//   $("#train-name").text(sessionStorage.getItem("train"));
//   $("#destination").text(sessionStorage.getItem("destination"));
//   $("#next-arrival").text(sessionStorage.getItem("first"));
//   $("#frequency").text(sessionStorage.getItem("frequency"));

