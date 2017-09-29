/* NOTE: Wikiquote API has some glitches and at times it breaks, if the quotes stops updating, that's why.*/

// pre defined set of colors for #quote_box color
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var interval = 10; // interval in seconds for random generation of quote
var timer; // stores interval for random generation of quote

//returns a color extracted randomly from colors array
function getRandColor (colors) {
  var randC = Math.floor(Math.random()*colors.length)
  return colors[randC];
}

// changes font size depending on quote length
function resizeFonts(size) {
   switch(true) {
       case(size <= 100):
        $('.resizable').css('font-size','30px');
        break;
       case(size > 100 && size < 200):
         $('.resizable').css('font-size','20px');
        break;
       case(size > 100 && size < 300):
         $('.resizable').css('font-size','16px');
        break;
   }
 }

// changes color of all eleemnts of color_changer class and id of quote_box
function changeColor () {
  var color = getRandColor(colors);
  $('.color_changer').css({
    'color': color
  });
  $('#quote_box').css({
    'border-color': color,
    'box-shadow': '5px 5px 10px ' + color
  });
}

// uodates anchor link to twitter with current quote text
function updateTwitterButton(text) {
  $('#twitter_button').attr('href', 'https://twitter.com/intent/tweet?text=' + text);
}

// queries wikiquote API for new quote and displays it, otherwise alert errror message
function getNewQuote() {
  WikiquoteApi.queryRandomTitle(
    function(data) {
      WikiquoteApi.getRandomQuote(data, function(data) {
        clearInterval(timer);
        displayQuote(data);
      });
    },
    function(msg) {
      alert.log(msg);
    }
  );
}

// displays quote, updating  font size, twitter anchor and color 
function displayQuote (quote) {  
  $('#quote').text(quote.quote);
  if(quote.titles === undefined) {
    $('#author span').text('Unknown author');  
  } else {
  $('#author span').text(quote.titles);
  }
  resizeFonts(quote.quote.length);
  updateTwitterButton(quote.quote);
  changeColor();
  timer = setTimeout( getNewQuote , interval*1000 );
  $('#quote_box span, #author, #twitter_button').show();
}

// event listener for get new quote button, queries for a new quote
$('#newQuote').on('click', function() {
	$('#quote_box span, #author').hide();
	getNewQuote();
});

//  event listener for change color button, changes color of quote box
$('#changeColor').on('click', function() {
	changeColor(); 
});

// on document ready, hides coontent of quote box and queries for a quote
$(document).ready(function() {
	$('#quote_box span, #author, #twitter_button').hide();
	getNewQuote();
	console.log('teast');
	
});