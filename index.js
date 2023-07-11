const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple';
const totalQuestions = 10; 
let questionIndex = 0; 
let userAnswers = []; 
let score = 0; 
let startTime; 
let questionCache = []; 


async function fetchQuestionsFromAPI() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    if (data.results && data.results.length > 0) {
      questionCache = shuffleArray(data.results);
    } else {
      throw new Error('No questions received');
    }
  } catch (error) {
    console.log('Error fetching questions:', error);
  }
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function fetchRandomQuestion() {
  if (questionCache.length > 0) {
    return questionCache[questionIndex];
  } else {
    return null;
  }
}
function displayQuestion(question) {
    const questionTitle = document.getElementById('questionTitle');
    questionTitle.innerHTML = question.question;
  
    const optionButtons = document.querySelectorAll('.optionButton');
    const options = [...question.incorrect_answers, question.correct_answer];
    optionButtons.forEach((button, index) => {
      button.innerHTML = options[index]; 
      button.addEventListener('click', () => selectOption(button, question.correct_answer));
    });}

async function fetchRandomQuestion() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    if (data.results && data.results.length > 0) {
      return data.results[questionIndex];
    } else {
      throw new Error('No question received');
    }
  } catch (error) {
    console.log('Error fetching question:', error);
    return null;
  }
}


function displayQuestion(question) {
  const questionTitle = document.getElementById('questionTitle');
  questionTitle.innerHTML = question.question;

  const optionButtons = document.querySelectorAll('.optionButton');
  const options = [...question.incorrect_answers, question.correct_answer];
  optionButtons.forEach((button, index) => {
    button.textContent = options[index];
    button.addEventListener('click', () => selectOption(button, question.correct_answer));
  });

  
  optionButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove('selected', 'correct', 'incorrect');
  });

  const endQuizButton = document.getElementById('endQuiz-btn');
  endQuizButton.style.display = 'none';
}


function selectOption(optionButton, correctAnswer) {
  const optionButtons = document.querySelectorAll('.optionButton');
  optionButtons.forEach(button => button.classList.remove('selected'));

  optionButton.classList.add('selected');

  
  const selectedAnswer = optionButton.textContent;
  const isCorrect = selectedAnswer === correctAnswer;

  
  if (isCorrect) {
    optionButton.classList.add('correct');
    score++; 
  } else {
    optionButton.classList.add('incorrect');
  }
}


function handleNext() {
  const selectedOption = document.querySelector('.optionButton.selected');
  if (selectedOption) {
    const answer = selectedOption.textContent;
    userAnswers.push(answer);
  }

  questionIndex++;

  if (questionIndex < totalQuestions) {
    fetchRandomQuestion()
      .then(question => {
        if (question) {
          displayQuestion(question);
        } else {
          console.log('No question received');
          
        }
      });
  } else {
    endQuiz();
  }
}

function handleStartQuiz() {
  fetchRandomQuestion()
    .then(question => {
      if (question) {
        displayQuestion(question);
        
        const startButton = document.getElementById('start-btn');
        const nextButton = document.getElementById('next-btn');
        startButton.style.display = 'none';
        nextButton.style.display = 'block';
      } else {
        console.log('No question received');
        
      }
    });
}

function handleEndQuiz() {
  const queryString = `?score=${score}&totalQuestions=${totalQuestions}`;
  window.location.href = `results.html${queryString}`;
}


function startQuiz() {
  const startButton = document.getElementById('start-btn');
  startButton.addEventListener('click', handleStartQuiz);


  const nextButton = document.getElementById('next-btn');
  nextButton.addEventListener('click', handleNext);


  const endQuizButton = document.getElementById('endQuiz-btn');
  endQuizButton.addEventListener('click', handleEndQuiz);
}


function endQuiz() {
  const nextButton = document.getElementById('next-btn');
  nextButton.style.display = 'none';


  const endQuizButton = document.getElementById('endQuiz-btn');
  endQuizButton.style.display = 'block';
}

startQuiz();
