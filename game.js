
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;
let ind = 0;
let gamePattern = [];
let record = 0;

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Select button with same id as randomChosenColour & animate flash.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Use JS to play sound for the correct button colour.
  playSound(randomChosenColour);
}

//When user clicks on button, relevant sound will play and choice is pushed to userClickedPattern
$(".btn").on('click', function(event) {
  let userChosenColour = event.target.id;
  userClickedPattern.unshift(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour)
  gameLogic(userChosenColour)
})

//Function to play sound using parameter which will be body of src.
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
  setTimeout(() => {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

$(document).on('keypress', function() {
  if (gameStarted === false) {
    nextSequence();
    gameStarted = true;
    $('#level-title').text("Level: " + level);
  }
})

function gameLogic(color) {

  if (color === gamePattern[ind] && ind < gamePattern.length) {
    ind++
  } else {  
    gameOver();
  }

  if (ind === gamePattern.length && gameStarted) {
    userClickedPattern = [];
    level++;
    if (level > record) {
      $('#current-record').text('Current Record: Level ' + level)
      record = level;
    }
    ind = 0;
    $('#level-title').text('Level: ' + level)
    setTimeout(() => {
      nextSequence()
    }, 2000); 
  }

}

function gameOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = false
  playSound("wrong")
  $('body').toggleClass('game-over')
  setTimeout(() => {
    $('body').toggleClass('game-over');
  }, 500);
  setTimeout(() => {
    $('body').toggleClass('game-over');
  }, 1000);
  setTimeout(() => {
    $('body').toggleClass('game-over');
  }, 2000);
  $('#level-title').text('GAME OVER!')
  setTimeout(() => {
    $('#level-title').text('Press Any Key to Start')
  }, 2000);
  return;
}

