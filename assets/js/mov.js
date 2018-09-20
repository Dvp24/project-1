var recent = [];
var title;
$(".submit").on("click", function () {
  event.preventDefault()//am i supposed to use it everytime i use buttons and the click events on my page???
  title = $(".searchBar").val();
  console.log("here " + title);
  // recent = recent.push(title);
  // console.log(recent.push(title));
  var queryurl = "https://www.omdbapi.com/?s=" + title + "&y=&plot=short&apikey=32eadb";
  $.ajax({
    url: queryurl,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // console.log(response.Search[0]);
    // $(".display").html(response.Search[].Title);
      
    })
  
})
// http://www.omdbapi.com/?i=tt3896198&apikey=32eadb