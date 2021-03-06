/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, doubleSix;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random Number
		var dice = getRandom(6);

		// 2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display='block';
		diceDOM.src='dice-'+dice+'.png';
	
		// 3. Update the round score IF the rolled number was NOT  a 1
		if(dice !== 1) {
			//check if six is rolled, adds one if occurs, and if it has happened before, then nextPlayer()
			if (dice === 6) {
				doubleSix++;
				if(doubleSix === 2)
				{
					nextPlayer();
				}
				roundScore+=dice;
				document.querySelector('#current-'+activePlayer).textContent = roundScore;
			}
			//if no six is rolled double six is set to zero.
			else {
				doubleSix = 0;
				roundScore+=dice;
				document.querySelector('#current-'+activePlayer).textContent = roundScore;
			}
		}
		else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//add CURRENT to GLOBAL score
		scores[activePlayer] += roundScore;
		//update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//Check if player won the game	
		if(scores[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display='none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}
		else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

//Used to get random number between 1 and a, inclusive.
function getRandom(a) {
	return Math.floor(Math.random()*a+1)
}

function nextPlayer() {
	//next player
		activePlayer === 0 ? activePlayer=1: activePlayer=0;
		roundScore=0;

		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		// document.querySelector('.player-0-panel').classList.remove('active');
		// document.querySelector('.player-1-panel').classList.add('active');
		
		document.querySelector('.dice').style.display='none';
}

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	doubleSix = 0;

	document.querySelector('.dice').style.display='none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');
}

//Going to reduce the lines of code, April 14, 2019