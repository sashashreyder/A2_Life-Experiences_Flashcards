const data = [
  {
    word: 'mature',
    prompt: 'Teens ___ at different ages depending on their life experience.',
    answer: 'mature',
    hint: 'They slowly become more adult.'
  },
  {
    word: 'passed away',
    prompt: 'Her grandmother ___ last winter.',
    answer: 'passed away',
    hint: 'She died peacefully.'
  },
  {
    word: 'loneliness',
    prompt: '___ can be difficult for elderly people.',
    answer: 'loneliness',
    hint: 'The feeling of being alone.'
  },
  {
    word: 'childhood',
    prompt: 'He often talks about his ___ in the countryside.',
    answer: 'childhood',
    hint: 'The time when he was a child.'
  },
  {
    word: 'coping',
    prompt: 'He was ___ with a lot of stress during the exam period.',
    answer: 'coping',
    hint: 'Dealing with something difficult.'
  },
  {
    word: 'wisdom',
    prompt: 'They say ___ comes with age.',
    answer: 'wisdom',
    hint: 'Knowing what is right through life experience.'
  },
  {
    word: 'retired',
    prompt: 'She had already ___ when her first grandchild was born.',
    answer: 'retired',
    hint: 'She stopped working permanently.'
  },
  {
    word: 'healthier',
    prompt: 'Now I feel ___ than I did last year.',
    answer: 'healthier',
    hint: 'My health is better.'
  },
  {
    word: 'shared',
    prompt: 'We have ___ many life stories together.',
    answer: 'shared',
    hint: 'We told each other personal memories.'
  },
  {
    word: 'adulthood',
    prompt: '___ comes with new freedoms and responsibilities.',
    answer: 'adulthood',
    hint: 'The time after childhood.'
  }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);













