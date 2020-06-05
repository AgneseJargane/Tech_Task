var getUserName = JSON.parse(localStorage.getItem('userName'));
var selectedTest =  JSON.parse(localStorage.getItem('selectedTest'));
var getAnswers = JSON.parse(localStorage.getItem('questionAnswers'));

function getCorrectAnswers() {
fetch('https://printful.com/test-quiz.php?action=submit&quizId='+selectedTest+'&answers[]='+getAnswers+'')
.then(function (response) {
  return response.json();
}).then(function (data) {
  var answers = data;
  var correctAnswers = answers.correct;
  var totalAnswers = answers.total;
  writeCorrectAnswersAndRespondent(correctAnswers,totalAnswers);
}).catch(function (err) {
  console.warn('Something went wrong.', err);
});
}

function writeCorrectAnswersAndRespondent(correctAnswers, totalAnswers){
  document.getElementById('user').innerHTML = "Thank you, " + getUserName + "!";
  document.getElementById('correctAnswers').innerHTML = "You responded correctly to "
   + correctAnswers + " out of " + totalAnswers+ " questions.";
}

function startNewTest() {
    window.location = "HomePage.html";
}

function onLoad(){
  getCorrectAnswers();
}
window.onload = onLoad;
