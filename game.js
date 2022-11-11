// alert("hello");
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level =0;
var started = false;

$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+level );
    nextSequence();
    started= true;
  }


})

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});




//call function
function nextSequence(){
  userClickedPattern = [];
  ++level;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  $("h1").text("Level "+level );
}

function playSound(sound){
  var audio =  new Audio("sounds/"+ sound +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
 setTimeout(function(){
   $("#"+currentColour).removeClass("pressed");
 },100)
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);

    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;

}
