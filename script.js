const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-btn');
const previousButton = document.getElementById('prev-btn')
const questionContainerElement = document.getElementById('quiz-questions');
const progress = document.getElementById('progress')
const viewResult = document.getElementById('view-results')
const resultContainer = document.getElementById('results-container')


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

  circleBar.animate(1/15, {
    duration: 50
  });

startButton.addEventListener('click', startQuiz);


let correctAnswers = 0;
let selectedAnswers = [];

function startQuiz() {
      startButton.classList.add('hidden');
    //   shuffledQuestions = questions.sort(() => Math.random() - .5);
      currentQuestionIndex = 0;
      questionContainerElement.classList.remove('hidden');
      displayQuestion();
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
    circleBar.animate((currentQuestionIndex+1)/15, {
        duration: 50
      });
});

previousButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        circleBar.animate((currentQuestionIndex-1)/15, {
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
}



const questions = [
    {
        question: 'What Year Was Jupiter Exchange Founded?',
        answers: [
            { text: '2019', correct: false },
            { text: '1665', correct: false },
            { text: '2021', correct: true },
            { text: '2022', correct: false }
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
            { text: '30', correct: false },
            { text: '32', correct: true },
            { text: '29', correct: false },
            { text: '1', correct: false }
        ]
    }
    ,
    {
        question: 'What is the current circulating supply of $JUP tokens',
        answers: [
            { text: '100 Million', correct: false },
            { text: '1 Billion', correct: false },
            { text: '900 Million', correct: false },
            { text: '1.35 Billion', correct: true }
        ]
    },
    {
        question: "What is the current minimum threshold for a DAO vote to be considered valid",
        answers: [
            { text: '60 Million Votes', correct: false },
            { text: '120 Million Votes', correct: false },
            { text: '30% of Total Staked Jup', correct: true },
            { text: 'Meow makes all the calls', correct: false }
        ]
    }
    ,
    {
        question: "Which of these tokens did not launch on the LFG Launchpad",
        answers: [
            { text: '$DBR', correct: false },
            { text: '$CLOUD', correct: false },
            { text: '$WEN', correct: false },
            { text: '$W', correct: true }
        ]
    },
    {
        question: "What is the current ATH of $JUP",
        answers: [
            { text: '$2.00', correct: true },
            { text: '$2.30', correct: false },
            { text: '$1.98', correct: false },
            { text: '$67,024', correct: false }
        ]
    },
    {
        question: "What of these is NOT a product made by Jupiter Team",
        answers: [
            { text: 'Jup FOX', correct: false },
            { text: 'Jupiter Lock', correct: false },
            { text: 'Jup Pro', correct: true },
            { text: 'Jupiter Perps', correct: false }
        ]
    },
    {
        question: "What is the minumum amount of staked $JUP required to claim Planetaty Call POAPs",
        answers: [
            { text: '50', correct: true },
            { text: '1000', correct: false },
            { text: '60', correct: false },
            { text: '100', correct: false }
        ]
    },
    {
        question: "What animal is commonly used to represent members of the Jup Ecosystem",
        answers: [
            { text: 'Unicorn', correct: false },
            { text: 'Cats', correct: true },
            { text: 'Dogs', correct: false },
            { text: 'Brazilian Jaguar', correct: false }
        ]
    },
    {
        question: "How much was awarded to the winner of the Jupiter Integration track in the 2023 OPOS Hackathon",
        answers: [
            { text: '$15,000', correct: false },
            { text: '$50 Amazon Gift Card', correct: false },
            { text: '$25,000', correct: false },
            { text: '$10,000', correct: true }
        ]
    },
    {
        question: "Who is currently the Top 1% poster on the r/JupiterExchange Subreddit",
        answers: [
            { text: 'u/Opacksx', correct: true },
            { text: 'u/weremeow', correct: false },
            { text: 'u/xianspacekat', correct: false },
            { text: 'u/Korey001', correct: false }
        ]
    },
    {
        question: "Who was the first recipient of the JupDao working group grants",
        answers: [
            { text: 'Fabiano.sol X Jussy World', correct: false },
            { text: 'Organized General', correct: false },
            { text: 'Doctor Preballin', correct: true },
            { text: 'DeFiJupJam', correct: false }
        ]
    },
    {
        question: "Who writes and publishes the JupiterDAO newsletter on X",
        answers: [
            { text: 'SaxWeb3', correct: false },
            { text: 'AG', correct: true },
            { text: 'SIONG', correct: false },
            { text: 'ChatGPT', correct: false }
        ]
    },
    {
        question: "Choose One",
        answers: [
            { text: 'PPP', correct: true },
            { text: 'PVP', correct: false },
        ]
    }
    // Add more questions in the same format
  ];


  