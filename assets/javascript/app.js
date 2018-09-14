$( document ).ready(function() {
    var topic = ["Harry Potter", "Hermoine", "Ron Weasley", "Voldemort", "Dumbledore", "Severus Snape", "Hagrid","Dobby"];
    
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
        var gifButton = $("<button>");
        gifButton.addClass("character");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topic[i]);
        gifButton.text(topic[i]);
        $("#gifButtonsView").append(gifButton);
        }
    }
    
       function addNewButton() {
        $("#addGif").on("click", function() {
        var character = $("#topicInput").val().trim();
            if (character == ""){
                return false;
            }
            topic.push(character);
    
            displayGifButtons();
            return false;
            });
    }
    
    function removeLastButton() {
        $("removeGif").on("click", function() {
            topic.pop(character);
            displayGifButtons();
            return false;
        });
    
    }
    
  
    function displayGifs() {
        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=Yo7nJff0hsv4Ga2M2AQt8XFKBH0oLyLo&limit=8";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            
            var results = response.data;
            if (results == ""){
                alert("There is not a giffy for this!");	
            }
            for (var i = 0; i<results.length; i++){
                var gifDiv = $("<div1>");
                
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
   
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".character", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });