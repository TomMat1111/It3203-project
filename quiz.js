/* IT 3203 Final Project - Thomas Atalla
   Documentation: This script handles the interactive quiz logic. 
   It validates text, radio, and checkbox inputs and provides instant feedback 
   to the user based on research conducted for the HTTP project.
*/

const solutions = {
    q1: "stateless",
    q2: "200",
    q3: "443",
    q4: "GET",
    q5: ["method", "url"]
};

/**
 * Main function to calculate the score and display feedback
 */
function calculateScore() {
    let score = 0;
    const total = 5;

    // Q1: Fill-in-blank validation
    const q1Input = document.getElementById('q1').value.trim().toLowerCase();
    const isQ1Correct = q1Input === solutions.q1;
    if (isQ1Correct) score++;
    updateFeedback('q1', isQ1Correct, solutions.q1);

    // Q2, Q3, Q4: Radio validation (Three Multiple Choice)
    ['q2', 'q3', 'q4'].forEach(id => {
        const selected = document.querySelector(`input[name="${id}"]:checked`);
        const isCorrect = selected && selected.value === solutions[id];
        if (isCorrect) score++;
        updateFeedback(id, isCorrect, solutions[id]);
    });

    // Q5: Checkbox validation (Multi-selection)
    const checked = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(c => c.value);
    const isQ5Correct = checked.length === solutions.q5.length && 
                        checked.every(val => solutions.q5.includes(val));
    if (isQ5Correct) score++;
    updateFeedback('q5', isQ5Correct, "Request Method and URL Path");

    // UI Result Display logic
    const resArea = document.getElementById('result-display');
    const status = document.getElementById('final-status');
    const scoreText = document.getElementById('final-score');

    resArea.style.display = "block"; 
    scoreText.innerText = `Total Score: ${score} / ${total}`;

    // Scoring feedback colorization
    if (score >= 4) {
        status.innerText = "OVERALL RESULT: PASS";
        status.style.color = "#27ae60"; 
    } else {
        status.innerText = "OVERALL RESULT: FAIL";
        status.style.color = "#c0392b"; 
    }
}

/**
 * Helper function to provide specific feedback for each question
 */
function updateFeedback(qId, isCorrect, answer) {
    const el = document.getElementById(`feedback-${qId}`);
    el.innerHTML = isCorrect ? 
        `<span style="color: #27ae60;">Correct!</span>` : 
        `<span style="color: #c0392b;">Incorrect. The answer is: ${answer}</span>`;
}

/**
 * Resets the quiz UI and clears previous feedback
 */
function resetQuiz() {
    document.getElementById('result-display').style.display = "none";
    document.querySelectorAll('.feedback').forEach(el => el.innerHTML = "");
}