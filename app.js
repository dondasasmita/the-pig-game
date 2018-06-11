//variables to store score, round-score, active player (0 or 1), and all dice rolled in the round
let scores = [0,0]
let roundScore = 0
let activePlayer = 0
let allDiceRolled = []


// function to reset game 
const resetGame = () => {
    //do not display the dice
    document.querySelector('.dice').style.display = 'none'
    //reset all scores to 0
    roundScore = 0
    activePlayer = 0
    scores = [0,0]
    allDiceRolled = []
    //display all score to 0
    document.querySelector('#score-0').textContent = scores[0]
    document.querySelector('#current-0').textContent = roundScore
    document.querySelector('#score-1').textContent = scores[1]
    document.querySelector('#current-1').textContent = roundScore
    //reset players'names
    document.querySelector('#name-0').textContent = 'Player 1'
    document.querySelector('#name-1').textContent = 'Player 2'
}

//change player function
const changePlayer = () => {
    // change next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    //player button change
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    //reset roundScore and allDiceRolled to 0
    roundScore = 0
    allDiceRolled = []
    //display the score 
    document.querySelector('#current-' + activePlayer).textContent = roundScore
}

//function to check for double six 
const checkDoubleSix = () => {
    // last index
    let lastIndex = allDiceRolled.length - 1
    if (allDiceRolled[lastIndex] === 6 && allDiceRolled[lastIndex - 1] === 6) {
        return true
     } else {
         return false
     }
}


//listen to click from roll dice button 
document.querySelector('.btn-roll').addEventListener('click', () => {
    // get a random number
    let dice = Math.floor(Math.random() * 6) + 1

    // display the results on the dice class
    let diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = 'images/dice-' + dice + '.png'
    
    // update the score only if number is not one
    if (dice !== 1) {
        //store dice value to the allDiceRolled 
        allDiceRolled.push(dice)
        //add the roundScore 
        roundScore += dice
        //check for double six
        if (checkDoubleSix() === true) {
            // activePlayer lose the game
            document.querySelector('#name-'+ activePlayer).textContent = 'Loser!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('loser')
            // change active player and reset game
            changePlayer()
        } 
        //set the current score 
        document.querySelector('#current-' + activePlayer).textContent = roundScore        
    } else { 
        changePlayer()
    }
})

//listen for click from the hold button
document.querySelector('.btn-hold').addEventListener('click', () => {
     //  //update global score 
     scores[activePlayer] += roundScore
     //display the score 
     document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer]

    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-'+ activePlayer).textContent = 'Winner!'
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active')
    } else {  
        //change player    
        changePlayer()  
    }

})

//listen for click from the new game button
document.querySelector('.btn-new').addEventListener('click', resetGame)

//listen for click from the rules button
document.querySelector('.btn-rules').addEventListener('click', () => {

    //get the rules
    const rules = document.getElementById('rules')
    
    //display the rules
    rules.style.display = "block"

    //get the close button and listen for click
    document.querySelector('.close').addEventListener('click', () => {
        rules.style.display = "none"
    })

    // When the user clicks anywhere outside of the rules box, close it
    window.onclick = function(event) {
        if (event.target == rules) {
            rules.style.display = "none";
        }
    }
})
