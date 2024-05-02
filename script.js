const wordEl = document.getElementById('word');
const question = document.getElementById('question');
// const scoreEl = document.getElementById('score');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const score=0
const answer = [
	'cat',
	'tiger',
	'delhi',
	'peacock',
	'earth'
];
const questions = [
	'which animal says meow?',
	'What is the national Animal of india?',
	'What is the capital of india?',
	'What is the national Bird of india?',
	'what is the name of the planet we live on? '
];
let index = Math.floor(Math.random()*questions.length)
let selectedWord = answer[index];
let selectedQuestion = questions[index];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
	// scoreEl.innerHTML=score:${score}
	question.innerHTML=`${selectedQuestion} `
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				letter => `
          <span class="letter">
            ${"aeiou".includes(letter)||correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won! 😃';
		popup.style.display = 'flex';
		playable = false;
		// score=score+1

	}
}

// Update the wrong letters
function updateWrongLettersEl() {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
`;

	// wrongLettersEl.innerHTML = `
    // ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    // ${wrongLetters.map(letter => <span>${letter}</span>)}`;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);

					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);

					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;

	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	index = Math.floor(Math.random() * answer.length);
	selectedWord=answer[index];
	selectedQuestion=questions[index]

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();