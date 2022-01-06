var questions = [
    {
        Q: "There are more grains of sand on Earth than there are stars in the sky",
        answer: "False"
    },
    {
        Q: "Russia is bigger than Saturn",
        answer: "False"
    },
    {
        Q: "An octopus has 3 hearts",
        answer: "True"
    },
    {
        Q: "For every human on Earth there are 1.6million~ ants",
        answer: "True"
    },
    {
        Q: "A banana is a berry",
        answer: "True"
    },
]

var totalTime= 60;
var start = document.querySelector(".btn-custom");
var count = 1;
var totalPoints = 0;
var interval;

$(document).ready(function() {
    $(".btn-custom").click(function(){
        $(".btn-custom").hide();
        $(".btn-custom2").show();
        $(".btn-custom3").show();
        $(".card-text").text(questions[0].Q)
        interval = setInterval(function() {
            totalTime--;
            $("#timerDiv").text(`Time Left: ${totalTime}`);
            if (totalTime <= 0) {
                clearInterval(interval);
                return;
            }
        }, 1000);
    });
    $(".btn-custom2, .btn-custom3").click(function(event){
        console.log(event);
        if(questions[count-1].answer == event.currentTarget.innerHTML){
            alert("Correct!");
            totalPoints = totalPoints +10;
        } else{
            alert("Incorrect!");
            totalPoints = totalPoints -10;
            totalTime = totalTime -10;
        }
        if (count > questions.length - 1){
            $(".card-text").text(`Thanks for Playing! Your score is: ${totalPoints}`);
            $(".btn-custom2").hide();
            $(".btn-custom3").hide();
            $(".btn-custom").text("Submit");
            $("#form").show();
            clearInterval(interval);
            console.log(totalPoints);
            return;
        }
        $(".card-text").text(questions[count].Q);
        count = ++count;
        console.log(totalPoints)
    })
    $("#form").submit(function(event){
        event.preventDefault();
        if (!localStorage.getItem("highscores")) {
            localStorage.setItem("highscores", JSON.stringify({
                highscoresArray: []
            }));
        }
        var highscores = JSON.parse(localStorage.getItem("highscores")).highscoresArray;
        console.log(highscores);
        highscores.push({Initials:$("input").val(), score:totalPoints});
        console.log(highscores);
        localStorage.setItem("highscores", JSON.stringify({
            highscoresArray: highscores
        }));
    })
    $("#highscores").click(function(event){
        $(".card-text").text("highscores")
        var highscores = JSON.parse(localStorage.getItem("highscores")).highscoresArray;
        for (var i=0; i< highscores.length; i++){
            var storage= highscores[i];
            var text= $(".card-text").text();
            text += `  ${storage.Initials} ${storage.score} `;
            $(".card-text").text(text);
            console.log(storage);
        }
    });
});
