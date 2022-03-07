var ai = null;

function startGame(player, color) {
  if (player == "ai") {
    if (color) {
      ai = color;
      clearChildren(document.getElementById("Container"));
      createBoard();
    } else {
      var cont = document.getElementById("startContainer");
      clearChildren(cont);

      var p = document.createElement("p");
      var z = document.createElement("button");
      var w = document.createElement("button");

      z.innerHTML = "Zwart";
      w.innerHTML = "Wit";
      p.innerHTML = "Kies de kleur die je wilt zijn";

      z.setAttribute("class", "myButton");
      z.setAttribute("onclick", "startGame('ai', 'W')");
      w.setAttribute("class", "myButton");
      w.setAttribute("onclick", "startGame('ai', 'Z')");

      cont.appendChild(p);
      cont.appendChild(z);
      cont.appendChild(w);
    }
  } else if (player == "human") {
    clearChildren(document.getElementById("Container"));
    createBoard();
  }
}

var board = [
  ["c", "Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z"],
  ["Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z", "c"],
  ["c", "Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z"],
  ["Z", "c", "Z", "c", "Z", "c", "Z", "c", "Z", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "W", "c", "W", "c", "W", "c", "W", "c", "W"],
  ["W", "c", "W", "c", "W", "c", "W", "c", "W", "c"],
  ["c", "W", "c", "W", "c", "W", "c", "W", "c", "W"],
  ["W", "c", "W", "c", "W", "c", "W", "c", "W", "c"]
]

function player(damSrc, src, direction, ally) {
  this.stones = 20;
  this.stone = {
    src: src,
    direction: direction,
    self: "stone"
  }
  this.dam = {
    src: damSrc,
    direction: 9,
    self: "dam"
  }
  this.ally = ally;
}
var black = new player(
  "Img/Zwartedam.png",
  "Img/Zwartesteen.png",
  1,
  "Z"
);
var white = new player(
  "Img/Wittedam.png",
  "Img/Wittesteen.png",
  -1,
  "W"
);
black.enemy = white;
white.enemy = black;

var operators = {
  '+': function(a, b) {
    return a + b
  },
  '-': function(a, b) {
    return a - b
  },
};
var turn = white;
var from = false;
var lastPos = false;

function createBoard() {
  from = false;

  var container = document.getElementById("game-container");
  clearChildren(container);

  for (r = 0; r < board.length; r++) {
    var row = createRow()
    container.appendChild(row);

    for (i = 0; i < board[r].length; i++) {
      switch (board[r][i]) {
        case "c":
          var empty = createEmptyW();
          empty.setAttribute("id", r + "." + i);
          row.appendChild(empty);
          break;

        case "Z":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(black, r, i, black.stone);
          empty.appendChild(stone);
          break;

        case "b":
          var empty = createEmptyZ();
          empty.setAttribute("id", r + "." + i);
          row.appendChild(empty);
          break;

        case "W":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(white, r, i, white.stone);
          empty.appendChild(stone);
          break;

        case "Wd":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(white, r, i, white.dam);
          empty.appendChild(stone);
          break;

        case "Zd":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(black, r, i, black.dam);
          empty.appendChild(stone);
          break;
      }
    }
  }
  if (black.stones == 0) {
    alert("Wit heeft gewonnen");
  }
  if (white.stones == 0) {
    alert("Zwart heeft gewonnen")
  }
  document.getElementById("black").innerHTML = "Zwarte stenen: " + black.stones + " |";
  document.getElementById("white").innerHTML = "Witte stenen: " + white.stones + " |";
  document.getElementById("scoreboard").innerHTML = turn.ally + " zijn beurt |";
  if (ai) {
    beepBoop();
  }
}

function createRow() {
  var row = document.createElement("div");
  row.setAttribute("class", "row-container");
  return row;
}

function createEmptyW() {
  var empty = document.createElement("div");
  empty.setAttribute("class", "spelvak");
  return empty;
}

