// As an animal is searched and its button is added, it is pushed into an array:
var animals = [];
var searchTerm = "";

// SEARCH FOR AN ITEM AND CAPTURE THE VALUE
// Capture the value from the search field
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    // alert("Test: Submit button has been clicked.");
    var searchTerm = $("#search").val().trim();
    console.log("Search Term: " + searchTerm);
    // Add animal from the textbox to our array
    animals.push(searchTerm);
    console.log("Animal Array: " + animals);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$(document).on("click", ".gifButton", displayGifInfo);

// ADDING NEW ANIMAL BUTTONS IN BROWSER
// Function for displaying animal data
function renderButtons() {

    // Deleting the animals prior to adding new animals
    // (this is necessary otherwise there will be repeat buttons)
    $("#buttonSection").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        var newButton = $("<button>");
        // Adding a class of btn btn-primary to our button
        newButton.addClass("btn btn-primary gifButton").css("margin", "10px 10px 10px 10px");
        // Adding a data-attribute
        newButton.attr("data-name", animals[i]);
        // Providing the initial button text
        newButton.text(animals[i]);
        // Adding the button to the #buttonSection
        $("#buttonSection").append(newButton);
    }
}

// Connect to the API so that the individual buttons render the gifs
function displayGifInfo() {
    var searchTerm = $(this).attr("data-name");
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=eZC5OTS1J5sUexsnNh6tPs3HJweH7Smz&limit=10&offset=0&lang=en";

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({ url: queryURL, method: "GET" })
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                var still = results[i].images.downsized_still.url;
                var animated = results[i].images.downsized.url;

                var searchDiv = $('<div class = "search-item">');
                var p = $('<p>').text("Rating: " + results[i].rating.toUpperCase());
                var animated = results[i].images.downsized.url;
                var still = results[i].images.downsized_still.url;
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.attr("data-state", "still");
                image.addClass("searchedGif");
                searchDiv.append(p);
                searchDiv.append(image);
                $("#gifs").prepend(searchDiv);
            }
        });
}
// Code for making gifs animated or still
$(document).on("click", ".searchedGif", function () {
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});
