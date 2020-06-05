function createDropDown(){
  let dropdown = document.getElementById('testNames');
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose test';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  const url = 'https://printful.com/test-quiz.php?action=quizzes';
  fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.warn('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function(data) {
        let option;
      	for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
        	  option.text = data[i].title;
        	  option.value = data[i].id;
        	  dropdown.add(option);
      	}
        });
      })
    .catch(function(err) {
      console.error('Fetch Error -', err);
    });
}

function onClickButtnon() {
  var selectedOption = document.getElementById('testNames').value;
  var enteredName = document.getElementById('userName').value;
  if(selectedOption == "Choose test" && !enteredName){
    alert('Please enter your name and select test!');
  } else if(selectedOption == "Choose test"){
    alert('Please select test!');
  }else if(!enteredName){
    alert('Please enter your name!');
  } else {
    localStorage.setItem('selectedTest', JSON.stringify(selectedOption));
    localStorage.setItem('userName', JSON.stringify(enteredName));
    window.location = "TestQuestionsView.html";
  }

}

function onLoad(){
   clearLocalStorage();
   createDropDown();
}

function clearLocalStorage() {
localStorage.clear();
}

window.onload = onLoad();