function createStone(color, r, i, stats) {
  var stone = document.createElement("img");
  stone.setAttribute("src", stats.src);
  stone.setAttribute("id", r + "." + i);
  stone.stats = stats;

  stone.addEventListener("click", function() {
    moveCheck(this, color, stats);
  });
  return stone
}

function createEmptyZ() {
  var empty = createEmptyW();
  if (turn.ally == "W") {
    var player = white;
  } else if (turn.ally == "Z") {
    var player = black;
  }
  empty.addEventListener("click", function() {
    moveCheck(this, "empty");
  });
  return empty;
}

function clearChildren(p) {
  while (p.firstChild) {
    p.removeChild(p.firstChild)
  }
}

function moveCheck(elem, player) {
  // check of het jouw beurt is
  if (ai == turn.ally) {
    return false;
  } else {
    moveStart(elem, player);
  }
}

function moveStart(elem, player) {
  //check op wat je klikt
  if (player !== "empty") {

    if (turn.ally == player.ally) {
      //deselecteer steen als je op een andere klikt
      if (from) {
        from.style.border = "none";
      }
      //selecteer steen als die van jouwzelf is
      from = elem;
      from.style.border = "1px solid red";
    } else {
      return false;
    }
  }
  // check of je hiervoor al een steen geslagen hebt
  if (lastPos) {
    console.log(lastPos);
    // check of je kan slaan met de steen waarmee je voor het laatst hebt geslagen
    if (lastPos.stats.self == "stone") {
      var canJump = checkSingleJump(lastPos.column, lastPos.row);
    } else if (lastPos.stats.self == "dam") {
      var canJump = checkSingleDamJump(lastPos.column, lastPos.row);
    }
    if (canJump[0]) {
      for (var i = 0; i < canJump.length; i++) {
        var fromPos = getPosition(from.id);
        var toPos = getPosition(elem.id);
        var canJumpPos = getPosition(canJump[i]);
        if (checkSelectedJump(fromPos, toPos, canJumpPos, player, from.stats)) {
          return true;
        }
      }
    }
    alert("je kan slaan");
    return false;
  }
  //check of je kan slaan
  if (checkJump()) {
    console.log(turn.jumpArr);
    for (var i = 0; i < turn.jumpArr.length; i++) {
      var fromPos = getPosition(from.id);
      var jumpPos = getPosition(turn.jumpArr[i]);
      var toPos = getPosition(elem.id);
      if (checkSelectedJump(fromPos, toPos, jumpPos, player, from.stats)) {
        return true;
      }
    }
    alert("je kan slaan");
    return false;
  }
  //check of je steen hebt geselecteerd en of je daarna hebt geklikt op een leeg bruin vak
  if (from && player == "empty") {
    movePiece(elem, from);
  }
}

