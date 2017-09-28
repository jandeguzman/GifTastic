var things = ["French Fries", "Nachos", "Chicken Nuggets", "Chocolate", "Sushi"];
var newButton = "";
var button;

// Create a new button
var renderButton = function() {
    $("#buttonPlace").empty();
    for (i = 0; i < things.length; i++) {
        button = $("<button type=" + "button" + ">" + things[i] + "</button>").addClass("btn btn-default").attr("data", things[i]);
        $("#buttonPlace").append(button);
    };
}

$(".submit").on("click", function(event) {
    event.preventDefault();


    newButton = $("#thing-input").val();

    things.push(newButton);
    console.log(things);

    renderButton();
});


renderButton();

//Generating Gifs when button is clicked

$("#buttonPlace").on("click", ".btn", function() {
    var thing = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=dc6zaTOxFJmzC&limit=10";



    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>").attr("class", "imgContainer");

            var p = $("<p>");
            p.text(results[i].rating);
            var p = $("<p>").text("Rating: " + results[i].rating);

            var topicImage = $("<img>");

            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still")
            topicImage.addClass("gif");

            topicDiv.append(topicImage);
            topicDiv.append(p);
            $("#gifPlace").prepend(topicDiv);
        }
    })
})


// Starts and stops gifs when clicked 

$("#gifPlace").on("click", ".gif", function() {

    var state = $(this).attr("data-state");


    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {


        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

})