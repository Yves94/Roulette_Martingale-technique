console.log('--- EUROPEAN ROULETTE GAME ---');

/*\
|*| Game Variable
\*/

// Money engaged
var solde = 80;

// First amount to bet
var firstBet = 5;

// Number of roulette turn
var iteration = 50;

// Sequence before bet
var sequence = 2;

/*\
|*| Roulette Variable
\*/

// Array of possible color
var color = ['Black', 'Red', 'Green'];

// 37 Cell array
var cell = [];

// Historic of last color
var historicColor = [];

// Money betted
var betted = null;

// Iteration of loose time
var looseIteration = 1;

// Store money engaged
var moneyAtStart = solde;

/*\
|*| Test Variable
\*/

var isTest = false;

// Get data to each iteration for charts
var dataCollected = [];

var sessionWin = 0;
var sessionGain = 0;
var nbSession = 1000;

/*\
|*| Functions
\*/

main();

function main() {

    if (isTest) {
        for (var i = 0; i < nbSession; i++) {
            runSession();
        }
        
        console.log("Taux de réussite : " + (100 * sessionWin) / nbSession + "%");
        console.log("Gain moyen : " + (sessionGain / nbSession) + "$");
    } else {
        runSession();
    }
}

function runSession() {

    reset();
    
    console.log('START : ' + solde + '$');

    loadRoulette();

    for (var i = 0; i < iteration; i++) {
        if (!bet()) { break; }
        turnRoulette();
        checkMyBet();
        dataCollected.push(solde);
    }

    if (solde - moneyAtStart < 0) {
        dataCollected.push(0);
        console.log('Gain : ' + (solde * -1) + '$');
    } else {
        sessionWin++;
        sessionGain += (solde - moneyAtStart);
        console.log('Gain : ' + (solde - moneyAtStart) + '$');
    }
}

function loadRoulette() {
    var inverse = 0;
    for (var i = 0; i < 37; i++) {
        if (i == 0) {
            cell[i] = 2;
            continue;
        }
        if (i == 11 || i == 19 || i == 29) {
            inverse = (inverse) ? 0 : 1;
        }
        cell[i] = (i % 2 == inverse) ? 0 : 1;
    }
}

function turnRoulette() {
    var number = Math.floor(Math.random() * 37);
    var oddEven = (number == 0) ? '' : (number % 2 == 0) ? 'Even' : 'Odd';

    console.log(number + ' - ' + color[cell[number]] + ' - ' + oddEven);
    historicColor.push(cell[number]);
}

function bet() {
    if (historicColor.length < sequence ) return 1;

    // Get X last value of historic and set unique
    var lastRun = historicColor.slice(sequence * -1).filter( onlyUnique );

    // Remove green color if exist
    var index = lastRun.indexOf(2);
    if (index != -1) {
        lastRun.splice(index, 1);
    }

    if (lastRun.length == 1) {

        betted = (historicColor[historicColor.length - 1]) ? 0 : 1;
        var mise = firstBet * looseIteration;
        solde -= mise;
        if (solde < mise) {
            return 0;
        }
        console.log('BET : ' + solde + '$');
    }
    return 1
}

function checkMyBet() {
    if (betted != null) {
        if (historicColor[historicColor.length - 1] == betted) {
            
            solde += firstBet * (looseIteration * 2);
            looseIteration = 1;

            console.log('WIN : ' + solde + '$');
        } else {
            console.log('LOSE');
            looseIteration = looseIteration * 2;
        }
        betted = null;
    }
}

function reset() {
    dataCollected = [];
    solde = moneyAtStart;
    cell = [];
    historicColor = [];
    betted = null;
    looseIteration = 1;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}