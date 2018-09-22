var recent = [];
var pageCount = 1;
var title;
var movie;

// on load hide get more button
$("#get-more-button").hide();
//gjgjjgjgjgj

function getMovieList(pageCount, searchTerm) {
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
    $(".details").append("<div class = 'btn music'>Watch Trailer</div>").append("<br>");

    // musicbutton click event and another api ajAX query for music goes to spotify here within the call back function
    $(".results-area").append("<div class='suggestions'>");//optional
    $(".suggestions").html("<div class='slideshow'>");
    $(".slideshow").html("Suggestions").append("<ul>");
    for (var j = 0; j < resp.length; j++) {// why my for loop is not working
      $(".slideshow > ul").append("<li class='slide'>");
      console.log("hi");
      $(".slide").html(resp.Poster);
      // $(".slide"+j).html(resp.Poster).append(resp.Title);
    }
    // }
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
    })
  })
}


$(document).on("click", "playMusic", function () {
  var musicSearch = movie;//search by album
  var queryurl2 //spotify url goes here
  $.ajax({
    url: queryurl2,
    method: "GET"
  }).then(function (r) {
    console.log(r);

  })
})
function render() {
  $(".sidebar").empty();

  for (var z = 0; z < recent.length; z++) {
    // $(".sidebar").append(recent[z]).append("<br>");
    var a = $("<div>");
    // Adding a class
    a.addClass("recent");
    // Adding a data-attribute with a value of the movie at index i
    // a.attr("data-name", movies[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(recent[z]);
    // Adding the button to the HTML
    $(".sidebar").append(a).append("<br>");//why not going on next line
  }
}

// http://www.omdbapi.com/?i=tt3896198&apikey=32eadb