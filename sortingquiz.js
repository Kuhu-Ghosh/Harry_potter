const container = document.getElementById("container");
const box = document.getElementById("box");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const p = document.getElementById("poop");
let index = 0;
let q = [];
let houseScores = {
    Gryffindor: 0,
    Hufflepuff: 0,
    Ravenclaw: 0,
    Slytherin: 0
};

const houseMapping = [
    ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"],
    ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"],
    ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"],
    ["Hufflepuff", "Ravenclaw", "Gryffindor", "Slytherin"]
];

async function fetchQuestion() {
    try {
        const response = await fetch("sortingquiz.json");
        q = await response.json();
        showQuestion();
    } catch (error) {
        question.textContent = "Error loading questions.";
        console.error(error);
    }
}

function showQuestion() {
    resetState();

    let currentQuestion = q[index];
    question.textContent = currentQuestion.q;

    currentQuestion.option.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(optionIndex));
        answer.appendChild(button);
    });
}

function selectAnswer(optionIndex) {
    let house = houseMapping[index][optionIndex];
    houseScores[house]++;

    index++;
    showQuestion();
}

function resetState() {
    if (index >= q.length) {
        showResult();
    }
    answer.innerHTML = "";
}

function showResult() {
    let sortedHouse = "";
    let maxScore = 0;

    if (houseScores["Gryffindor"] >= maxScore) {
        sortedHouse = "Gryffindor";
        maxScore = houseScores["Gryffindor"];
        document.body.style.backgroundImage = "url('images/gryffindor.jpg')"
        question.style.backgroundColor = "transparent";
        question.style.color = "Yellow";
        question.style.textShadow = "0 0 10px #b77b0c, 0 0 20px #d0ba11, 0 0 30px #984108, 0 0 40px #d48f03";
        question.style.width = "500px"
        question.style.textAlign = "center";
    }
    if (houseScores["Hufflepuff"] > maxScore) {
        sortedHouse = "Hufflepuff";
        maxScore = houseScores["Hufflepuff"];
        document.body.style.backgroundImage = "url('images/huffelpuff.jpg')"
        question.style.backgroundColor = "transparent";
        question.style.color = "Black";
        question.style.width = "500px"
        question.style.textAlign = "center";
    }
    if (houseScores["Ravenclaw"] > maxScore) {
        sortedHouse = "Ravenclaw";
        maxScore = houseScores["Ravenclaw"];
        document.body.style.backgroundImage = "url('images/ranvenclaw.jpg')"
        question.style.backgroundColor = "transparent";
        question.style.color = "White";
        question.style.width = "500px"
        question.style.textAlign = "center";
        question.style.textShadow = "0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white";
        question.style.boxShadow = "0 0 10px white, 0 0 20px white, 0 0 30px white";

    }
    if (houseScores["Slytherin"] > maxScore) {
        sortedHouse = "Slytherin";
        maxScore = houseScores["Slytherin"];
        document.body.style.backgroundImage = "url('images/slytherin.jpg')"
        question.style.color = "White";
        question.style.width = "400px"
        question.style.textAlign = "center";
        question.style.textShadow = "0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white";
        question.style.boxShadow = "0 0 10px white, 0 0 20px white, 0 0 30px white";
    }

    question.textContent = `You belong in ${sortedHouse}!`;
    document.body.style.overflow = "hidden";
    container.style.paddingTop="250px";
    const link=document.createElement("a");
    link.href="index.html";
    const btn2=document.createElement("button");
    btn2.textContent="HOME";
    btn2.classList.add("home");
    link.appendChild(btn2);
    p.appendChild(link);

}

fetchQuestion();
