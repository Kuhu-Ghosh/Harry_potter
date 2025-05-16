const container = document.getElementById("container");
const box = document.getElementById("box");
const question = document.getElementById("questions");
const answer = document.getElementById("answers");
const p = document.getElementById("poop");

let patronousScore = {
    Phoenix: 0,
    Stag: 0,
    Wolf: 0,
    Otter: 0,
    Hare: 0,
    Swan: 0
};

let index = 0;
let q = [];

const patronousMapping = [
    ["Phoenix", "Stag", "Wolf", "Otter", "Hare", "Swan"],
    ["Phoenix", "Stag", "Wolf", "Otter", "Hare", "Swan"],
    ["Phoenix", "Stag", "Wolf", "Otter", "Hare", "Swan"],
    ["Phoenix", "Stag", "Wolf", "Otter", "Hare", "Swan"],
    ["Phoenix", "Stag", "Wolf", "Otter", "Hare", "Swan"]
];

async function fetchQuestion() {
    try {
        const response = await fetch("patronous.json");
        q = await response.json();
        showQuestion();
    } catch (error) {
        question.textContent = "Error loading questions.";
        console.error(error);
    }
}

function showQuestion() {
    resetState();

    const currentQuestion = q[index];
    question.textContent = currentQuestion.q;

    currentQuestion.option.forEach((option, optionIndex) => {
        let button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(optionIndex));
        answer.appendChild(button);
    });
}

function selectAnswer(optionIndex) {
    const ptr = patronousMapping[index][optionIndex];
    patronousScore[ptr]++;

    index++;
    showQuestion();
}

function resetState() {
    answer.innerHTML = "";
    if (index >= q.length) {
        showResult();
        return;
    }

}

function showResult() {
    let patronous = "";
    let maxScore = 0;

    for (let key in patronousScore) {
        if (patronousScore[key] >= maxScore) {
            patronous = key;
            maxScore = patronousScore[key];
        }
    }
    question.textContent = `Your Patronous is ${patronous}!`;

    const link = document.createElement("a");
    link.href = "index.html";
    const btn2 = document.createElement("button");
    btn2.textContent = "HOME";
    btn2.classList.add("home");
    link.appendChild(btn2);
    p.appendChild(link);
}

fetchQuestion();
