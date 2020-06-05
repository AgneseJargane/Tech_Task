var selectedTest = JSON.parse(localStorage.getItem('selectedTest'));
valueIsSelected=false;

function getQuizes(index) {
  fetch('https://printful.com/test-quiz.php?action=questions&quizId='+selectedTest+'')
  .then(function (response) {
  	return response.json();
  }).then(function (data) {
    var question = data;
    var questionId = question.id;
    localStorage.setItem('question', JSON.stringify(question));
    questionNames(index);
    createProgressBarSections(question);
  }).catch(function (err) {
  	 console.warn('Something went wrong.', err);
  });
}

function getAnswers(questionId) {
  fetch('https://printful.com/test-quiz.php?action=answers&quizId='+selectedTest
  +'&questionId='+questionId+'')
  .then(function (response) {
    return response.json();
  }).then(function (data) {
      var answers = data;
      localStorage.setItem('answers', JSON.stringify(answers));
      addAnswersToButton();
  }).catch(function (err) {
      console.warn('Something went wrong.', err);
  });
}

function questionNames(index){
  var question = JSON.parse(localStorage.getItem('question'));
      if(question[index] != undefined) {
        questions = question[index].title;
        questionsId = question[index].id;
        var element =document.getElementById('questionName');
          if (element!=null) {
            document.getElementById('questionName').innerHTML = questions;
          } else {
            console.log("Empty element");
          }
        getAnswers(questionsId);
      } else {
        window.location = "ResultView.html";
  }
}

function addAnswersToButton() {
var questionAnswers = 0;
 var answers = JSON.parse(localStorage.getItem('answers'));
  for (let index =0; index< answers.length; index++) {
   button = document.createElement('button');
   var answerValue = answers[index].title;
   button.innerHTML = answerValue
   button.id = answers[index].id;
   button.className = "button-answers";
   var buttonDiv = document.getElementById('answerButton');
   buttonDiv.appendChild(button);
   button.onclick = function() {
    questionAnswers = answers[index].id;
    valueIsSelected = true;
    storeQuestionAnswers(questionAnswers)
    this.style.backgroundColor = "#6666FF";
    this.style.border = "#6666FF";
    }
  }
}

function storeQuestionAnswers(questionAnswers) {
  var clickedValue = [];
  clickedValue = JSON.parse(localStorage.getItem('questionAnswers')) || [];
  clickedValue.push(questionAnswers);
  localStorage.setItem('questionAnswers', JSON.stringify(clickedValue));
}

var numQuestions = 0, number=0;

function createProgressBarSections(question){
    for (var j = 0; j < question.length; j++){
          numQuestions++;
      }
  }

function updateProgress() {
    number++;
    var width = number / numQuestions * 100;
    $('#progress #bar').animate({'width':width + '%'});
}

function getQuestionWithAnswers(index) {
  getQuizes(index);
}

var questionIndex = 0;

 function nextQuestion() {
  if (valueIsSelected == true) {
    document.getElementById('answerButton').innerHTML = null;
    questionIndex++;
    updateProgress();
    questionNames(questionIndex)
    localStorage.setItem('questionIndex', JSON.stringify(questionIndex));
  } else {
      alert("Please choose the answer!")
  }
  valueIsSelected = false;
 }

function onLoad() {
  getQuestionWithAnswers(questionIndex);
}

window.onload = onLoad;
