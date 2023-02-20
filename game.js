var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


$(document).on("keydown",function(){
    if(!started){
       $("#level-title").text("Level "+level);
       nextSequence();
       started=true;
    }
});



/**user clicked colour buttons */
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

  
/**computer generated colored buttons */
function nextSequence(){
    userClickedPattern=[];
    level+=1;
   $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*3)+1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour); 
   
}



/**both user and computer should generate sounds */
function playSound(name){
    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play();
}


function animatePress(currentColour){
         $("#"+currentColour).addClass("pressed");
         setTimeout(function(){
           $("#"+currentColour).removeClass("pressed")
         },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])  //if the user clicked pattern is valid and if it is the last one
    {
        console.log("success!");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }   
    }
    else{
        console.log("wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}








