/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: 
  [
    { title: "Which of these games came first?" , 
    choices: ["Super Mario World", "Super Mario Bros", "Super Mario Land", "Mario Bros"],
    correctIndex: 2,
    },
    {
      title: "Which of these sentences is true about Mario and Luigi?",
      choices: ["Mario is taller and Luigi wears red", "Mario is shorter and Luigi wears red", "Mario is taller and Luigi wears green", "Mario is shorter and Luigi wears green"],
      correctIndex: 4
    },
    {
      title: "Mario went 3D in Super Mario 64, but in what year?",
      choices: ["1994", "1995", "1996", "1997"],
      correctIndex: 3
    },
    {
      title: "What is the actual name of the raccoon-y outfit Mario wears?",
      choices: ["Kabooki suit", "Zanoosi suit", "Tanooki suit", "Adooki suit"],
      correctIndex: 3
    },
    {
      title: "What is Princess Peach also known as?",
      choices: ["Princess Toadstool", "Princess Fungus", "Princess Mushroom", "Princess Portobello"],
      correctIndex: 1
    }
  ],
  quizStarted: false,
  currentQuestionNum: 0,
  score: 0,
  hasFeedback: false
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

  if(!STORE.started){
    $('#start').show();
  }else if(STORE.currentQuestionNum < STORE.questions.length){
    renderQuestion();
  }else{
    renderSummary();
  }
}

function renderQuestion(){
  $('#questions').show();
  const curQue = STORE.questions[STORE.currentQuestionNum];
  //Fill the question into the <h1>
  $('#questions h2').text(curQue.title);
  for(let i = 0; i < curQue.choices.length; i++){
    $('#choices').append(`
      <input type="radio", name="choice", value="${i}", id="${i}">
      <label for="${i}">${curQue.choices[i]}</label>
    `
    );
  }
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function startQuiz(){
  $('#start-quiz').click(even => {
    console.log("start button works");
    STORE.quizStarted = true;
    render();
  })
}


// logical procedure 
function quiz(){
  startQuiz();
  render();
}

$(quiz);