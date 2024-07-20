/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById('games-container');

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    const newDiv = document.createElement('div');
    // add the class game-card to the list
    newDiv.classList.add('game-card');
    // set the inner HTML using a template literal to display some info
    // about each game
    newDiv.innerHTML = `<img src = ${games[i].img} width="300px"/> <br> 
    ${games[i].name} <br>
    Amount pledged: $${games[i].pledged} <br>
    Goal amount: $${games[i].goal}`;
    // append the game to the games-container
    gamesContainer.appendChild(newDiv);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById('num-contributions');

// use reduce() to count the number of total contributions by summing the backers
const numOfContribution = GAMES_JSON.reduce((item1, item2) => {
  return item1 + item2.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${numOfContribution.toLocaleString()}`;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById('total-raised');

const totalRaised = GAMES_JSON.reduce((acc, current) => {
  return acc + current.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById('num-games');

let total = GAMES_JSON.length;

gamesCard.innerHTML = `${total}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  // use filter() to get a list of games that have not yet met their goal
  const notEnoughFunding = GAMES_JSON.filter((games) => {
    return games.pledged < games.goal;
  });

  deleteChildElements(gamesContainer);
  addGamesToPage(notEnoughFunding);
  // use the function we previously created to add the unfunded games to the DOM
}

// show only games that are fully funded
function filterFundedOnly() {
  // use filter() to get a list of games that have met or exceeded their goal
  const enoughFunding = GAMES_JSON.filter((games) => {
    return games.pledged > games.goal;
  });

  deleteChildElements(gamesContainer);
  addGamesToPage(enoughFunding);
  // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  addGamesToPage(GAMES_JSON);
  // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
// add event listeners with the correct functions to each button

const unfundedBtn = document.getElementById('unfunded-btn');
const fundedBtn = document.getElementById('funded-btn');
const allBtn = document.getElementById('all-btn');

unfundedBtn.addEventListener('click', () => {
  filterUnfundedOnly();
});

fundedBtn.addEventListener('click', () => {
  filterFundedOnly();
});

allBtn.addEventListener('click', () => {
  showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById('description-container');

// use filter or reduce to count the number of unfunded games

const notEnoughFunding = GAMES_JSON.filter((games) => {
  return games.pledged < games.goal;
});

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${total} games. Currently, ${
  notEnoughFunding.length < total ? notEnoughFunding.length : '0'
} game remain unfunded. We need your help to fund these amazing games.`;

// create a new DOM element containing the template string and append it to the description container

const displayDescription = document.createElement('p');
displayDescription.textContent = displayStr;
descriptionContainer.appendChild(displayDescription);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById('first-game');
const secondGameContainer = document.getElementById('second-game');

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

const displayFirst = document.createElement('p');
displayFirst.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(displayFirst);

// do the same for the runner up item

const displaySecond = document.createElement('p');
displaySecond.textContent = `${secondGame.name}`;
secondGameContainer.appendChild(displaySecond);
