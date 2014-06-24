var score = 0;
var counter = 0;
var currentQuestion = 0;
var questions = [{
  qName: "published",
  qNum: 1,
  qText: "How many of Jane Austen's books were published in her lifetime?",
  qChoices: [3, 4, 5, 6],
  qAnswer: 4,
  qDescription: "Four of Jane Austen's six novels were published in her lifetime: Sense & Sensibility, Pride & Prejudice, Mansfield Park, and Emma. Persuasion and Northanger Abbey were published after her death. Their publication was arranged by her sister Cassandra and her brother Henry Austen."
}, {
  qName: "ring",
  qNum: 2,
  qText: "A gold and turquoise ring once owned by Jane Austen was purchased by which U.S. singer?",
  qChoices: ["Taylor Swift", "Kelly Clarkson", "Gwen Stefani", "Sara Bareilles"],
  qAnswer: "Kelly Clarkson",
  qDescription: "Kelly Clarkson purchased Jane Auasten's gold and turquoise ring at auction last year. However, Clarkson was unable to take the ring out of the country, as UK Culture Minister Ed Vaizey banned the object from leaving the country, citing it as a national treasure. Clarkson agreed to re-sell the ring when The Jane Austen House Museum raised the money needed to match Clarkson's bid. The ring had been in Austen's family for 200 years."
}, {
  qName: "child",
  qNum: 3,
  qText: 'Which of her books did Jane Austen call "my darling child"?',
  qChoices: ["Pride and Prejudice", "Emma", "Mansfield Park", "Sense and Sensibility"],
  qAnswer: "Pride and Prejudice",
  qDescription: 'Jane referred to Pride and Prejudice as "her darling child." In a letter to her sister Cassandra, dated January 29, 1813, Jane spoke of receiving her copy of the three-volume book from her publisher. She said, “I want to tell you I have got my own darling child from London."'
}, {
  qName: "marry",
  qNum: 4,
  qText: "Who did Jane agree to marry but changed her mind the next day?",
  qChoices: ["Tom Lefroy", "Harris Bigg-Wither", "A clergyman, whose name is unknown", "Thomas Fowle"],
  qAnswer: "Harris Bigg-Wither",
  qDescription: 'Jane agreed to marry Harris Bigg-Wither, a wealthy neighbor. She later wrote to a family member, "Anything is to be preferred and endured rather than marrying without affection."'
}, {
  qName: "death",
  qNum: 5,
  qText: "How old was Jane Austen when she died?",
  qChoices: [37, 42, 45, 50],
  qAnswer: 42,
  qDescription: "Jane Austen was 42 when she died. It was thought that the author died of Addison's disease, a rare hormonal disorder. However, because she was too lucid in her final days to have died of Addison's disease, it has been suggested that Austen died of tuberculosis after drinking unpasteurized milk.",
}]
// questions testing
// console.log(questions.length); // equals 5
// console.log(questions[0].qNum); // equals 1
// console.log(questions[0].qText) // equals "How many of Jane Austen's books were published in her lifetime?"
// console.log(typeof questions); // equals object
// Create radio buttons
// console.log('<input name="' + questions[currentQuestion].qName + '" ' + 'type="radio" value="' + questions[currentQuestion].qChoices[0] + '">' + questions[currentQuestion].qChoices[0] + '<br>');
// test the number of questions in array
//console.log(questions[currentQuestion].qChoices.length);
// create input tags for radio buttons

function createInputTag(currentQuestion) {
  var thisAnswer = '<input name="' + questions[currentQuestion].qName + '" ' + 'type="radio" value="' + questions[currentQuestion].qChoices[counter] + '">' + questions[currentQuestion].qChoices[counter] + '<br>';
  return thisAnswer;
}

// display question
function showQuestion() {
  var radio = [];
  // create inputs for radio buttons
  for (counter = 0; counter < questions[currentQuestion].qChoices.length; counter++) {
    createInputTag(currentQuestion);
    radio.push(createInputTag(currentQuestion));
    //console.log(radio);
  }
  // add question number to .questionNum
  $(".questionNum").append("<p>" + "Question " + questions[currentQuestion].qNum + " of " + questions.length + "</p>");
  // show question text within .questions
  $(".question").append(questions[currentQuestion].qText);
  // add radio buttons to .options 
  $(".options").append(radio);
  // add submit button
  $(".options").append('<input name="submit" type="submit" value="Submit">');
}

// grade question
function gradeQuestion() {
  // get the value of the checked radio button:
  var answerValue = $("input[type='radio']:checked").val();
  // test value of checked button
  // console.log(answerValue);
  // hide previous question 
  clearPrevious();
  // compare selected option to answer
  // test value of current question answer
  // console.log(questions[currentQuestion].qAnswer);
  if (answerValue == null) {
    alert("Please select an answer.");
    showQuestion();
  }
  else {
  	// show if answer was correct
  	if (answerValue == questions[currentQuestion].qAnswer) {
      // display "correct" message
      $(".question").append("<p>" + "Correct!" + "</p>");
      // add to the score
      score++;
      // test score
      // console.log(score);
    }
    else {
      // display "incorrect" message
      $(".question").append("<p>" + "Sorry, that is incorrect." + "</p>");
    }
    // display explanation of correct answer
    $(".question").append(questions[currentQuestion].qDescription);
    // display next question button or score button
    if (questions[currentQuestion].qNum == 5) {
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