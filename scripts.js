const TYPES = {
  normal: 0,
  fighting: 1,
  flying: 2,
  poison: 3,
  ground: 4,
  rock: 5,
  bug: 6,
  ghost: 7,
  steel: 8,
  fire: 9,
  water: 10,
  grass: 11,
  electric: 12,
  psychic: 13,
  ice: 14,
  dragon: 15,
  dark: 16,
  fairy: 17,
  0: "normal",
  1: "fighting",
  2: "flying",
  3: "poison",
  4: "ground",
  5: "rock",
  6: "bug",
  7: "ghost",
  8: "steel",
  9: "fire",
  10: "water",
  11: "grass",
  12: "electric",
  13: "psychic",
  14: "ice",
  15: "dragon",
  16: "dark",
  17: "fairy",
};

const COLORS = [
  "#A8A878",
  "#C03028",
  "#A890F0",
  "#A040A0",
  "#E0C068",
  "#B8A038",
  "#A8B820",
  "#705898",
  "#B8B8D0",
  "#F08030",
  "#6890F0",
  "#78C850",
  "#F8D030",
  "#F85888",
  "#98D8D8",
  "#7038F8",
  "#705848",
  "#EE99AC",
];

matchups = [
  [1, 1, 1, 1, 1,  0.5, 1, 0,  0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 1,  0.5,  0.5, 1, 2,  0.5, 0, 2, 1, 1, 1, 1,  0.5, 2, 1, 2,  0.5],
  [1, 2, 1, 1, 1,  0.5, 2, 1,  0.5, 1, 1, 2,  0.5, 1, 1, 1, 1, 1],
  [1, 1, 1,  0.5,  0.5,  0.5, 1,  0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [1, 1, 0, 2, 1, 2,  0.5, 1, 2, 2, 1,  0.5, 2, 1, 1, 1, 1, 1],
  [1,  0.5, 2, 1,  0.5, 1, 2, 1,  0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
  [1,  0.5,  0.5,  0.5, 1, 1, 1,  0.5,  0.5,  0.5, 1, 2, 1, 2, 1, 1, 2,  0.5],
  [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1,  0.5, 1],
  [1, 1, 1, 1, 1, 2, 1, 1,  0.5,  0.5,  0.5, 1,  0.5, 1, 2, 1, 1, 2],
  [1, 1, 1, 1, 1,  0.5, 2, 1, 2,  0.5,  0.5, 2, 1, 1, 2,  0.5, 1, 1],
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 2,  0.5,  0.5, 1, 1, 1,  0.5, 1, 1],
  [1, 1,  0.5,  0.5, 2, 2,  0.5, 1,  0.5,  0.5, 2,  0.5, 1, 1, 1,  0.5, 1, 1],
  [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2,  0.5,  0.5, 1, 1,  0.5, 1, 1],
  [1, 2, 1, 2, 1, 1, 1, 1,  0.5, 1, 1, 1, 1,  0.5, 1, 1, 0, 1],
  [1, 1, 2, 1, 2, 1, 1, 1,  0.5,  0.5,  0.5, 2, 1, 1,  0.5, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1,  0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [1,  0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1,  0.5,  0.5],
  [1, 2, 1,  0.5, 1, 1, 1, 1,  0.5,  0.5, 1, 1, 1, 1, 1, 2, 2, 1],
];

const boardSize = 250;
const pixelSize = 4;

var board;

/**
 * @type number[][][]
 */
var results;

/**
 * @type {CanvasRenderingContext2D}
 */
var ctx;

function resetBoard() {
  board = [];
  for(var i = 0; i < boardSize; i++) {
    board[i] = [];
    for(var j = 0; j < boardSize; j++) {
      board[i].push(-1);
    }
  }
}

function resetResults() {
  results = [];
  for(var i = 0; i < boardSize; i++) {
    results[i] = [];
    for(var j = 0; j < boardSize; j++) {
      results[i].push([-1, -1, -1, -1]);
    }
  }
}

function generateRandomBoard() {
  for(var i = 0; i < boardSize; i++) {
    board[i] = [];
    for(var j = 0; j < boardSize; j++) {
      board[i][j] = Math.floor(Math.random() * (Object.keys(TYPES).length / 2));
    }
  }
}

function drawScaledPixel(x, y, type) {
  ctx.fillStyle = COLORS[type];
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function drawBoard() {
  for(var i = 0; i < boardSize; i++) {
    for(var j = 0; j < boardSize; j++) {
      drawScaledPixel(i, j, board[i][j]);
    }
  }
}

function displayTable() {
  const sum = [];
  for(var i = 0; i < Object.keys(TYPES).length / 2; i++) {
    sum.push(0);
  }

  for(var i = 0; i < boardSize; i++) {
    for(var j = 0; j < boardSize; j++) {
      sum[board[i][j]]++;
    }
  }

  for(var i = 0; i < sum.length; i++) {
    document.getElementById("type-count-" + i).innerText = sum[i];
  }
}

function preload() {
  const canvas = document.getElementById("pokemon-canvas");
  ctx = canvas.getContext("2d");

  const typeCountBody = document.getElementById("table-type-count");
  for(var i = 0; i < Object.keys(TYPES).length / 2; i++) {
    typeCountBody.innerHTML += "<tr><td><img src='./img/" + TYPES[i] + ".webp' /></td><td id='type-count-"+i+"'>0</td></tr>";
  }
}

function tick() {
  // j = col
  // i = row
  for(var i = 0; i < boardSize; i++) {
    for(var j = 0; j < boardSize; j++) {
      if(j < boardSize - 1) {
        const me = board[i][j];
        const them = board[i][j + 1];

        try {
          var winSum = matchups[me][them] === 2 ? 2 : matchups[them][me] === 2 ? -2 : 0;
          winSum = me === them ? 0 : winSum;
          if(winSum > 0) {
            results[i][j + 1][3] = me;
          } else if(winSum < 0) {
            results[i][j][1] = them;
          }
        } catch(e) {
          // console.log(me, them);
        }

      }

      if(i < boardSize - 1){
        const me = board[i][j];
        const them = board[i + 1][j];

        try {
          var winSum = matchups[me][them] === 2 ? 2 : matchups[them][me] === 2 ? -2 : 0;
          winSum = me === them ? 0 : winSum;
          if(winSum > 0) {
            results[i + 1][j][0] = me;
          } else if(winSum < 0) {
            results[i][j][2] = them;
          }
        } catch(e) {
          // console.log(me, them);
        }
      }
    }
  }

  for(var i = 0; i < boardSize; i++) {
    for(var j = 0; j < boardSize; j++) {
      const sorted = results[i][j].sort();
      var bestStreak = 0;
      var bestNum = -1;

      var curStreak = 0;
      var curNum = -1;
      for(var k = 0; k < 4; k++) {
        const cur = sorted[k];
        if(cur !== curNum) {
          curNum = cur;
          curStreak = 0;
        }

        if(curNum !== -1) {
          curStreak++;
        }

        if(curStreak > bestStreak) {
          bestStreak = curStreak;
          bestNum = curNum;
        }
      }

      if(bestNum !== -1) {
        board[i][j] = bestNum;
      }
    }
  }
}

function draw() {
  displayTable();
  drawBoard();
}

var interval;
function start() {
  stop();
  resetBoard();
  generateRandomBoard();
  resetResults();
  draw();
  tick();
  interval = setInterval(() => {
    draw();
    tick();
    resetResults();
  }, 100);
}

function stop() {
  clearInterval(interval);
}