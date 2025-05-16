console.log("ha");
const questioncontainer=document.getElementById("qcontainer");
const question = document.getElementById("question");
const answerbtn=document.getElementById("answers");
const nextButton=document.getElementById("next-btn");
const result=document.getElementById("result");
const p = document.getElementById("poop");

let index=0;
let score=0;
let questions =[];


async function fetchQuestion() {
    try {
        const response = await fetch("question.json");
        let allQuestions = await response.json();
        questions = shuffleArray(allQuestions).slice(0, 10); 
        showQuestion();
    } catch (error) {
        question.textContent = "Error loading questions.";
        console.error(error);
    }
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function showQuestion(){
    resetState();
    let currentQuestion=questions[index];
    question.textContent=currentQuestion.q;
    currentQuestion.option.forEach(option=> {
        const button= document.createElement("button");
        button.classList.add("option-btn");//to add class to a tag
        button.textContent=option;
        button.addEventListener("click",()=>selectAnswer(option,currentQuestion.correctAns));
        answerbtn.appendChild(button);
    });
}

function selectAnswer(selected,correct){
    if(selected==correct){
        score++;
    }
    nextButton.style.display="block";
}

function resetState(){
    nextButton.style.display="none";
    answerbtn.innerHTML="";
}

nextButton.addEventListener("click", () => {
    index++;
    if (index < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult(){
    nextButton.style.display="none";
    questioncontainer.innerHTML=`<h2 style="color:white;text-shadow: 2px 2px 4px black;">You scored ${score} out of ${questions.length}!</h2>`;
    const link=document.createElement("a");
    link.href="index.html";
    const btn2=document.createElement("button");
    btn2.textContent="HOME";
    btn2.classList.add("home");
    link.appendChild(btn2);
    p.appendChild(link);
}

fetchQuestion();