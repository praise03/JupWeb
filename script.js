const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-btn');
const previousButton = document.getElementById('prev-btn')
const questionContainerElement = document.getElementById('quiz-questions');
const progress = document.getElementById('progress')
const viewResult = document.getElementById('view-results')
const resultContainer = document.getElementById('results-container')
const footer = document.getElementById('footer')


let currentQuestionIndex = 0;


const circleBar = new ProgressBar.SemiCircle("#progress-bar", {
    from: {color: "#76d484"},
    to: {color: "#00B6E7"},
    strokeWidth: 4,
    trailWidth: 1,
    trailColor: "#666",
    easing: "easeInOut",
    step: (state, shape) => {
      shape.path.setAttribute("stroke", state.color);
      shape.setText(currentQuestionIndex+1);
      shape.text.style.color = state.color;
      shape.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      shape.text.style.fontSize = '2rem';
    },
    text: {
        value: '',
        alignToBottom: true
      },
  });

  circleBar.animate(1/5, {
    duration: 50
  });

startButton.addEventListener('click', startQuiz);


let correctAnswers = 0;
let selectedAnswers = [];

function reloadFooter() {
    footer.classList.add('hidden');
    footer.classList.remove('hidden');
}

function startQuiz() {
      startButton.classList.add('hidden');
    //   shuffledQuestions = questions.sort(() => Math.random() - .5);
      currentQuestionIndex = 0;
      questionContainerElement.classList.remove('hidden');
      displayQuestion();
      reloadFooter();
}

function displayQuestion() {
    const questionElement = document.getElementById('question-element');
    const answersElement = document.getElementById('answers');


    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    answersElement.innerHTML = '';
    currentQuestion.answers.forEach((answer, index)  => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('bg-[#94E5A0]', 'border-b-2', 'mb-1', 'p-2', 'px-24', 'py-4', 'text-black', 'w-full', 'rounded-md', 'hover:bg-teal-900', 'hover:text-white');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', () => {
            document.querySelectorAll('#answers button').forEach(button => {
                button.classList.remove('bg-teal-900', 'text-white');
            });
            button.classList.add("bg-teal-900", "text-white")
            selectAnswer(answer);

        });

        // Mark the selected answer
        const selectedAnswer = selectedAnswers[currentQuestionIndex];
        if (selectedAnswer && answer.text === selectedAnswer.text) {
            button.classList.add('bg-teal-900', "text-white");
        } else {
            button.classList.remove('selected');
        }

        answersElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    selectedAnswers[currentQuestionIndex] = answer;

    if (answer.correct) {
        correctAnswers++;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        if (currentQuestionIndex == questions.length -1) {
        
            nextButton.innerText = "Submit"
        }
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

nextButton.addEventListener('click', () => {
    nextQuestion();
    circleBar.animate((currentQuestionIndex+1)/5, {
        duration: 50
      });
});

previousButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        circleBar.animate((currentQuestionIndex-1)/5, {
            duration: 50
        })   
    };
    if (nextButton.innerText == "Submit") {
        nextButton.innerText = "Next"
    }
    previousQuestion();
});

viewResult.addEventListener('click', () => {
    compareAnswers()
})


function showResults() {
    const questionElement = document.getElementById('question-element');
    const answersElement = document.getElementById('answers');
    // const resultsElement = document.getElementById('results');

    questionElement.textContent = '';
    answersElement.innerHTML = '';
    nextButton.classList.add("hidden")
    previousButton.classList.add("hidden")
    questionElement.textContent = `You answered ${correctAnswers} out of ${questions.length} questions correctly.`;
    viewResult.classList.remove('hidden')
}


function compareAnswers() {
    const resultsElement = document.getElementById('results');
    resultContainer.classList.remove('hidden')
    resultsElement.innerHTML = '';

    selectedAnswers.forEach((answer, index) => {
        const resultItem = document.createElement('h4');
        resultItem.classList.add('border-b-2')
        resultItem.innerHTML = `Question ${index + 1}. ${questions[index].question}:<br>
                                You answered <span class="text-black font-bold">${selectedAnswers[index].text}</span>. 
                                Correct Answer: <span class="text-green-900 font-bold">${questions[index].answers.find(a => a.correct).text}</span>`;
        resultsElement.appendChild(resultItem);
    });
    reloadFooter()
}



const questions = [
    {
        question: 'What Year Was Jupiter Exchange Founded?',
        answers: [
            { text: '2011', correct: false },
            { text: '1665', correct: false },
            { text: '2019', correct: true },
            { text: '2018', correct: false }
        ]
    },
    {
        question: 'Who is the current CEO of Jupiter Exchange?',
        answers: [
            { text: 'Meow', correct: true },
            { text: 'Elon Musk', correct: false },
            { text: 'FrankDeGods', correct: false },
            { text: 'Satoshi', correct: false }
        ]
    },
    {
        question: 'In 2024 how many weekly planetary calls have been hosted?',
        answers: [
            { text: '11', correct: false },
            { text: '32', correct: true },
            { text: '50', correct: false },
            { text: '44', correct: false }
        ]
    }
    ,
    {
        question: 'How many Jupiter products have been launched since 2023?',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: true },
            { text: '5', correct: false },
            { text: '4', correct: false }
        ]
    },
    {
        question: 'What is the minimum amount of JUP staked to qualify for POAPs',
        answers: [
            { text: '5', correct: false },
            { text: '50', correct: true },
            { text: '30', correct: false },
            { text: '20', correct: false }
        ]
    }
    // Add more questions in the same format
  ];


  