const urlParams = new URLSearchParams(window.location.search);
const scoreParam = urlParams.get('score');
const score = scoreParam ? parseInt(scoreParam) : 0;

const totalQuestionsParam = urlParams.get('totalQuestions');
const totalQuestions = totalQuestionsParam ? parseInt(totalQuestionsParam) : 0;


const resultContainer = document.getElementById('resultContainer');
resultContainer.textContent = `You answered ${score} out of ${totalQuestions} questions correctly.`;

const restartButton = document.getElementById('resBtn');
restartButton.addEventListener('click', () =>{
  window.location.href = 'index.html';
});