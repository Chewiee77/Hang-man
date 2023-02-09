let players = 1;
localStorage.setItem('users', '[]');
document.querySelector('.one-player-btn').addEventListener('click', () => {
	players = 1;
	document.querySelector('.options').style.visibility = 'visible';
	document.querySelector('.one-player-chosen').style.visibility = 'visible';
});

document.querySelector('.two-player-btn').addEventListener('click', () => {
	players = 2;
	document.querySelector('.options').style.visibility = 'visible';
	document.querySelector('.two-players-chosen').style.visibility = 'visible';
});

localStorage.setItem('mode', 'easy');

document.querySelector('.easy-mode').addEventListener('click', () => {
	console.log('click');
	localStorage.setItem('mode', 'easy');
});
document.querySelector('.medium-mode').addEventListener('click', () => {
	console.log('click');
	localStorage.setItem('mode', 'medium');
});
document.querySelector('.expert-mode').addEventListener('click', () => {
	console.log('click');
	localStorage.setItem('mode', 'expert');
});

document.querySelector('.next-btn').addEventListener('click', () => {
	// spara namnet i local storage
	if (players === 1) {
		let user = {
			name: document.querySelector('#player-one-name').value,
			guesses: 0,
			wins: 0,
			losses: 0
		}
		localStorage.setItem('user', JSON.stringify(user))
	}
	window.location = 'index.html'
});
