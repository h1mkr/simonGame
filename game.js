var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        var curr = $("body");
        curr.addClass("game-over");
        setTimeout(function() {
            curr.removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
} 

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    var curr = $("#" + currentColor);
    curr.addClass("pressed");
    setTimeout(function() {
        curr.removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(event) {
    if(started) {
        switch(event.key) {
            case "r":
                userClickedPattern.push("red");
                playSound("red");
                animatePress("red");
                checkAnswer(userClickedPattern.length - 1);
                break;
            case "g":
                userClickedPattern.push("green");
                playSound("green");
                animatePress("green");
                checkAnswer(userClickedPattern.length - 1);
                break;
            case "b":
                userClickedPattern.push("blue");
                playSound("blue");
                animatePress("blue");
                checkAnswer(userClickedPattern.length - 1);
                break;
            case "y":
                userClickedPattern.push("yellow");
                playSound("yellow");
                animatePress("yellow");
                checkAnswer(userClickedPattern.length - 1);
                break;
        }
    }
})