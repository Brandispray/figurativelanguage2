// Function to start the first activity
function startActivity() {
    window.location.href = "level1_flashcards2.html";
}

// Function to start the next level
function startNextLevel() {
    const currentLevel = getCurrentLevel();
    if (currentLevel === 1) {
        window.location.href = "level2_multiplechoice2.html";
    } else if (currentLevel === 2) {
        window.location.href = "level3_dragdrop2.html";
    }
}

// Function to get current level from URL
function getCurrentLevel() {
    const url = window.location.href;
    if (url.includes("level1")) {
        return 1;
    } else if (url.includes("level2")) {
        return 2;
    } else if (url.includes("level3")) {
        return 3;
    }
    return 0;
}

// Flashcards Activity
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("level1_flashcards2.html")) {
        const terms = [
            { term: "Simile", definition: "A comparison using 'like' or 'as'. (Example: 'As gentle as a lamb.')" },
            { term: "Metaphor", definition: "A direct comparison between two things. (Example: 'Time is a thief.')" },
            { term: "Personification", definition: "Giving human qualities to non-human things. (Example: 'The sun smiled down on us.')" },
            { term: "Hyperbole", definition: "Exaggeration for effect. (Example: 'I have a million things to do.')" },
            { term: "Idiom", definition: "A phrase with a meaning different from the literal meaning. (Example: 'Under the weather.')" },
            { term: "Onomatopoeia", definition: "A word that imitates a sound. (Example: 'Boom,' 'Crash.')" }
        ];

        let currentCard = 0;

        const flashcardContainer = document.getElementById("flashcard-container");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
        const progress = document.getElementById("progress");

        function displayCard(index) {
            flashcardContainer.innerHTML = `
                <div class="flashcard">
                    <h2>${terms[index].term}</h2>
                    <p>${terms[index].definition}</p>
                </div>
            `;
            progress.textContent = `Question ${index + 1} of ${terms.length}`;
        }

        displayCard(currentCard);

        prevBtn.addEventListener("click", () => {
            if (currentCard > 0) {
                currentCard--;
                displayCard(currentCard);
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentCard < terms.length - 1) {
                currentCard++;
                displayCard(currentCard);
            } else {
                window.location.href = "level1_complete2.html";
            }
        });
    }
});

// Multiple Choice Activity
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("level2_multiplechoice2.html")) {
        const questions = [
            { question: "Time is a thief.", correct: "metaphor" },
            { question: "She sings like an angel.", correct: "simile" },
            { question: "The leaves waved in the wind.", correct: "personification" },
            { question: "He is as fast as a cheetah.", correct: "simile" },
            { question: "I've told you a thousand times.", correct: "hyperbole" },
            { question: "Her heart is made of gold.", correct: "metaphor" },
            { question: "The car engine coughed and sputtered.", correct: "personification" },
            { question: "It's raining cats and dogs.", correct: "idiom" }
        ];

        let currentQuestion = 0;

        const questionContainer = document.getElementById("question-container");
        const result = document.getElementById("result");
        const progress = document.getElementById("progress");

        function displayQuestion(index) {
            questionContainer.innerHTML = `
                <p>${questions[index].question}</p>
                <button onclick="checkAnswer('simile', ${index})">Simile</button>
                <button onclick="checkAnswer('metaphor', ${index})">Metaphor</button>
                <button onclick="checkAnswer('personification', ${index})">Personification</button>
                <button onclick="checkAnswer('hyperbole', ${index})">Hyperbole</button>
                <button onclick="checkAnswer('idiom', ${index})">Idiom</button>
            `;
            progress.textContent = `Question ${index + 1} of ${questions.length}`;
        }

        displayQuestion(currentQuestion);

        window.checkAnswer = (answer, index) => {
            if (answer === questions[index].correct) {
                result.textContent = `Correct! '${questions[index].question}' is a ${questions[index].correct}.`;
                result.style.color = "green";
                setTimeout(() => {
                    if (currentQuestion < questions.length - 1) {
                        currentQuestion++;
                        displayQuestion(currentQuestion);
                        result.textContent = "";
                    } else {
                        window.location.href = "level2_complete2.html";
                    }
                }, 2000);
            } else {
                result.textContent = "Incorrect. Try again!";
                result.style.color = "red";
            }
        };
    }
});

// Drag and Drop Activity
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("level3_dragdrop2.html")) {
        const sentences = [
            { text: "She sings like an angel.", type: "simile" },
            { text: "Time is a thief.", type: "metaphor" },
            { text: "The leaves waved in the wind.", type: "personification" },
            { text: "He is as fast as a cheetah.", type: "simile" },
            { text: "I've told you a thousand times.", type: "hyperbole" },
            { text: "Her heart is made of gold.", type: "metaphor" },
            { text: "The car engine coughed and sputtered.", type: "personification" },
            { text: "I have a million things to do.", type: "hyperbole" }
        ];

        const dropzones = {
            simile: document.getElementById("simile-zone"),
            metaphor: document.getElementById("metaphor-zone"),
            personification: document.getElementById("personification-zone"),
            hyperbole: document.getElementById("hyperbole-zone")
        };

        const sentenceContainer = document.getElementById("sentences");
        sentences.forEach((sentence, index) => {
            const sentenceDiv = document.createElement("div");
            sentenceDiv.classList.add("sentence");
            sentenceDiv.id = `sentence-${index}`;
            sentenceDiv.textContent = sentence.text;
            sentenceDiv.draggable = true;
            sentenceDiv.ondragstart = (event) => {
                event.dataTransfer.setData("text", event.target.id);
            };
            sentenceContainer.appendChild(sentenceDiv);
        });

        for (let zone in dropzones) {
            dropzones[zone].ondragover = (event) => event.preventDefault();
            dropzones[zone].ondrop = (event) => {
                event.preventDefault();
                const data = event.dataTransfer.getData("text");
                const sentenceDiv = document.getElementById(data);
                const sentence = sentences.find(s => s.text === sentenceDiv.textContent);
                if (sentence.type === zone) {
                    dropzones[zone].appendChild(sentenceDiv);
                } else {
                    document.getElementById("result").textContent = "Incorrect. Try again!";
                    sentenceContainer.appendChild(sentenceDiv);
                }
            };
        }
    }
});

function submitAnswers() {
    const correctAnswers = {
        "sentence-0": "simile-zone",
        "sentence-1": "metaphor-zone",
        "sentence-2": "personification-zone",
        "sentence-3": "simile-zone",
        "sentence-4": "hyperbole-zone",
        "sentence-5": "metaphor-zone",
        "sentence-6": "personification-zone",
        "sentence-7": "hyperbole-zone"
    };
    let correct = true;
    let incorrectQuestions = [];

    for (let sentenceId in correctAnswers) {
        const sentenceDiv = document.getElementById(sentenceId);
        const parentElement = sentenceDiv.parentElement;
        if (parentElement.id !== correctAnswers[sentenceId]) {
            correct = false;
            incorrectQuestions.push(sentenceDiv.textContent);
        }
    }

    const resultDiv = document.getElementById("result");
    if (correct) {
        resultDiv.textContent = "Correct! You've categorized all the sentences correctly.";
        resultDiv.style.color = "green";
        setTimeout(() => {
            window.location.href = "level3_complete2.html";
        }, 2000);
    } else {
        resultDiv.textContent = `Incorrect sentences: ${incorrectQuestions.join(", ")}. Try again!`;
        resultDiv.style.color = "red";
    }
}

// Completion Page
function startOver() {
    window.location.href = "index2.html";
}
