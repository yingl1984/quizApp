/**
 * Example store structure
 */
const STORE = {
  questions: 
  [
    { title: "Which of these games came first?" , 
      choices: ["Super Mario World", "Super Mario Bros", "Super Mario Land", "Mario Bros"],
      correctIndex: 1,
      img:"images/q1-img.png",
      alt:"This is a picture of Super Mario Bros"
    },
    {
      title: "Which of these sentences is true about Mario and Luigi?",
      choices: ["Mario is taller and Luigi wears red", "Mario is shorter and Luigi wears red", "Mario is taller and Luigi wears green", "Mario is shorter and Luigi wears green"],
      correctIndex: 3,
      img:"images/q2-img.png",
      alt:"This is a picture of Mario and Luigi"
    },
    {
      title: "Mario went 3D in Super Mario 64, but in what year?",
      choices: ["1994", "1995", "1996", "1997"],
      correctIndex: 2,
      img:"images/q3-img.png",
      alt:"This is a picture of 3D Super Mario game"
    },
    {
      title: "What is the actual name of the raccoon-y outfit Mario wears?",
      choices: ["Kabooki suit", "Zanoosi suit", "Tanooki suit", "Adooki suit"],
      correctIndex: 2,
      img:"images/q4-img.png",
      alt:"This is a picture of Super Mario wearing in raccoon-y suit"
    },
    {
      title: "What is Princess Peach also known as?",
      choices: ["Princess Toadstool", "Princess Fungus", "Princess Mushroom", "Princess Portobello"],
      correctIndex: 0,
      img:"images/q5-img.png",
      alt:"This is a picture of princess Peach"
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
// main logical flow
function render(){
  $('#start').hide();
  $('#questions').hide();
  $('#feedback').hide();
  $('#summary').hide();
  $('#showScore').hide();

  if(!STORE.quizStarted){
    renderWel();
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

// render quiz title
function renderTitle(){
  $('#quizTitle').text("Super Mario quiz");
}

function renderWel(){
  $('#start').show();
  $('#start p').text("Welcome to the Super Mario quiz! There are 5 questions in the quiz. Please click the Start button to start the journey!");
}
// render the current score and current question number
function renderScore(){
  $('#showScore').show();
  $('#currentQueNum').text(`Question ${STORE.currentQuestionNum+1} of ${STORE.questions.length}`);
  $('#currentScore').text(`Score: ${STORE.score}/${STORE.questions.length}`);
}

// render the question and choices
function renderQuestion(){
  $('#questions').show();
  const curQue = STORE.questions[STORE.currentQuestionNum];
  //Fill the question into the <h2>
  $('#questions h2').text(curQue.title);
  // render the image
  $('#questions img').attr("src",curQue.img);
  $('#questions img').attr("alt",curQue.alt);
  // render the choices
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

// render the feedback page after user submiting the choice
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
  $('.correct-answer').text(`The correct answer is ${curQue.choices[curQue.correctIndex]}.`);
}

// render the summary page after user finished the quiz
function renderSummary(){
  $('#summary').show();
  $('#summary h2').text("Congratulations! You completed all the questions!");
  $('#summary p').text(`Your score is : ${STORE.score}/${STORE.questions.length}`);
}


/********** EVENT HANDLER FUNCTIONS **********/
// click start quiz button
function startQuiz(){
  $('#start-quiz').click(even=>{
   STORE.quizStarted = true;
    render();
  })
}

// click submit choice button
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

// click the next button
function nextQuestion(){
  $('#next').click(even => {
    STORE.hasFeedback=false;
    STORE.currentQuestionNum = STORE.currentQuestionNum + 1;
    render();
  });
}

// click the restart button
function restartQuiz(){
  $('#restart').click(event => {
    STORE.quizStarted = false;
    STORE.currentQuestionNum = 0; 
    STORE.score = 0;
    render();
  })
}

// the main function calling all the other functions
function quiz(){
  renderTitle();
  render();
  startQuiz();
  submitChoice();
  nextQuestion();
  restartQuiz();
}

$(quiz);