function checkSelJump(fromPos, toPos, jumpPos, player, stats, direction) {
  console.log(direction);
  var dir = direction.split(".");
  // als speler ook echt geklikt heeft op het vakje waardoor hij kan slaan

  if (stats.self == "stone") {
    if (toPos.column == operators[dir[0]](jumpPos.column, 2) && toPos.row == operators[dir[1]](jumpPos.row, 2)) {
      board[operators[dir[0]](fromPos.column, 1)].splice(operators[dir[1]](fromPos.row, 1), 1, "b");
      jumpStone(toPos, fromPos, stats);
      return true;
    }
  } else if (stats.self == "dam") {
    var x = 1;
    var xx = 1;
    var enemyCount = 0;
    var jumpPosDam = [];
    var enemyArr = [];
    while (board[operators[dir[0]](jumpPos.column, x)] && board[operators[dir[0]](jumpPos.column, x)][operators[dir[1]](jumpPos.row, xx)]) {
      // als er een vijandige steen is sla deze op
      if (board[operators[dir[0]](jumpPos.column, x)][operators[dir[1]](jumpPos.row, xx)] == turn.enemy.ally || board[operators[dir[0]](jumpPos.column, x)][operators[dir[1]](jumpPos.row, xx)] == turn.enemy.ally + "d") {
        enemyArr.push(getPosition(RItoPosition(operators[dir[0]](jumpPos.column, x), operators[dir[1]](jumpPos.row, xx))));
        enemyCount++;
      }
      // als er een lege plek is gevonden achter een vijandige steen sla deze op, hier mag je op kliken
      if (enemyCount == 1 && board[operators[dir[0]](jumpPos.column, x)][operators[dir[1]](jumpPos.row, xx)] == "b") {
        jumpPosDam.push(getPosition(RItoPosition(operators[dir[0]](jumpPos.column, x), operators[dir[1]](jumpPos.row, xx))));
      }
      // als er 2 vijandige stenen zijn of wanneer er een steen van jouwzelf is break de loop
      if (enemyCount == 2 || board[operators[dir[0]](jumpPos.column, x)][operators[dir[1]](jumpPos.row, xx)] == turn.ally || board[operators[dir[0]](jumpPos.column, x)][operators[dir[1]](jumpPos.row, xx)] == turn.ally + "d") {
        break;
      }
      x++;
      xx++;
    }
    console.log(enemyArr);
    console.log(jumpPosDam);
    for (var i = 0; i < jumpPosDam.length; i++) {
      if (toPos.column == jumpPosDam[i].column && toPos.row == jumpPosDam[i].row) {
        board[enemyArr[0].column].splice(enemyArr[0].row, 1, "b");
        jumpStone(toPos, fromPos, stats);
        return true;
      }
    }
  }
  return false;
}

function checkSelectedJump(fromPos, toPos, jumpPos, player, stats) {
  // check of je een steen hebt geselecteerd waarmee je kan slaan
  if (fromPos.column == jumpPos.column && fromPos.row == jumpPos.row) {
    // check of je ook echt gaat slaan en niet gaat bewegen met de steen
    // check of je op een leeg vak klikt
    if (player == "empty") {
      switch (jumpPos.direction) {
        // kan naar linksonder slaan
        case "++":
          if (checkSelJump(fromPos, toPos, jumpPos, player, stats, "+.+")) {
            return true;
          }
          return false;
          break;
          //kan naar rechtsonder slaan
        case "+-":
          if (checkSelJump(fromPos, toPos, jumpPos, player, stats, "+.-")) {
            return true;
          }
          return false;
          break;
          // kan naar rechtsboven slaan
        case "--":
          if (checkSelJump(fromPos, toPos, jumpPos, player, stats, "-.-")) {
            return true;
          }
          return false;
          break;
          // kan naar linksboven slaan
        case "-+":
          if (checkSelJump(fromPos, toPos, jumpPos, player, stats, "-.+")) {
            return true;
          }
          return false;
          break;
      }
      return false;
    }
    return true;
  }
}

function getPosition(positionId) {
  var pos = positionId.split(".");
  var position = {
    column: parseInt(pos[0]),
    row: parseInt(pos[1]),
  };
  if (pos[2]) {
    position.direction = pos[2];
  }
  return position
}

