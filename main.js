const questions = [
  {
    question: "Which is the right meaning of CSS?",
    answers: [
      { text: " Cascading Style Sheets", correct: true },
      { text: "cacaddinng sheet style", correct: false },
      { text: "Cummulative style sheet", correct: false },
      { text: "cascadding style sheet", correct: false },
    ],
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "\\", correct: false },
      { text: "/**/", correct: false },
      { text: "/!", correct: false },
    ],
  },
  {
    question: "Arrays are represented with?",
    answers: [
      { text: "{}", correct: false },
      { text: "()", correct: false },
      { text: "[]", correct: true },
      { text: "none of the above", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const submitButton = document.getElementById("submit-button");

let currentQuestionIndex = 0;
let score = 0;
//to get score
//start Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = `Next <i class="fa-solid fa-arrow-right"></i>`;
  prevButton.innerHTML = `Previous`;
  showQuestion();
}

function showQuestion() {
  //resetting previous question and answer
  resetState();
  //displaying current question
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  //code to display answer

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextButton.style.display = "inline-block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = ` Congratulation!You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Submit";
  prevButton.innerHTML = "Finished";
}

function handleNextButton() {
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerHTML = "SUBMIT";
  }
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    currentQuestionIndex++;
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex <= questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

//previous button
prevButton.addEventListener("click", handlePrevButton);

// Handle the previous button click
function handlePrevButton() {
  if (currentQuestionIndex === questions.length - 1) {
    prevButton.innerHTML = "";
  }
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}
// Submit Quiz
function handleSubmitButton() {
  showScore();
}

submitButton.addEventListener("click", handleSubmitButton);

//invoking our function
startQuiz();
