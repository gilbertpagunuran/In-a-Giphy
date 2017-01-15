var meme = "";
var memeList = [];

// This calls the createButtons() function
createButtons();
//==============

// Generic function for displaying the gifs associated to a meme
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(document).on('click', '.meme', displayGifList);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This event listener handles events when addMeme is clicked
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('#addMeme').on('click', function(){

  meme = $('#meme-input').val().trim();
  meme = meme.toUpperCase();
  

  //--------- check if already existing -----
    var gLen = memeList.push(meme);
    var limit = gLen - 1;
    for (var i = 0; i < limit; i++) {
        if (meme == memeList[i]) {
            memeList.pop();
            break;                         // duplicate meme 
        }
    };

  sortfunc();
  createButtons();

  return false;
})
//=====================================================================

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This event listener handles display of gifs
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//$('.gif').on('click', function() {                // this does not work
//$('#gif').on('click', function() {              // this does not work
$(document).on('click', '.gif', reanimateGif);

function reanimateGif(){

  var action = $(this).attr("state");
  console.log("action=" + action);

  if (action == "still") {
   //  $(this).attr("src", $(this).attr) = $(this).attr("data-animate");
      $(this).attr("src", $(this).attr("src-animate"));
      $(this).attr("state", "animate");
  } else {
    $(this).attr("src", $(this).attr("src-still"));
      $(this).attr("state", "still");
  }
}

//})
//=====================================================================

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Generic function for displaying meme buttons
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function createButtons(){ 
  // Deletes the memeList prior to adding new memeList (this is necessary otherwise you will have repeat buttons)
  $('#memeButtons').empty();

  // Loops through the array of memeList
  for (var i = 0; i < memeList.length; i++){
      var a = $('<button>') 
      a.addClass('meme');              // Added a class 
      a.attr('meme-name', memeList[i]); // Added a data-attribute
      a.text(memeList[i]);              // Provided the initial button text
      $('#memeButtons').append(a);       // Added the button to the HTML
  }
}
//=====================================================================

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This function retrieves 10 gifs from AJAX call for direct display
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function displayGifList(){

  $('#gifViewer').empty();

  meme = $(this).attr('meme-name');

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        meme + "&api_key=dc6zaTOxFJmzC&limit=10";

//  var queryURL =  "http://api.giphy.com/v1/gifs/translate?s=" + 
 //         meme + "&api_key=dc6zaTOxFJmzC&limit=10";
  
  $.ajax({url: queryURL,method: "GET"})
    .done(function(response) {
      var results = response.data;
      console.log(response);

      for (var i = 0; i < results.length; i++) {

     // if (results[i].rating !== "r" && results[i].rating !== "pg-13") {}   
    //    var gifDiv = $("<div>");
    //        gifDiv.attr("state", "still");
        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var pImage = $("<img>");
        pImage.attr("src", results[i].images.downsized_still.url);
        pImage.attr("src-still", results[i].images.downsized_still.url);
        pImage.attr("src-animate", results[i].images.downsized.url);
        pImage.attr("state", "still");
        pImage.attr("class", "gif");

        //gifDiv.prepend(p);
        //gifDiv.prepend(pImage);

        $("#gifViewer").prepend(p);
        $("#gifViewer").prepend(pImage);

      //  $("#gifViewer").prepend(gifDiv);
      }
    }); 
}
//=====================================================================

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This function sorts the memeList in ascending order
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
function sortfunc() {

  var temp = "";
  var limit = memeList.length;
  var y = 0;

  for (var i = 0; i < memeList.length; i++) {

      for (var x = 0; x < limit; x++) {
          y = x + 1;

          if (memeList[x] > memeList[y]) {
              temp = memeList[x];
              memeList[x] = memeList[y];
              memeList[y] = temp;
          }
         
      }
      
      limit = limit - 1;

  }

}
//=====================================================================