function movePiece(elem, from) {
  console.log(from.stats);
  console.log(from);

  var fromPos = getPosition(from.id);
  var toPos = getPosition(elem.id);
  // check of je een dam of een normale steen hebt geselecteerd
  if (from.stats.self == "stone") {
    // Als de steen die je geselecteerd hebt zn positie gelijk staat aan de column voor de steen
    if (fromPos.column + turn.stone.direction == toPos.column) {
      console.log(fromPos.column + turn.stone.direction);
      console.log(toPos.column);
      // Als de steen die je geselecteerd hebt zn positie gelijk staat aan de row schuin tegenover hem
      if (fromPos.row + 1 == toPos.row) {
        var to = 1;
      }
      if (fromPos.row - 1 == toPos.row) {
        var to = -1;
      }
      if (to) {
        changeBoard(toPos, fromPos);
        turn = turn.enemy;
        createBoard();
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }
  } else if (from.stats.self == "dam") {
    // check of je goed kan bewegen met de dam
    console.log(fromPos);
    console.log(toPos);
    var pos = getPosition(from.id);
    while (pos.column !== toPos.column && pos.row !== toPos.row) {
      // check of je naar rechtsboven kan bewegen
      if (toPos.column < pos.column && toPos.row < pos.row) {
        pos.column--;
        pos.row--;
      }
      // check of je naar linksboven kan bewegen
      if (toPos.column < pos.column && toPos.row > pos.row) {
        pos.column--;
        pos.row++;
      }
      // check of je naar linksonder kan bewegen
      if (toPos.column > pos.column && toPos.row > pos.row) {
        pos.column++;
        pos.row++;
      }
      // check of je naar rechtsonder kan bewegen
      if (toPos.column > pos.column && toPos.row < pos.row) {
        pos.column++;
        pos.row--;
      }
      // check of de lijn van de steen naar de plek waar je op klikt leeg is en bruin is
      if (board[pos.column][pos.row] !== "b") {
        break;
      }
    }
    if (pos.column == toPos.column && pos.row == toPos.row) {
      changeBoard(toPos, fromPos, from.stats);
      turn = turn.enemy;
      createBoard();
      return true
    } else {
      return false;
    }
  }
  return false;
}

function checkJump() {
  turn.jumpArr = [];
  if (!lastPos) {
    for (r = 0; r < board.length; r++) {

      for (i = 0; i < board[r].length; i++) {

        if (board[r][i] == turn.ally) {
          var stoneJumpArr = checkSingleJump(r, i);
          if (stoneJumpArr[0]) {
            for (var x = 0; x < stoneJumpArr.length; x++) {
              turn.jumpArr.push(stoneJumpArr[x]);
            }
          }
        } else if (board[r][i] == turn.ally + "d") {
          var damJumpArr = checkSingleDamJump(r, i);
          console.log(damJumpArr);
          if (damJumpArr[0]) {
            for (var x = 0; x < damJumpArr.length; x++) {
              turn.jumpArr.push(damJumpArr[x]);
            }
          }
        }
      }
    }
    console.log(turn.jumpArr);
  }
  if (turn.jumpArr[0]) {
    console.log(turn.jumpArr);
    return true;
  } else {
    return false;
  }
}

function checkSingleDam(r, i, direction) {
  console.log(direction);
  var dir = direction.split(".");
  var x = 1;
  var xx = 1;
  var enemyCount = 0;
  // check of er een vak (direction) de dam bestaat totdat die er niet meer zijn
  while (board[operators[dir[0]](r, x)] && board[operators[dir[0]](r, x)][operators[dir[1]](i, xx)]) {
    // als er een steen is die van de speler zelf is break de loop.
    if (board[operators[dir[0]](r, x)][operators[dir[1]](i, xx)] == turn.ally || board[operators[dir[0]](r, x)][operators[dir[1]](i, xx)] == turn.ally + "d") {
      break;
    }
    // als er een vijandige steen is sla deze op
    if (board[operators[dir[0]](r, x)][operators[dir[1]](i, xx)] == turn.enemy.ally || board[operators[dir[0]](r, x)][operators[dir[1]](i, xx)] == turn.enemy.ally + "d") {
      enemyCount++;
    }
    // als er 2 vijandige stenen zijn ontdekt break de loop
    if (enemyCount == 2) {
      break;
    }
    // als er een vak is die bruin en leeg is check een vak verder
    if (board[operators[dir[0]](r, x)][operators[dir[1]](i, xx)] == "b") {
      // als er al een vijandige steen is ontdekt in deze kant en het vak (direction) die steen leeg en bruin is return positie van steen
      if (enemyCount == 1) {
        console.log("kan slaan");
        return RItoPosition(r, i, dir[0] + dir[1]);
      }
    }
    x++;
    xx++;
  }
}

function checkSingleDamJump(r, i) {
  damArr = []
  // linksonder
  if (checkSingleDam(r, i, "+.+")) {
    damArr.push(checkSingleDam(r, i, "+.+"));
  }
  // rechtsonder
  if (checkSingleDam(r, i, "+.-")) {
    damArr.push(checkSingleDam(r, i, "+.-"));
  }
  // rechtsboven
  if (checkSingleDam(r, i, "-.-")) {
    damArr.push(checkSingleDam(r, i, "-.-"));
  }
  // linksboven
  if (checkSingleDam(r, i, "-.+")) {
    damArr.push(checkSingleDam(r, i, "-.+"));
  }
  if (damArr[0]) {
    return damArr;
  } else {
    return false;
  }
}

function checkSingleStone(r, i, direction) {
  var dir = direction.split(".");
  //check of de 2 columns onder bestaat
  if (board[operators[dir[0]](r, 1)] && board[operators[dir[0]](r, 2)]) {
    //check of player kan slaan
    if (board[operators[dir[0]](r, 1)][operators[dir[1]](i, 1)] == turn.enemy.ally || board[operators[dir[0]](r, 1)][operators[dir[1]](i, 1)] == turn.enemy.ally + "d") {
      if (board[operators[dir[0]](r, 2)][operators[dir[1]](i, 2)] == "b") {
        console.log("kan slaan")
        return RItoPosition(r, i, dir[0] + dir[1]);
      }
    }
  }
  return false;
}

function checkSingleJump(r, i) {
  stoneArr = []
  // linksonder
  if (checkSingleStone(r, i, "+.+")) {
    stoneArr.push(checkSingleStone(r, i, "+.+"));
  }
  // rechtsonder
  if (checkSingleStone(r, i, "+.-")) {
    stoneArr.push(checkSingleStone(r, i, "+.-"));
  }
  // rechtsboven
  if (checkSingleStone(r, i, "-.-")) {
    stoneArr.push(checkSingleStone(r, i, "-.-"));
  }
  // linksboven
  if (checkSingleStone(r, i, "-.+")) {
    stoneArr.push(checkSingleStone(r, i, "-.+"));
  }
  if (stoneArr[0]) {
    return stoneArr;
  } else {
    return false;
  }
}

function RItoPosition(r, i, direction) {
  var rs = r.toString();
  var is = i.toString();

  return rs + "." + is + "." + direction;
}

function jumpStone(toPos, fromPos, stats) {
  if (turn.enemy.ally == "Z") {
    black.stones--;
  }
  if (turn.enemy.ally == "W") {
    white.stones--;
  }
  lastPos = toPos;
  lastPos.stats = stats;
  changeBoard(toPos, fromPos, stats);
  if (stats.self == "stone") {
    var canJump = checkSingleJump(lastPos.column, lastPos.row);
  } else if (stats.self == "dam") {
    var canJump = checkSingleDamJump(lastPos.column, lastPos.row);
  }
  console.log(canJump);
  if (canJump[0]) {
    turn = turn.enemy.enemy;
  } else {
    turn = turn.enemy;
    lastPos = false;
  }
  createBoard();
}

function changeBoard(toPos, fromPos, stats) {
  if (turn.ally == "W" && toPos.column == 0 || turn.ally == "Z" && toPos.column == 9 || stats && stats.self == "dam") {
    board[fromPos.column].splice(fromPos.row, 1, "b");
    board[toPos.column].splice(toPos.row, 1, turn.ally + "d");
  } else {
    board[fromPos.column].splice(fromPos.row, 1, "b");
    board[toPos.column].splice(toPos.row, 1, turn.ally);
  }
  from.style.border = "none";
}
