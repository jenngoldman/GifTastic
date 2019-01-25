var topics = ["The Office", "Parks and Rec", "Game of Thrones", "True Detective", "Daredevil", "The Bachelorette", "House of Cards", "Sherlock", "Stranger Things", "Black Mirror", "Scandal", "Sharp Objects", "Grace and Frankie", "Jessica Jones", "Luke Cage", "The Punisher", "The Handmaid's Tale"];

$(document).ready(function() {
    // Creates tv show buttons. 
    for (i = 0; i < topics.length; i++) {
        createTopicButton(topics[i]);
    }
    
    bindClickToPopulateGifs();

    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#tv-show-input").val();
        createTopicButton(newTopic);
    });
});

// Functions:

function createTopicButton(topic) {
    var button = $("<button>" + topic + "</button>");
    button.attr("data-show", topic);
    button.addClass("button");
    $("#button-container").append(button);
    bindClickToPopulateGifs(button);
};

function bindClickToPopulateGifs(button) {
    $(button).on("click", function(){
        $("#tv-show-container").empty();
       
        var tvShow = $(this).attr("data-show")
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + tvShow.replace(/\s/g, '-') + '&api_key=y3ZrvrIJw38f7EadhznPS4FY7zkGo4iy&limit=10';
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);

            var results = response.data;
            for (i = 0; i < results.length; i++) {
                var tvShowGifDiv = $("<div>");
                tvShowGifDiv.addClass("gif-container");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var stillUrl = results[i].images.fixed_height_still.url;
                var tvShowGif = $("<img class='gif'>");
                tvShowGif.attr("data-still-url", stillUrl);
                tvShowGif.attr("data-animate-url", results[i].images.fixed_height.url);
                tvShowGif.attr("data-state", "still");
                tvShowGif.attr("src", stillUrl);
                tvShowGif.addClass("gif");

                $(tvShowGif).on("click", function() {
                    var state = $(this).attr("data-state");
                    
                    if (state === "still") {
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", $(this).attr("data-animate-url"));
                    } else {
                        $(this).attr("data-state", "still");
                        $(this).attr("src", $(this).attr("data-still-url"));
                    }
                });

                tvShowGifDiv.append(tvShowGif);   
                tvShowGifDiv.append(p);
                $("#tv-show-container").prepend(tvShowGifDiv);
            }
            
        }); 
    });  
}