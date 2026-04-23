/* Thomas Atalla | IT 3203 Milestone 2 Quiz Logic */

const solutions = {
    q1: "stateless",
    q2: "200",
    q3: "443",
    q4: "GET",
    q5: ["method", "url"]
};

function calculateScore() {
    let score = 0;
    const total = 5;

    // Q1: Fill-in-blank
    const q1Input = document.getElementById('q1').value.trim().toLowerCase();
    const isQ1Correct = q1Input === solutions.q1;
    if (isQ1Correct) score++;
    updateFeedback('q1', isQ1Correct, solutions.q1);

    // Q2, Q3, Q4: Radios
    ['q2', 'q3', 'q4'].forEach(id => {
        const selected = document.querySelector(`input[name="${id}"]:checked`);
        const isCorrect = selected && selected.value === solutions[id];
        if (isCorrect) score++;
        updateFeedback(id, isCorrect, solutions[id]);
    });

    // Q5: Checkboxes
    const checked = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(c => c.value);
    const isQ5Correct = checked.length === solutions.q5.length && checked.every(val => solutions.q5.includes(val));
    if (isQ5Correct) score++;
    updateFeedback('q5', isQ5Correct, "Method and URL Path");

    // Results Display
    const resArea = document.getElementById('result-display');
    const status = document.getElementById('final-status');
    const scoreText = document.getElementById('final-score');

    resArea.classList.remove('hidden');
    scoreText.innerText = `Final Score: ${score} / ${total}`;

    // Conditional Styling for scores
    if (score >= 4) {
        status.innerText = "Result: PASS";
        status.style.color = "#27ae60"; // Green
    } else {
        status.innerText = "Result: FAIL";
        status.style.color = "#c0392b"; // Red
    }
}

function updateFeedback(qId, isCorrect, answer) {
    const el = document.getElementById(`feedback-${qId}`);
    el.innerHTML = isCorrect ? 
        `<span style="color: green;">Correct!</span>` : 
        `<span style="color: red;">Incorrect. Answer: ${answer}</span>`;
}

function resetQuiz() {
    document.getElementById('result-display').classList.add('hidden');
    document.querySelectorAll('.feedback').forEach(f => f.innerHTML = "");
}