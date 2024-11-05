
var started = false;
var level = 0;

$(document).on("keypress",function(){
    if(!started){
        nextSequence();
        started=true;
        console.log("Game has started!!");
        
    }
})


let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = new Array();


function checkAnswer(currentLevel){
    if(currentLevel[currentLevel.length-1]===gamePattern[currentLevel.length-1]){
        return true;
    }
    else{
        return false;
    }
    
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text(`Level ${level}`);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
// console.log(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

// console.log(randomNumber);
let userClickedPattern = new Array();

$(".btn").on("click", function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    $(`#${userChosenColour}`).addClass("pressed");
    setTimeout(function animatePress(){
        $(`#${userChosenColour}`).removeClass("pressed");
        }, 100);
    playsound(userChosenColour);
    
    if(checkAnswer(userClickedPattern))
        {
            if(userClickedPattern.length===level){
                setTimeout(nextSequence,1000);
            }
        }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        playsound("wrong");
        startOver();
    }
    
});

function startOver(){
   
        level=0;
        gamePattern=[];
        started=false;
    
}
    
    // console.log(userChosenColour);
function playsound(name){
    var a = new Audio(`./sounds/${name}.mp3`);
    a.play();
}
    