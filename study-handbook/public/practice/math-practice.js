const select = document.querySelector("#practice-set");
const nextButton = document.querySelector("#next-question");
const questionCard = document.querySelector("#question-card");
const questionText = document.querySelector("#question-text");
const toggleAnswer = document.querySelector("#toggle-answer");
const answerBox = document.querySelector("#answer-box");
const answerText = document.querySelector("#answer-text");
const stepsList = document.querySelector("#steps-list");

let practiceData = {};
let cursor = {};
let currentItem = null;

function setOptions(data) {
  select.innerHTML = "";
  for (const [id, set] of Object.entries(data.sets)) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = set.title;
    select.append(option);
  }
}

function renderQuestion(item) {
  currentItem = item;
  questionCard.hidden = false;
  questionText.textContent = item.question;
  answerText.textContent = item.answer;
  stepsList.innerHTML = "";
  for (const step of item.steps) {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.append(li);
  }
  answerBox.hidden = true;
  toggleAnswer.textContent = "看答案";
}

function nextQuestion() {
  const setId = select.value;
  const set = practiceData.sets[setId];
  if (!set?.items?.length) return;
  const nextIndex = cursor[setId] || 0;
  cursor[setId] = nextIndex + 1;
  renderQuestion(set.items[nextIndex % set.items.length]);
}

toggleAnswer.addEventListener("click", () => {
  if (!currentItem) return;
  answerBox.hidden = !answerBox.hidden;
  toggleAnswer.textContent = answerBox.hidden ? "看答案" : "收起答案";
});

nextButton.addEventListener("click", nextQuestion);
select.addEventListener("change", nextQuestion);

const response = await fetch("./math-practice.json");
practiceData = await response.json();
setOptions(practiceData);
nextQuestion();
