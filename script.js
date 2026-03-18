// DOM ELEMENTS

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


//Quiz Questions

const quizQuestions = [
  {
    question: "Qual agente é conhecido por usar flechas de reconhecimento?",
    answers: [
      { text: "Sova", correct: true },
      { text: "Phoenix", correct: false },
      { text: "Jett", correct: false },
      { text: "Reyna", correct: false },
    ],
  },
  {
    question: "Qual mapa tem 3 bomb sites (A, B e C)?",
    answers: [
      { text: "Bind", correct: false },
      { text: "Haven", correct: true },
      { text: "Ascent", correct: false },
      { text: "Split", correct: false },
    ],
  },
  {
    question: "Qual agente consegue reviver um aliado?",
    answers: [
      { text: "Sage", correct: true },
      { text: "Skye", correct: false },
      { text: "Killjoy", correct: false },
      { text: "Viper", correct: false },
    ],
  },
  {
    question: "Em que ano o jogador Aspas foi campeão mundial (Valorant Champions)?",
    answers: [
      { text: "2021", correct: false },
      { text: "2022", correct: true },
      { text: "2023", correct: false },
      { text: "2024", correct: false },
    ],
  },
  {
    question: "Qual função (role) a Jett exerce no jogo?",
    answers: [
      { text: "Controladora", correct: false },
      { text: "Sentinela", correct: false },
      { text: "Duelista", correct: true },
      { text: "Iniciadora", correct: false },
    ],
  },
  {
    question: "Qual mapa possui teleportes?",
    answers: [
      { text: "Bind", correct: true },
      { text: "Icebox", correct: false },
      { text: "Lotus", correct: false },
      { text: "Fracture", correct: false },
    ],
  },
  {
    question: "Qual agente usa torretas para defender o bomb?",
    answers: [
      { text: "Cypher", correct: false },
      { text: "Killjoy", correct: true },
      { text: "Brimstone", correct: false },
      { text: "Omen", correct: false },
    ],
  },
  {
    question: "Qual time o Aspas representava quando foi campeão mundial?",
    answers: [
      { text: "LOUD", correct: true },
      { text: "Sentinels", correct: false },
      { text: "Fnatic", correct: false },
      { text: "Leviatán", correct: false },
    ],
  },
  {
    question: "Qual agente tem habilidade de flash em forma de pássaro?",
    answers: [
      { text: "Skye", correct: true },
      { text: "Breach", correct: false },
      { text: "Fade", correct: false },
      { text: "Yoru", correct: false },
    ],
  },
  {
    question: "A função principal de um duelista é:",
    answers: [
      { text: "Curar aliados", correct: false },
      { text: "Entrar primeiro e pegar eliminações", correct: true },
      { text: "Defender bomb sozinho", correct: false },
      { text: "Plantar spike automaticamente", correct: false },
    ],
  },
];



// Quiz state vars

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz() {
   // reset vars
   currentQuestionIndex = 0;
   score = 0;
   scoreSpan.textContent = score;

   startScreen.classList.remove("active");
   quizScreen.classList.add("active");

   showQuestion()
    

}

function showQuestion() {
    // reset  state 
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex /quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    // 50%

    questionText.textContent = currentQuestion.question

    //todo: explain this in a second
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")
        
        // dataset é usado para guardar um dado customizado 
        button.dataset.correct =  answer.correct

        button.addEventListener("click",selectAnswer);

        answersContainer.appendChild(button)
    })
}

function selectAnswer(event) {
    //checagem otimizada

    if(answersDisabled) return 

    answersDisabled = true

    const SelectedButton = event.target;
    const isCorrect = SelectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        }else if(button=== SelectedButton) {
            button.classList.add("incorrect");
        }
});

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        //VAI CHECKAR SE O QUIZ ACABOU MESMO
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()

        }else {
            showResults()
        }
    },1000)
}


function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");


    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    if(percentage == 100) {
        resultMessage.textContent = "AA VALOROSO TU MANJA DO GAME!"
    }else if (percentage>=80) {
        resultMessage.textContent = "AAAA valorino tu manja até que bem do vava em"
    }else if (percentage>=60) {
        resultMessage.textContent = "ihhhh quase deu uma de bronze em plá plá PLÁTINA"
    }else if (percentage>=40) {
        resultMessage.textContent = "avee maria bronze maldito"
    }else {
        resultMessage.textContent = "HAHAHAHHAHAHAHHAHAHAHAHAHHAHAHAHHAHA FERRO NOJENTO!"
    }

        let rank = "";

            if (percentage === 100) {           
                rank = "radiant";
            } else if (percentage >= 80) {
                rank = "diamond";
            } else if (percentage >= 60) {          
                rank = "platinum";
            } else if (percentage >= 40) {
                rank = "bronze";
            } else {
                rank = "iron";
            }

            spawnIcons(rank);
}

function spawnIcons(rank) {
    const resultScreen = document.getElementById("result-screen");

    for (let i = 0; i < 20; i++) {
        const img = document.createElement("img");

        img.src = `ASSETS/ranks/${rank}.png`;
        img.classList.add("falling-icon");

        // posição aleatória
        img.style.left = Math.random() * 100 + "vw";

        // tempo aleatório
        img.style.animationDuration = (Math.random() * 3 + 2) + "s";

        resultScreen.appendChild(img);

        // remove depois pra não travar o site
        setTimeout(() => {
            img.remove();
        }, 5000);
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}

