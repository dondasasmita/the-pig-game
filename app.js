//total score index 0 is player 1 and index 1 is player 2 
let scores = [0,0]
// roundscrore
let roundScore = 0
//active player 0 or 1
let activePlayer = 0

let winner

document.querySelector('.dice').style.display = 'none'

//change player function
const changePlayer = () => {
    // change next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    //player button change
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    //reset roundScore to 0
    roundScore = 0
    //display the score 
    document.querySelector('#current-' + activePlayer).textContent = roundScore
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
        //add the roundScore 
        roundScore += dice
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
document.querySelector('.btn-new').addEventListener('click', () => {
    //do not display the dice
    document.querySelector('.dice').style.display = 'none'
    //reset all scores to 0
    roundScore = 0
    scores[0] = 0
    scores[1] = 0
    //display all score to 0
    document.querySelector('#score-0').textContent = scores[0]
    document.querySelector('#current-0').textContent = roundScore
    document.querySelector('#score-1').textContent = scores[1]
    document.querySelector('#current-1').textContent = roundScore
})

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
