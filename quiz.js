var questions = [{
  name: "published",
  num: 1,
  text: "How many of Jane Austen's books were published in her lifetime?",
  choices: [3, 4, 5, 6],
  answer: 4,
  description: "Four of Jane Austen's six novels were published in her lifetime: Sense & Sensibility, Pride & Prejudice, Mansfield Park, and Emma. Persuasion and Northanger Abbey were published after her death. Their publication was arranged by her sister Cassandra and her brother Henry Austen."
}, {
  name: "ring",
  num: 2,
  text: "A gold and turquoise ring once owned by Jane Austen was purchased by which U.S. singer?",
  choices: ["Taylor Swift", "Kelly Clarkson", "Gwen Stefani", "Sara Bareilles"],
  answer: "Kelly Clarkson",
  description: "Kelly Clarkson purchased Jane Auasten's gold and turquoise ring at auction last year. However, Clarkson was unable to take the ring out of the country, as UK Culture Minister Ed Vaizey banned the object from leaving the country, citing it as a national treasure. Clarkson agreed to re-sell the ring when The Jane Austen House Museum raised the money needed to match Clarkson's bid. The ring had been in Austen's family for 200 years."
}, {
  name: "child",
  num: 3,
  text: 'Which of her books did Jane Austen call "my darling child"?',
  choices: ["Pride and Prejudice", "Emma", "Mansfield Park", "Sense and Sensibility"],
  answer: "Pride and Prejudice",
  description: 'Jane referred to Pride and Prejudice as "her darling child." In a letter to her sister Cassandra, dated January 29, 1813, Jane spoke of receiving her copy of the three-volume book from her publisher. She said, “I want to tell you I have got my own darling child from London."'
}, {
  name: "marry",
  num: 4,
  text: "Who did Jane agree to marry but changed her mind the next day?",
  choices: ["Tom Lefroy", "Harris Bigg-Wither", "A clergyman, whose name is unknown", "Thomas Fowle"],
  answer: "Harris Bigg-Wither",
  description: 'Jane agreed to marry Harris Bigg-Wither, a wealthy neighbor. She later wrote to a family member, "Anything is to be preferred and endured rather than marrying without affection."'
}, {
  name: "death",
  num: 5,
  text: "How old was Jane Austen when she died?",
  choices: [37, 42, 45, 50],
  answer: 42,
  description: "Jane Austen was 42 when she died. It was thought that the author died of Addison's disease, a rare hormonal disorder. However, because she was too lucid in her final days to have died of Addison's disease, it has been suggested that Austen died of tuberculosis after drinking unpasteurized milk.",
}];
var score = 0;
var counter = 0;
// Counter for question
var currentQuestion = 0;
// Store active question in question variable
var question = questions[currentQuestion];
// Text for current question 
var currentText = question.text; 


// Create radio buttons
// console.log('<input name="' + question.name + '" ' + 'type="radio" value="' + question.choices[0] + '">' + question.choices[0] + '<br>');


// create input tags for radio buttons
function createInputTag(currentQuestion) {
  var thisAnswer = '<input name="' + question.name + '" ' + 'type="radio" value="' + question.choices[counter] + '">' + question.choices[counter] + '<br>';
  return thisAnswer;
}

// display question
function showQuestion() {
  var radio = [];
  // create inputs for radio buttons
  for (counter = 0; counter < question.choices.length; counter++) {
    createInputTag(question);
    radio.push(createInputTag(question));
  }

  // add question number to .questionNum
  $(".questionNum").append("<p>" + "Question " + question.num + " of " + questions.length + "</p>");
  // show question text within .questions
  $(".question").append(currentText);
  // add radio buttons to .options 
  $(".options").append(radio);
  // add submit button
  $(".options").append('<input name="submit" type="submit" value="Submit">');
}

// grade question
function gradeQuestion() {
  // get the value of the checked radio button:
  var answerValue = $("input[type='radio']:checked").val();
  // hide previous question 
  clearPrevious();
  // compare selected option to answer
  if (answerValue == null) {
    alert("Please select an answer.");
    showQuestion();
  }
  else {
  	// show if answer was correct
  	if (answerValue == question.answer) {
      // display "correct" message
      $(".question").append("<p>" + "Correct!" + "</p>");
      // add to the score
      score++;
    }
    else {
      // display "incorrect" message
      $(".question").append("<p>" + "Sorry, that is incorrect." + "</p>");
    }
    // display explanation of correct answer
    $(".question").append(question.description);
    // display next question button or score button
    if (question.num == 5) {
      $(".options").append('<input name="score" type="submit" value="Show Score">');
    }
    else {
      $(".options").append('<input name="next" type="submit" value="Next Question">');
    }
  }
}

// clear previous question displays
function clearPrevious() {
  $(".questionNum").empty();
  // hide question text within .questions
  $(".question").empty();
  // hide radio and submit buttons 
  $(".options").empty();
}


$(document).ready(function() {
  
  showQuestion();

  // When user clicks submit, grade the question
  $(document).on("click", "input[name='submit']", function() {
    //alert("line 118: I clicked on submit");
    gradeQuestion();
  });

  // When user clicks "Next Question", show next question
  $(document).on("click", "input[name='next']", function() {
    // update currentQuestion to next question
    currentQuestion++;
    // update question variable - ?? why did this not update with the global variable? why does it need to be local?
    question = questions[currentQuestion];
    // update currentText variable - ?? why did this not update with the global variable? why does it need to be local?
    currentText = question.text;
    // hide previous question 
    clearPrevious();
    //show question
    showQuestion();
  });

  // When user clicks on "Show Score", show score
  $(document).on("click", "input[name='score']", function() {
    // hide previous question 
    clearPrevious();
    // display score
    $(".question").append("<p>" + "You got " + score + " out of " + questions.length + " questions correct.");
    // play again
    $(".options").append('<input name="play" type="submit" value="Play Again">');
  });

  // When user clicks to play again, refresh page
  $(document).on("click", "input[name='play']", function() {
    location.reload();
  });

  // Prevent form from refreshing page
  $("form").submit(function(e) {
    e.preventDefault();
  });

}); // end document ready