document
  .querySelector(".navigation .logo")
  .addEventListener("click", function () {
    location.href = "../index.html";
  });
document
  .querySelector(".otherPages .theory")
  .addEventListener("click", function () {
    location.href = "/TheoryPage/theory.html";
  });

document.getElementById("snapdropdown").addEventListener("click", function () {
  location.href = "/SnappingGamePage/Snapping.html";
});

let scores = [];
displayHighScoreData();
main();

function main() {
  const target = document.getElementById("targetId");
  target.removeEventListener("click", revertToStartDisplay);
  target.addEventListener("click", start), { once: true };
}

function start() {
  const shootingRange = document.getElementById("shootingRangeId");
  shootingRange.className = "shootingRangeLive";
  timeit();
  live();
}

function timeit() {
  const shootingRange = document.getElementById("shootingRangeId");
  const target = document.getElementById("targetId");
  shootingRange.addEventListener("click", countdown);
  target.removeEventListener("click", start);
}

function countdown() {
  const shootingRange = document.getElementById("shootingRangeId");
  shootingRange.removeEventListener("click", countdown);
  let counter = document.querySelector(".game .dashBoard .timer");
  const timing = setInterval(function () {
    if (parseInt(counter.textContent) != 45) {
      counter.textContent = parseInt(counter.textContent) - 1;
    } else {
      clearInterval(timing);
      end();
    }
  }, 1000);
}

function live() {
  const shootingRange = document.getElementById("shootingRangeId");
  const target = document.getElementById("targetId");
  target.textContent = "";
  target.addEventListener("click", takingScore);
  target.addEventListener("click", movetarget);
}

function movetarget() {
  const target = document.getElementById("targetId");
  xPosition = generateRandomNum(2, 18);
  yPosition = generateRandomNum(2, 68);
  target.style.gridRowStart = xPosition;
  target.style.gridColumnStart = yPosition;
  function generateRandomNum(min, max) {
    const difference = max - min;
    const ran = Math.random();
    const number = min + Math.floor(difference * ran);
    return number;
  }
}

function takingScore() {
  const currentScore = document.getElementById("scoreId");
  currentScore.textContent = parseInt(currentScore.textContent) + 1;
}

function end() {
  const shootingRange = document.getElementById("shootingRangeId");
  const target = document.getElementById("targetId");
  const currentScore = document.getElementById("scoreId").textContent;
  endDisplay();
  removeAllListners();
  console.log(currentScore);
  insertNewScore(currentScore, scores, 0, scores.length - 1);
  displayHighScoreData();
  shootingRange.className = "shootingRangeEndOption";
  target.addEventListener("click", revertToStartDisplay);
}
function endDisplay() {
  const target = document.getElementById("targetId");
  target.style.gridRowStart = 2;
  target.style.gridColumnStart = 2;
  /*target.display = flex;
  target.alignItems = center;
  target.justifyContent = center;*/
  target.textContent = "Again?";
  target.style.backgroundColor = "skyblue";
}
function revertToStartDisplay() {
  const shootingRange = document.getElementById("shootingRangeId");
  const timer = document.getElementById("timerId");
  const target = document.getElementById("targetId");
  const currentScore = document.getElementById("scoreId");
  shootingRange.className = "shootingRangeStartOption";
  currentScore.textContent =
    parseInt(currentScore.textContent) - parseInt(currentScore.textContent);
  target.textContent = "Play?";
  timer.textContent = "60";
  main();
}

function removeAllListners() {
  const shootingRange = document.getElementById("shootingRangeId");
  const target = document.getElementById("targetId");
  target.removeEventListener("click", start);
  target.removeEventListener("click", takingScore);
  target.removeEventListener("click", movetarget);
}

function displayHighScoreData() {
  if (scores.length > 6) {
    let topScores = scores.slice(scores.length - 6, scores.length);
    dislpayTopFiveHighScores(topScores);
  } else {
    dislpayTopFiveHighScores(scores);
  }
}

function dislpayTopFiveHighScores(array) {
  /*console.log(array);*/
  let allScoreSlots = document.getElementsByClassName("tries");
  for (let i = array.length - 1; i >= 0; i--) {
    let currentScore = array[array.length - 1 - i];
    let currentSlotElement = allScoreSlots[i];
    currentSlotElement.textContent = currentScore;
  }
}

function insertNewScore(scoreinput, array, startPosition, endPosition) {
  const score = parseInt(scoreinput);
  if (array.length > 2) {
    let middlePosition =
      Math.ceil((endPosition - startPosition) / 2) + startPosition;
    let middlePositionValue = parseInt(array[middlePosition]);
    if (startPosition == endPosition) {
      if (score >= middlePositionValue) {
        array.splice(middlePosition + 1, 0, score);
      } else if (score <= middlePositionValue) {
        array.splice(middlePosition, 0, score);
      }
    } else if (score >= middlePositionValue) {
      insertNewScore(score, array, middlePosition, endPosition);
    } else if (score <= middlePositionValue) {
      insertNewScore(score, array, startPosition, middlePosition - 1);
    }
  } else if (array.length < 3) {
    if (array.length == 0) {
      array.push(score);
    } else {
      const length = array.length;
      for (let i = 0; i < length; i++) {
        if (score > parseInt(array[i])) {
          if (array.length - 1 == i) {
            array.push(score);
          } else {
            continue;
          }
        } else {
          array.splice(i, 0, score);
          break;
        }
      }
    }
  }
}
