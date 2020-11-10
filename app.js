/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: 
  [
    { title: "Which of these games came first?" , 
    choices: ["Super Mario World", "Super Mario Bros", "Super Mario Land", "Mario Bros"],
    correctIndex: 1,
    },
    {
      title: "Which of these sentences is true about Mario and Luigi?",
      choices: ["Mario is taller and Luigi wears red", "Mario is shorter and Luigi wears red", "Mario is taller and Luigi wears green", "Mario is shorter and Luigi wears green"],
      correctIndex: 3
    },
    {
      title: "Mario went 3D in Super Mario 64, but in what year?",
      choices: ["1994", "1995", "1996", "1997"],
      correctIndex: 2
    },
    {
      title: "What is the actual name of the raccoon-y outfit Mario wears?",
      choices: ["Kabooki suit", "Zanoosi suit", "Tanooki suit", "Adooki suit"],
      correctIndex: 2
    },
    {
      title: "What is Princess Peach also known as?",
      choices: ["Princess Toadstool", "Princess Fungus", "Princess Mushroom", "Princess Portobello"],
      correctIndex: 0
    }
  ],
  quizStarted: false,
  currentQuestionNum: 0,
  score: 0,
  hasFeedback: false,
  guess: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/
function render(){
  $('#start').hide();
  $('#questions').hide();
  $('#feedback').hide();
  $('#summary').hide();
  $('#showScore').hide();

  if(!STORE.quizStarted){
    $('#start').show();
  }else if(STORE.hasFeedback){
    renderScore();
    renderFeedback();
  }else if(STORE.currentQuestionNum < STORE.questions.length){
    renderScore();
    renderQuestion();
  }else{
    renderSummary();
  }
}

function renderScore(){
  $('#showScore').show();
  $('#currentQueNum').text(`Question ${STORE.currentQuestionNum+1} of ${STORE.questions.length}`);
  $('#currentScore').text(`Score: ${STORE.score}/${STORE.questions.length}`);
}

function renderQuestion(){
  $('#questions').show();
  
  const curQue = STORE.questions[STORE.currentQuestionNum];
  //Fill the question into the <h2>
  $('#questions h2').text(curQue.title);
  $('#choices').text('');
  for(let i=0; i<curQue.choices.length; i++){
    $('#choices').append(`
      <input type="radio", name="choice", value="${i}", id="${i}", required="required">
      <label for="${i}", class="radioStyle">${curQue.choices[i]}</label>
      <br>
    `
    );
  }
}

function renderFeedback(){
  $('#feedback').show();
  $('#feedback h2').removeClass("green");
  $('#feedback h2').removeClass("red");

  $('.user-answer').text('');
  $('#feedback h2').text(STORE.hasFeedback);

  const curQue = STORE.questions[STORE.currentQuestionNum];
  if(STORE.hasFeedback === "Incorrect!"){
    
    $('#feedback h2').addClass("red");
    $('.user-answer').text(`You answered ${STORE.guess}.`); 
  }

  
  $('#feedback h2').addClass("green");
  // $('#feedback h2').className = "green";
  $('.correct-answer').text(`The correct answer is ${curQue.choices[curQue.correctIndex]}.`);
}

function renderSummary(){
  $('#summary').show();
  $('#summary p').text(`Your score is : ${STORE.score}/${STORE.questions.length}`);
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function startQuiz(){
  $('#start-quiz').click(even=>{
   STORE.quizStarted = true;
  
    render();
  })
}

function submitChoice(){
  $('#questions form').submit(even => {
    even.preventDefault();
    const userAnswer = $('input[type="radio"]:checked').val();
    const curQue = STORE.questions[STORE.currentQuestionNum];
    // debugger;
    if(userAnswer == curQue.correctIndex){
      STORE.score++;
      STORE.hasFeedback = "Correct!";
    }else{
      STORE.guess = STORE.questions[STORE.currentQuestionNum].choices[userAnswer];
      STORE.hasFeedback = "Incorrect!";
    }
    render();
  });
}

function nextQuestion(){
  $('#next').click(even => {
    STORE.hasFeedback=false;
    STORE.currentQuestionNum = STORE.currentQuestionNum + 1;
    render();
  });
}

function restartQuiz(){
  $('#restart').click(event => {
    STORE.quizStarted = false;
    STORE.currentQuestionNum = 0; 
    STORE.score = 0;
    render();
  })
}
// logical procedure 
function quiz(){
  render();
  startQuiz();
  submitChoice();
  nextQuestion();
  restartQuiz();
}

$(quiz);