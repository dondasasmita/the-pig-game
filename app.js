/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

//total score index 0 is player 1 and index 1 is player 2 
let scores = [0,0]
//active player 0 or 1
let activePlayer = 0

// document.getElementById('score-0').textContent = '0'
// document.getElementById('current-0').textContent = '0'
// document.getElementById('score-1').textContent = '0'
// document.getElementById('current-1').textContent = '0'


document.querySelector('.dice').style.display = 'none'

const changePlayer = () => {
    // change next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    //player button change
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
}

const checkWinner = () => {
    if (scores[activePlayer] === 100) {
        //do something
    }
}

document.querySelector('.btn-roll').addEventListener('click', () => {
    // get a random number
    let dice = Math.floor(Math.random() * 6) + 1

    // display the results on the dice class
    let diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = 'images/dice-' + dice + '.png'
    
    // update the score only if number is not one
    if (dice !== 1) {
        //add the roundScore to the globalPlayer
        scores[activePlayer] += dice
        //set the current score 
        document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer]
        checkWinner()
    } else { 
        //reset score to 0
        scores[activePlayer] = 0
        //display the score 
        document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer]
        changePlayer()
        //dice disappear
        // diceDOM.style.display = 'none'
    }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
    // display the results on the dice class
    let diceDOM = document.querySelector('.dice')
    //dice disappear
    diceDOM.style.display = 'none'
    //change player    
    changePlayer()
})


