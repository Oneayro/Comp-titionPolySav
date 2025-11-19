const questions = [
    {
        q: "Une référence peut-elle être null ?",
        answers: ["Oui", "Non"],
        correct: 1
    },
    {
        q: "Un pointeur contient…",
        answers: ["Une valeur", "Une adresse mémoire", "Une copie"],
        correct: 1
    },
    {
        q: "Une référence peut être réassignée :",
        answers: ["Oui", "Non"],
        correct: 1
    },
    {
        q: "Qui est plus dangereux ?",
        answers: ["Pointeur", "Référence"],
        correct: 0
    }
];

let index = 0;
let score = 0;
let selected = null;

function loadQuestion() {
    const q = questions[index];
    selected = null;

    document.getElementById("question").textContent = q.q;
    document.getElementById("nextBtn").style.display = "none";

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.classList.add("answer-btn");

        btn.onclick = () => chooseAnswer(btn, i);

        answersDiv.appendChild(btn);
    });
}

function chooseAnswer(btn, i) {
    document.querySelectorAll(".answer-btn").forEach(b => {
        b.classList.remove("selected");
    });

    btn.classList.add("selected");
    selected = i;

    document.getElementById("nextBtn").style.display = "block";
}

function nextStep() {
    if (selected === null) return;

    const q = questions[index];
    const btns = document.querySelectorAll(".answer-btn");

    btns.forEach((btn, i) => {
        btn.disabled = true;

        if (i === q.correct) {
            btn.classList.add("correct");
        }
        if (i === selected && selected !== q.correct) {
            btn.classList.add("wrong");
        }
    });

    if (selected === q.correct) score++;

    setTimeout(() => {
        index++;

        if (index >= questions.length) {
            endQuiz();
        } else {
            loadQuestion();
        }
    }, 1200);
}

function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    const s = document.getElementById("score");
    s.classList.remove("hidden");
    s.textContent = `Ton score final : ${score}/${questions.length}`;
}

loadQuestion();
