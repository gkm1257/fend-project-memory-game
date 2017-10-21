/*
 * Create a list that holds all of your cards
 */
let cardList = $(".card");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cardList);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].getElementsByTagName("i")[0].className;
        array[currentIndex].getElementsByTagName("i")[0].className = array[randomIndex].getElementsByTagName("i")[0].className;
        array[randomIndex].getElementsByTagName("i")[0].className = temporaryValue;
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
cardList.click(function() {
    if ($(this).hasClass("match") === false && $(this).hasClass("open") === false) {
        showCard($(this));
        addToOpen($(this));
        if (cardOpenList.length > 1) {
            checkMatch($(this));
        }
    }
});

function showCard(obj) {
    obj.addClass("show");
}

let cardOpenList = [];
function addToOpen(obj) {
    obj.addClass("open");
    cardOpenList.push(obj);
}

function checkMatch(obj) {
    if (obj.find("i")[0].className === cardOpenList[0].find("i")[0].className) {
        addMatch(obj);
    }
    removeShowOpen(obj);
    increaseMoveCount();
}

function addMatch(obj) {
    obj.addClass("match");
    cardOpenList[0].addClass("match");
}

function removeShowOpen(obj) {
    // delay 500ms to show the cards
    setTimeout(function() {
        obj.removeClass("show open");
        cardOpenList[0].removeClass("show open");
        cardOpenList = [];
    }, 500);
}

let moveCount = 0;
function increaseMoveCount() {
    moveCount++;
    if (moveCount === 1) {
        $(".moves").html(moveCount + " Move");
    }
    else {
        $(".moves").html(moveCount + " Moves");
    }
}