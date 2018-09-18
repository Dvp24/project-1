// document.on("ready",function(){
  var title;
  $(".submit").on("click",function(){
    title = $(".searchBar").val();
    console.log("here "+title);
    queryurl = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=32eadb";
    $.ajax({
      url: queryurl,
      method: "GET"
    }).then(function(response){
      console.log("uiu "+response);
      

    })




  })
// http://www.omdbapi.com/?i=tt3896198&apikey=32eadb