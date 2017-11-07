'use strict';

$(document).ready(function(){
  render();
  handleStartQuiz();
  handleEvaluateAnswer();
  console.log('page load');
});



// In-memory database of questions
const QUESTIONS = [
  {question: 'What is the character\'s name in Metroid?',
    answers: ['Justin Bailey', 'Samus Aran', 'Langden Olger', 'Mother Brain'],
    correctAnswer: 'Samus Aran'
  },
  {question: 'Which Triforce did Zelda posess?',
    answers: ['Wisdom', 'Power', 'Speed', 'Heart'],
    correctAnswer: 'Wisdom'
  },
  {question: 'Who do you fight before Mike Tyson in Mike Tyson\'s Punch Out?',
    answers: ['Sand Man', 'Soda Popinski', 'King Hippo', 'Super Macho Man'],
    correctAnswer: 'Super Macho Man'
  },
  {question: 'What year did Dr. Light create Mega Man?',
    answers: ['200Y', '200X', '200Z', '200M'],
    correctAnswer: '200X'
  },
  {question: 'What level do you reach after level 99 in Duck Hunt?',
    answers: [98, 0, 1, 100],
    correctAnswer: 0
  }
];

//store state at 1st question
const STORE = {
  questions: QUESTIONS,
  currentIndex: null,
  ANSWERS: [],
  totalCorrect: 0
};

// store state 3rd question, first& second question answered
const STORE3 = {
  questions: QUESTIONS,
  currentIndex: 2,
  userAnswerChoice: ['useranswer1', 'useranswer2', ],
  totalCorrect: 0
};

function render(){
  if (STORE.currentIndex === null){
    $('.start').removeClass('hidden');
    $('.question-page').addClass('hidden');
    $('.question-result-page').addClass('hidden');
    $('.final-result-page').addClass('hidden');
  } else if (STORE.currentIndex < 5) {
    $('.start').addClass('hidden');
    $('.question-page').removeClass('hidden');
    $('.question-result-page').addClass('hidden');
    $('.final-result-page').addClass('hidden');
  } else {
    $('.start').addClass('hidden');
    $('.question-page').addClass('hidden');
    $('.question-result-page').addClass('hidden');
    $('.final-result-page').removeClass('hidden');
  }
}


//let totalCorrect = 0;

function currentScore(){
  STORE.ANSWERS.forEach(function(element, index){
    if (element === QUESTIONS[index].correctAnswer) {
      STORE.totalCorrect++;
    } 
  });
}

// Template generators
// displays question for current page 
function template() { 
  currentScore();
  const possibleAnswers = QUESTIONS[STORE.currentIndex].answers.map(function(val, index){
    return `
      <div><input type='radio' name='answer' value='${val}' data-index-attr='${index}' required />
        <span class='possible-answers'>
         ${val}
        </span>
      </div>
    `;
  }).join('');
  return `
      <div class="question-container">
        <h1 class="question-title">${QUESTIONS[STORE.currentIndex].question}</h1>
        <form id="answer-options">
          ${possibleAnswers}
          <div><input type="submit" value="Next"></div>
          
          <div>
          <p>Current Score:${STORE.totalCorrect}/${QUESTIONS.length}</p>
          <p>Question:${STORE.currentIndex+1}/${QUESTIONS.length}</p> 
      </div>
      </form>
    </div>`; 
    
  
}

//runs render at null state index (start page)
function handleStartQuiz() {
  $(':button').on('click', function(e){
    e.preventDefault();
    STORE.currentIndex=STORE.currentIndex++;
    render();
    console.log('handlestartquiz function');
    generateNextQuestion();
  });
}

function generateNextQuestion(){ 
  $('.question-page').html(template());
  console.log('generateNextQuestion function');
}
 
function nextQuestion(){
  STORE.currentIndex++;
  console.log('nextQuestion function');
}

function handleEvaluateAnswer() {
  $('.question-page').on('submit', '#answer-options', function(event){
    event.preventDefault();
    STORE.ANSWERS.push($('input[name="answer"]:checked').val());
    checkAnswer();
    //function to display question result page
    console.log(STORE.ANSWERS);     
    // Perform check: User answer === Correct answer?
    // Update STORE and render appropriate section
  });
}
function checkAnswer(){
  STORE.ANSWERS.forEach(function(el, index){
    if (el === QUESTIONS[index].correctAnswer){
      STORE.totalCorrect++;
      console.log(STORE.totalCorrect);
}
 }); 
  
  
}

//stored answes in STORE.ANSWERS
// const QUESTIONS = [
//   {question: 'What is the character\'s name in Metroid?',
//     answers: ['Justin Bailey', 'Samus Aran', 'Langden Olger', 'Mother Brain'],
//     correctAnswer: 'Samus Aran'

// const STORE = {
//   questions: QUESTIONS,
//   currentIndex: null,
//   ANSWERS: [],
//   totalCorrect: 0
// };
