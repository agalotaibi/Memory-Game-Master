/*
 * Create a list that holds all of your cards
 */

let firstCard = ''; 
let secCard = ''; 
let parentOne = '';
let parentTwo = '';
let ready = true;
let stopTimer = false;
let counter = 0;

document.querySelector('.restart').addEventListener('click', restart);
document.querySelector('.deck').addEventListener('click', function() {stopTimer = false; timerStart()});
document.querySelector('.deck').addEventListener('click', flip);
document.querySelector('.playAgain').addEventListener('click', function() {
document.querySelector('.popup').className = 'popup closed'; restart()});

function flip(evt) {
  
    if (evt.target.className == 'card' && counter != 2) {
          evt.target.className += ' open show';

  
      if (firstCard == false) {
        firstCard = evt.target.firstElementChild.className;
        parentOne = evt.target;
        counter = 1;
      } else {

  
        document.querySelector('.moves').innerText = +document.querySelector('.moves').innerText + 1;
    
        if (document.querySelector('.moves').innerText == '16' || document.querySelector('.moves').innerText == '22') {
          document.querySelector('.fa-star').parentNode.removeChild(document.querySelector('.fa-star'));
        }
  
        secCard = evt.target.firstElementChild.className;
        parentTwo = evt.target;
        counter = 2;
    
        if (firstCard == secCard) {
          parentOne.className = 'card open show match';
          parentTwo.className = 'card open show match';
          firstCard = '';
          secCard = '';
          counter = 0;
          winner();
        } 
        else {
          setTimeout(() => {
            evt.target.className = 'card close'; parentOne.className = 'card close'}, 500);
          setTimeout(() => {
            evt.target.className = 'card'; parentOne.className = 'card'; firstCard = ''; secCard = ''; counter = 0}, 700);
        }
      }
  
      ready = false;
  
    }
  }
const returnStars = () => {
    while (document.getElementsByClassName('fa-star').length != 3) {
      var newStar = document.createElement('li');
      newStar.className = 'fa fa-star';
      document.querySelector('.stars').appendChild(newStar);
    }
}
function restart() {
    firstCard = '';
    secCard = '';
      document.querySelector('.moves').innerText = '0';
      returnStars();
    document.querySelector('.popup').className = 'popup closed';
  
      let cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
      cards = shuffle(cards);
      const deck = document.querySelector('.deck');
  
      for (let i = 0; i < cards.length; i++) {
          deck.appendChild(cards[i]);
          cards[i].className = 'card';
      }
  
      ready = true;
    stopTimer = true;
  
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const timerStart = () => {
	if (ready == true) {
		var timer = 0;
		var hour = 0;
		var minute = 0;
		var second = 0;
		window.setInterval (() => {
		  ++timer;
		  hour = Math.floor(timer / 3600);
		  minute = Math.floor((timer - hour * 3600) / 60);
		  second = timer - hour * 3600 - minute * 60;
		  if (hour < 10) hour = '0' + hour;
		  if (minute < 10) minute = '0' + minute;
		  if (second < 10) second = '0' + second;
		  document.getElementById('timer').innerHTML = hour + ':' + minute + ':' + second;
		  if(stopTimer) {
			document.getElementById('timer').innerHTML = '00:00:00';
			timer = 0;
			hour = 0;
			minute = 0;
			second = 0;
			return;
		  }
		}, 1000);
	}
}


const winner = () => {
 document.querySelector('.movesCount').innerText = document.querySelector('.moves').innerText;
 document.querySelector('.starsCount').innerText = document.getElementsByClassName('fa-star').length;
 document.querySelector('.finalTime').innerText = document.querySelector('#timer').innerHTML;

 let matchingCards = document.getElementsByClassName('card match open show');
 if (matchingCards.length == 16) {
   setTimeout (function() {document.querySelector('.popup').className = 'popup'}, 500);
   stopTimer = true;
 }
}
