
let cardList = $(".card"); // Create a list that holds all cards

shuffle(cardList); // Shuffle all cards

/**
* @description Shuffle an array {@link http://stackoverflow.com/a/2450976}
* @param {array} array
* @returns {array} Shuffled array
*/
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


let started = 0;
cardList.click(function() {
    if (started === 0) {
        started = 1;
        gameStart();
    }
    if ($(this).hasClass("match") === false && $(this).hasClass("open") === false && cardOpenList.length < 2) {
        showCard($(this));
        addToOpen($(this));
        if (cardOpenList.length > 1) {
            checkMatch($(this));
        }
    }
});

let sec = 0;
let timer;
const second = $(".sec");
const minute = $(".min");
const hour = $(".hr");
/**
* @description Pad 0 before single-digit integer
* @param {number} val
* @returns {string or number} Padded string or original value
*/
function pad(val) { return val > 9 ? val : "0" + val; }
/**
* @description Start countup timer {@link https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript}
*/
function gameStart() {
    let showSec = 0;
    let showMin = 0;
    let showHr = 0;
    timer = setInterval(function() {
        sec++;
        showSec = sec % 60;
        if (showSec == 0 || showSec == 1) {
            second.html(pad(showSec) + " sec");
        }
        else {
            second.html(pad(showSec) + " secs");
        }
        showMin = parseInt(sec / 60) % 60;
        if (showMin == 0 || showMin == 1) {
            minute.html(pad(showMin) + " min");
        }
        else {
            minute.html(pad(showMin) + " mins");
        }
        showHr = parseInt(sec / (60 * 60));
        if (showHr == 0 || showHr == 1) {
            hour.html(pad(showHr) + " hr");
        }
        else {
            hour.html(pad(showHr) + " hrs");
        }
    }, 1000);
}

/**
* @description Show current card
* @param {object} obj
*/
function showCard(obj) {
    obj.addClass("show");
}

let cardOpenList = [];
/**
* @description Open current card and add it to cardOpenList
* @param {object} obj
*/
function addToOpen(obj) {
    obj.addClass("open");
    cardOpenList.push(obj);
}

/**
* @description Check if the two opened cards match
* @param {object} obj
*/
function checkMatch(obj) {
    if (obj.find("i")[0].className === cardOpenList[0].find("i")[0].className) {
        addMatch(obj);
        matchCount += 2;
    }
    else {
        addWrong(obj);
    }
    removeShowOpen(obj);
    increaseMoveCount();

    // When all cards matched
    if (matchCount == 16) {
        clearInterval(timer); // Stop countup timer
        // Show total time spent
        if (parseInt(hour.html()) > 0) {
            $(".total-time").html(hour.html() + ' : ' + minute.html() + ' : ' + second.html());
        }
        else if (parseInt(minute.html()) > 0) {
            $(".total-time").html(minute.html() + ' : ' + second.html());
        }
        else {
            $(".total-time").html(second.html());
        }
        setTimeout(function() {
            winning();
        }, 1000);
    }
}

/**
* @description Mark current two cards as matched
* @param {object} obj
*/
function addMatch(obj) {
    obj.addClass("match");
    cardOpenList[0].addClass("match");
}
/**
* @description Mark current two cards as wrong
* @param {object} obj
*/
function addWrong(obj) {
    obj.addClass("wrong");
    cardOpenList[0].addClass("wrong");
}

/**
* @description Flip the two opened cards down
* @param {object} obj
*/
function removeShowOpen(obj) {
    // delay 500ms to show the cards
    setTimeout(function() {
        obj.removeClass("show open wrong");
        cardOpenList[0].removeClass("show open wrong");
        cardOpenList = [];
    }, 500);
}

let moveCount = 0;
/**
* @description Count moves and set star rating
*/
function increaseMoveCount() {
    moveCount++;
    if (moveCount === 1) {
        $(".moves").html(moveCount + " Move");
    }
    else {
        $(".moves").html(moveCount + " Moves");
    }
    // change star rating
    if (moveCount === 20) {
        $(".star").html("2 stars");
        removeStar();
    }
    else if (moveCount === 25) {
        $(".star").html("1 star");
        removeStar();
    }
}

/**
* @description Change the last filled star to a hollow one
*/
function removeStar() {
    $(".fa.fa-star").last()[0].className = "fa fa-star-o";
}


$(".restart").click(function() {
    reset();
});
/**
* @description Reset game
*/
function reset() {
    sec = 0;
    started = 0;
    clearInterval(timer);
    second.html("00 sec");
    minute.html("00 min");
    hour.html("00 hr");
    moveCount = 0;
    $(".moves").html(moveCount + " Move");
    cardOpenList = [];
    $(".show.open").removeClass("show open");
    matchCount = 0;
    $(".match").removeClass("match");
    shuffle(cardList);
    $(".fa.fa-star-o").each(function() {
        $(this)[0].className = "fa fa-star";
    });
}

let matchCount = 0;
/**
* @description Show winning message
*/
function winning() {
    document.getElementsByClassName("container")[0].style.display = 'none';
    document.getElementsByClassName("winning")[0].style.display = 'block';
}

// replay button
$(".button").click(function() {
    document.getElementsByClassName("container")[0].style.display = 'flex';
    document.getElementsByClassName("winning")[0].style.display = 'none';
    reset();
});
