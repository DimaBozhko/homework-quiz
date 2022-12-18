const data = [
  {
    id: 1,
    question: "Which of these fish is actually a fish?",
    answers: [
      { answer: "swordfish", isCorrect: true },
      { answer: "jellyfish", isCorrect: false },
      { answer: "starfish", isCorrect: false },
      { answer: "crayfish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of:",
    answers: [
      { answer: "bees", isCorrect: false },
      { answer: "penguins", isCorrect: false },
      { answer: "butterflies", isCorrect: true },
      { answer: "camels", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "A group of which animals is referred to as a wake?",
    answers: [
      { answer: "bats", isCorrect: false },
      { answer: "vultures", isCorrect: true },
      { answer: "ants", isCorrect: false },
    ],
  },
];

// 1. Написати функцію, яка показуватиме відповіді та поточне питання.
//  В рамках цієї функції зробити перевірку на останнє питання і якщо перевірка проходить, то показувати результат.
 
let questionIndex = 0;
let selectedAnswer = null;
let correctCount = 0;
let wrongCount = 0;


const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submitBtn = document.querySelector(".submit");
const gameScreen = document.querySelector(".game");
const playAgainBtn = document.querySelector(".play");
const resultScreen = document.querySelector(".result");
const correctAnswers = resultScreen.querySelector(".correct");
const wrongAnswers = resultScreen.querySelector(".wrong"); 
const scoreResult = resultScreen.querySelector(".score"); 


const showQuestions = (i) => {

  if (i === data.length) {
    showResult();
  } else {
    question.textContent = `${data[i]["question"]}`

    const answerStr = data[i].answers.map((item, index) => `
    <div class="answer">
      <input type="radio" id=${index} name="answer" value=${item.isCorrect} />
      <label for=${index}>${item.answer}</label>
    </div>`).join("")
  
    answersContainer.innerHTML = answerStr;
    selectAnswers();
  }
}

showQuestions(questionIndex);


// 2. Написати функцію, яка вішатиме обробники подій click на всі відповіді. І записувати значення в змінну selectedAnswer



function selectAnswers() { // використав function declaration щоб зберегти структуру документу 

  answersContainer.querySelectorAll("input").forEach(element => {
    element.addEventListener("click", (event) => {
      selectedAnswer = event.target.value;
    })
  })

}



// 3. Написати функцію onSubmit, яка вішатиме обробник подій на кнопку Submit.
// Перевірити чи вибрана відповідь. Якщо вибрано, тоді зробити перевірку на правильну відповідь, інкрементувати correctCount або wrongCount.
// І також інкрементувати індекс наступного питання

const onSubmit = () => {

  submitBtn.addEventListener("click", () => {
    if (selectedAnswer) {
      selectedAnswer === "true" ? correctCount++ : wrongCount++;
      questionIndex++;
      showQuestions(questionIndex);
    } else {
      alert("select an answer")
    }
  })

}

onSubmit();

// 4. Написати функцію showResult, яка показуватиме блок із результатом та записуватиме значення
// По прикладу
  // `Correct Answers: ${correctCount}`;
  // `Wrong Answers: ${wrongCount}`;
  // `Score: ${(correctCount - wrongCount) * 10}`;

const showResult = () => {

  gameScreen.style.display = "none";
  resultScreen.style.display = "block";

  correctAnswers.textContent = `Correct Answers ${correctCount}`;
  wrongAnswers.textContent = `Wrong Answers ${wrongCount}`;
  scoreResult.textContent = `Score ${(correctCount - wrongCount) * 10}`

}

// 5. Написати функцію resetResult, яка скидатиме наступні значення
// questionIndex, correctCount, wrongCount

const resetResult = () => {

  questionIndex = 0;
  correctCount = 0; 
  wrongCount = 0;

}

// 6. Повісити обробник подій на кнопку Play again, яка має показувати блок із питаннями, приховати блок із результом, скинути всі значення в 0, а також показувати перше питання.

playAgainBtn.addEventListener("click", () => {
  
  gameScreen.style.display = "block";
  resultScreen.style.display = "none";

  resetResult();
  showQuestions(questionIndex);

})