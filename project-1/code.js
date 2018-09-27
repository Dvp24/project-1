// slideshow for homepage
var latest;
var queryurl0 = "https://api.themoviedb.org/3/trending/movie/week?api_key=ec4984a8351c88fd48d06bd73b9d2a85"
var player = document.createElement("audio");
$.ajax({
  url: queryurl0,
  method: "GET"
}).then(function (latest) {
  console.log(latest)
  
})


var recent = [];
var pageCount = 1;
var title;
var movie;

// on load hide get more button
$("#get-more-button").hide();
//gjgjjgjgjgj

function getMovieList(pageCount, searchTerm) {
  $(".tracks-area").hide();
  var queryurl = "https://omdbapi.com/?apikey=32eadb&type=movie&s=" + searchTerm + "&page=" + pageCount;
  $.ajax({
    url: queryurl,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // console.log(response.Search[0]);
    if (response.Response !== "False") {
      for (var i = 0; i < response.Search.length; i++) {
        var movieDiv = $("<div>");
        movieDiv
          .addClass("cursor")
          .text(response.Search[i].Title)
          .append("<br/>")
          .appendTo(".results-area")
        // $(".results-area").append("<div class='clickable" + i + "'>");
        // $(".clickable" + i).append(response.Search[i].Title).append("<br>").addClass("cursor");
      }
      $("#get-more-button").show();
    } else {
      $("#get-more-button").hide();
      var movieDiv = $("<div>");
      movieDiv
        .addClass("cursor")
        .text(response.Error)
        .append("<br/>")
        .appendTo(".results-area")
    }
  })

}


$(".submit").on("click", function () {
  event.preventDefault()//am i supposed to use it everytime i use buttons and the click events on my page???
  title = $(".searchBar").val();
  pageCount = 1;
  $(".results-area").empty();
  $(".results-area").append("The search results for: " + title + "<hr>");
  console.log("here " + title);
  recent.push(title);
  console.log(recent);
  // console.log(recent.push(title));
  getMovieList(pageCount, title);

  render();
})

$(document).on("click", "#get-more-button", function () {
  // increase page count by 1
  pageCount++;
  getMovieList(pageCount, title)
})

// show full movie details
$(document).on("click", ".cursor", function () {
  movie = $(this).text();
  $("#get-more-button").hide();
  console.log(movie);
  var queryurl1 = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=32eadb";
  $.ajax({
    url: queryurl1,
    method: "GET"
  }).then(function (resp) {
    console.log(resp);
    $(".results-area").html("<div class='selMovie'>");
    $(".selMovie").append("<img class='poster'>");
    $(".poster").attr("src", resp.Poster);
    $(".selMovie").append("<div class='details'>");
    $(".details").append("<div class='boldNBig'>" + resp.Title + "</div>").append("<br>");
    $(".details").append("Year: " + resp.Year).append("<br>");//i wantto print an error msg when search dont returns anything how to check condition for that????
    $(".details").append("Rated: " + resp.Rated).append("<br>");
    $(".details").append("Released: " + resp.Released).append("<br>");
    $(".details").append("Runtime: " + resp.Runtime).append("<br>");
    $(".details").append("Actors: " + resp.Actors).append("<br>");
    $(".details").append("<div class = 'btn music'>Music</div>").append("<br>");
    // $(".details").append("<div class = 'btn music'>Watch Trailer</div>").append("<br>");

    // musicbutton click event and another api ajAX query for music goes to spotify here within the call back function
    if (access_token) {
      getSpotifyAlbum(movie);
    } else {
      // print message to page prompting user to log in to see spotify results
    }
  })
});


// spotify album search function
function getSpotifyAlbum(movie) {
  // search for album so we can get the album's id back
  spotifyApi.searchAlbums(movie, {}, function(err, data) {
    if (err) console.log(err);
    console.log(data);
    // get first return album's id 
    var albumId = data.albums.items[0].id;
    // search for album's tracks based on it's id
    spotifyApi.getAlbumTracks(albumId, {}, function(err, data) {
      if (err) console.log(err);
      console.log(data);
      // write album tracks to the page
    //  call the function here to list tracks
    $(".music").on("click",function(){  //ashley code goes here
      // event.preventDefault();
      getMusicList(data);
    })
    })
  })
}



function render() {
  $(".sidebar").empty();

  for (var z = 0; z < recent.length; z++) {
    // $(".sidebar").append(recent[z]).append("<br>");
    var a = $("<div>");
    // Adding a class
    a.addClass("recent");
    // Adding a data-attribute with a value of the movie at index i
    a.text(recent[z]);
    // Adding the button to the HTML
    $(".sidebar").append(a).append("<br>");//why not going on next line
  }
}

// http://www.omdbapi.com/?i=tt3896198&apikey=32eadb
function getMusicList(data) {
    console.log(data)
    // console.log(data.Search[0]);
    // if (data.Response !== "False") {
      var trackslist = $("<div>");
      trackslist.addClass("tracks-area")
      trackslist.appendTo(".display")
      for (var i = 0; i < data.items.length; i++) {
        var musicDiv = $("<div>");
        musicDiv
          .addClass("music-cursor")
          .attr("data-preview", data.items[i].preview_url)
          .text(data.items[i].name)
          .append("<br>")
          // .append
          .appendTo(".tracks-area")
      }
     
  }

  $(document).on("click", ".music-cursor", function () {
    console.log("anything")
    var previewUrl = $(this).attr("data-preview");
    musicPlayer(previewUrl);
})

function musicPlayer(songUrl) {
  // console.log(data)
  // console.log(data.Search[0]);
  // if (data.Response !== "False") {
    console.log(songUrl);
    if (!songUrl) {
      return false;
    }
    
    player.setAttribute("src", songUrl);
    player.play();
    $(".puase")
   
}