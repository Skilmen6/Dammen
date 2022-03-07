var ai = null;
var aiTwo = null;
var aiColor = null;
var aiColorTwo = null;

function startGame(player, color) {
  if (player == "ai") {
    if (color) {
      if (color == "X") {
        ai = "Z";
        aiColor = "Z";
        aiTwo = "W";
        aiColorTwo = "W";
      } else {
        ai = color;
        aiColor = color;
      }
      clearChildren(document.getElementById("Container"));
      createBoard();
    } else {
      var cont = document.getElementById("startContainer");
      clearChildren(cont);

      var p = document.createElement("p");
      var z = document.createElement("button");
      var w = document.createElement("button");
      var x = document.createElement("button");

      z.innerHTML = "Zwart";
      w.innerHTML = "Wit";
      x.innerHTML = "AI tegen AI";
      p.innerHTML = "Kies de kleur die je wilt zijn";

      z.setAttribute("class", "myButton");
      z.setAttribute("onclick", "startGame('ai', 'W')");
      w.setAttribute("class", "myButton");
      w.setAttribute("onclick", "startGame('ai', 'Z')");
      x.setAttribute("class", "myButton");
      x.setAttribute("onclick", "startGame('ai', 'X')");

      cont.appendChild(p);
      cont.appendChild(z);
      cont.appendChild(w);
      cont.appendChild(x);
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

var boardTwo;

function player(damSrc, src, direction, ally) {
  this.stones = 20;
  this.stone = {
    src: src,
    direction: direction,
    self: "stone",
    ally: ally
  }
  this.dam = {
    src: damSrc,
    self: "dam",
    ally: ally
  }
  this.ally = ally;
}
var black = new player(
  "Img/Zwartedam.png",
  "Img/Zwartesteen.png",
  "+",
  "Z"
);
var white = new player(
  "Img/Wittedam.png",
  "Img/Wittesteen.png",
  "-",
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
  boardTwo = board;
  from = false;

  var container = document.getElementById("game-container");
  clearChildren(container);

  for (var c = 0; c < board.length; c++) {
    var row = createRow()
    container.appendChild(row);

    for (var r = 0; r < board[c].length; r++) {
      switch (board[c][r]) {
        case "c":
          var empty = createEmptyW();
          empty.setAttribute("id", c + "." + r);
          row.appendChild(empty);
          break;

        case "Z":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(black, c, r, black.stone);
          empty.appendChild(stone);
          break;

        case "b":
          var empty = createEmptyZ();
          empty.setAttribute("id", c + "." + r);
          row.appendChild(empty);
          break;

        case "W":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(white, c, r, white.stone);
          empty.appendChild(stone);
          break;

        case "Wd":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(white, c, r, white.dam);
          empty.appendChild(stone);
          break;

        case "Zd":
          var empty = row.appendChild(createEmptyW());
          var stone = createStone(black, c, r, black.dam);
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
  if (ai == turn.ally || lastPos && lastPos.stats.ally == aiColor) {
    beepBoop();
  }
  if (aiTwo == turn.ally || lastPos && lastPos.stats.ally == aiColorTwo) {
    boopBeep();
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

function createStone(color, c, r, stats) {
  var stone = document.createElement("img");
  stone.setAttribute("src", stats.src);
  stone.setAttribute("id", c + "." + r);
  stone.stats = stats;

  stone.addEventListener("click", function() {
    moveCheck(this, color, stats);
  });
  return stone
}

function createEmptyZ() {
  var empty = createEmptyW();
  empty.addEventListener("click", function() {
    moveCheck(this, "empty");
  });
  return empty;
}

// helpfunctions start --------------------------------------------------------------------------
function clearChildren(p) {
  while (p.firstChild) {
    p.removeChild(p.firstChild)
  }
}

function moveCheck(elem, player) {
  // check of het jouw beurt is
  if (ai == turn.ally || aiTwo == turn.ally) {
    return false;
  } else {
    moveStart(elem, player);
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

function CRtoPosition(c, r) {
  var cs = c.toString();
  var rs = r.toString();

  return cs + "." + rs;
}
// helpfuncions end ------------------------------------------------------------------------

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
    //console.log(lastPos);
    // check of je kan slaan met de steen waarmee je voor het laatst hebt geslagen
    var canJump = checkSingleJump(lastPos.column, lastPos.row, lastPos.stats.self);
    if (canJump[0]) {
      for (var i = 0; i < canJump.length; i++) {
        if (checkSelectedJump(from, elem, canJump[i], player)) {
          return true;
        }
      }
    }
    alert("je kan slaan");
    return false;
  }
  //check of je kan slaan
  if (checkJump()) {
    //console.log(turn.jumpArr);
    for (var i = 0; i < turn.jumpArr.length; i++) {
      if (checkSelectedJump(from, elem, turn.jumpArr[i], player)) {
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

function movePiece(elem, from) {
  var fromPos = getPosition(from.id);
  var toPos = getPosition(elem.id);
  var fromSplit = from.id.split(".");
  var fromCInt = parseInt(fromSplit[0]);
  var fromRInt = parseInt(fromSplit[1]);
  var moveArr = checkMove(fromCInt, fromRInt, from.stats.self);
  //console.log(moveArr);
  if (moveArr[0]) {
    for (var i = 0; i < moveArr.length; i++) {
      var fromMovePos = getPosition(moveArr[i][0]);
      for (var x = 2; x < moveArr[i].length; x++) {
        var toMovePos = getPosition(moveArr[i][x]);
        if (fromPos.column == fromMovePos.column && fromPos.row == fromMovePos.row) {
          if (toPos.column == toMovePos.column && toPos.row == toMovePos.row) {
            //console.log(from.stats.self);
            changeBoard(toPos, fromPos, from.stats.self);
            turn = turn.enemy;
            createBoard();
            return true;
          }
        }
      }
    }
  } else {
    return false;
  }
}

function checkMove(c, r, self) {
  var moveArr = []
  // linksonder
  if (checkSingleMove(c, r, "+.+", self)) {
    moveArr.push(checkSingleMove(c, r, "+.+", self));
  }
  // rechtsonder
  if (checkSingleMove(c, r, "+.-", self)) {
    moveArr.push(checkSingleMove(c, r, "+.-", self));
  }
  // rechtsboven
  if (checkSingleMove(c, r, "-.-", self)) {
    moveArr.push(checkSingleMove(c, r, "-.-", self));
  }
  // linksboven
  if (checkSingleMove(c, r, "-.+", self)) {
    moveArr.push(checkSingleMove(c, r, "-.+", self));
  }
  if (moveArr[0]) {
    return moveArr;
  } else {
    return false;
  }
}

function checkSingleMove(c, r, direction, self) {
  var dir = direction.split(".");
  var arr = [];
  if (self == "stone") {
    if (dir[0] == turn.stone.direction) {
      //console.log(turn.stone.direction);
      if (board[operators[dir[0]](c, 1)]) {
        if (board[operators[dir[0]](c, 1)][operators[dir[1]](r, 1)] == "b") {
          arr.push(CRtoPosition(c, r));
          arr.push(false);
          arr.push(CRtoPosition(operators[dir[0]](c, 1), operators[dir[1]](r, 1)));
          return arr;
        }
      }
    }
  } else if (self == "dam") {
    var x = 1;
    var xx = 1;
    var movePosArr = [];
    while (board[operators[dir[0]](c, x)] && board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)]) {
      if (board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)] == "b") {
        movePosArr.push(CRtoPosition(operators[dir[0]](c, x), operators[dir[1]](r, xx)));
      } else {
        break;
      }
      x++;
      xx++;
    }
    if (movePosArr[0]) {
      arr.push(CRtoPosition(c, r));
      arr.push(false);
      for (var i = 0; i < movePosArr.length; i++) {
        arr.push(movePosArr[i]);
      }
      return arr;
    }
  }
  return false;
}

function checkSelectedJump(from, elem, jumpPos, player) {
  var fromPos = getPosition(from.id);
  var toPos = getPosition(elem.id);
  var fromJumpPos = getPosition(jumpPos[0]);
  var enemyJumpPos = getPosition(jumpPos[1]);
  //console.log(jumpPos);
  //console.log(fromJumpPos);
  //console.log(enemyJumpPos);
  // check of je een steen hebt geselecteerd waarmee je kan slaan
  if (fromPos.column == fromJumpPos.column && fromPos.row == fromJumpPos.row) {
    // check of je ook echt gaat slaan en niet gaat bewegen met de steen
    // check of je op een leeg vak klikt
    if (player == "empty") {
      for (var i = 2; i < jumpPos.length; i++) {
        //console.log(i);
        var toJumpPos = getPosition(jumpPos[i]);
        if (toPos.column == toJumpPos.column && toPos.row == toJumpPos.row) {
          board[enemyJumpPos.column].splice(enemyJumpPos.row, 1, "b");
          jumpStone(toPos, fromPos, from.stats)
          return true;
        }
      }

      return false;
    }
    return true;
  }
}

function checkMultiJump(jumpArr, ally) {
  // var multiJumpArray = [];
  // var multiArr = [];
  // for (var i = 0; i < jumpArr.length; i++) {
  //   for (var x = 2; x < jumpArr[i].length; x++) {
  //     console.log(document.getElementById(jumpArr[i][0]));
  //     if (!ally){
  //     ally = document.getElementById(jumpArr[i][0]).stats.ally;
  //     }
  //     var multiEnemy = jumpArr[i][1].split(".");
  //     console.log(boardTwo[multiEnemy[0]][multiEnemy[1]]);
  //     boardTwo[multiEnemy[0]].splice(multiEnemy[1], 1, "b");
  //     var multiJump = jumpArr[i][x].split(".");
  //     if (ally == turn.ally) {
  //       multiJumpArr = checkSingleJump(parseInt(multiJump[0]), parseInt(multiJump[1]), "stone");
  //     } else if (ally == turn.ally + "d") {
  //       multiJumpArr = checkSingleJump(parseInt(multiJump[0]), parseInt(multiJump[1]), "dam");
  //     }
  //     if (multiJumpArr[0]) {
  //       for (var xx = 0; xx < multiJumpArr.length; xx++) {
  //         multiArr.push(i);
  //         multiJumpArray.push(multiJumpArr[xx]);
  //       }
  //     }
  //   }
  // }
  // console.log(multiJumpArray);
  // if (multiJumpArray[0]) {
  //   var check = checkMultiJump(multiJumpArray, ally);
  //   if (check){
  //     multiJumpArray = check;
  //   }
  //   var arr = [multiJumpArray, multiArr];
  //   console.log(arr);
  //   if (check){
  //     return arr;
  //   }
  //   return multiJumpArray;
  // } else {
  //   return false;
  // }
}

function checkJump() {
  turn.jumpArr = [];
  boardTwo = board;
  if (!lastPos) {
    for (var c = 0; c < board.length; c++) {

      for (var r = 0; r < board[c].length; r++) {

        if (board[c][r] == turn.ally || board[c][r] == turn.ally + "d") {
          var stoneJumpArr;
          if (board[c][r] == turn.ally) {
            stoneJumpArr = checkSingleJump(c, r, "stone");
          } else if (board[c][r] == turn.ally + "d") {
            stoneJumpArr = checkSingleJump(c, r, "dam");
          }
          if (stoneJumpArr[0]) {
            for (var x = 0; x < stoneJumpArr.length; x++) {
              turn.jumpArr.push(stoneJumpArr[x]);
            }
          }
        }
      }
    }

    // var multiJump = checkMultiJump(turn.jumpArr);
    //
    // console.log(multiJump);
    // console.log(turn.jumpArr);
  }
  if (turn.jumpArr[0]) {
    //console.log(turn.jumpArr);
    return true;
  } else {
    return false;
  }
}

function checkSingleStone(c, r, direction, self) {
  var dir = direction.split(".");
  var arr = [];
  if (self == "stone") {
    //check of de 2 columns onder bestaat
    if (board[operators[dir[0]](c, 1)] && board[operators[dir[0]](c, 2)]) {
      //check of player kan slaan
      if (board[operators[dir[0]](c, 1)][operators[dir[1]](r, 1)] == turn.enemy.ally || board[operators[dir[0]](c, 1)][operators[dir[1]](r, 1)] == turn.enemy.ally + "d") {

        if (board[operators[dir[0]](c, 2)][operators[dir[1]](r, 2)] == "b") {
          //console.log("kan slaan")
          arr.push(CRtoPosition(c, r));
          arr.push(CRtoPosition(operators[dir[0]](c, 1), operators[dir[1]](r, 1)));
          arr.push(CRtoPosition(operators[dir[0]](c, 2), operators[dir[1]](r, 2)));
          return arr;
        }
      }
    }
  } else if (self == "dam") {
    var x = 1;
    var xx = 1;
    var enemyCount = 0;
    var jumpPosDam = [];
    var enemyArr = [];
    while (board[operators[dir[0]](c, x)] && board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)]) {
      // als er een vijandige steen is sla deze op
      if (board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)] == turn.enemy.ally || board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)] == turn.enemy.ally + "d") {
        enemyArr.push(CRtoPosition(operators[dir[0]](c, x), operators[dir[1]](r, xx)));
        enemyCount++;
      }
      // als er een lege plek is gevonden achter een vijandige steen sla deze op, hier mag je op kliken
      if (enemyCount == 1 && board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)] == "b") {
        jumpPosDam.push(CRtoPosition(operators[dir[0]](c, x), operators[dir[1]](r, xx)));
      }
      // als er 2 vijandige stenen zijn of wanneer er een steen van jouwzelf is break de loop
      if (enemyCount == 2 || board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)] == turn.ally || board[operators[dir[0]](c, x)][operators[dir[1]](r, xx)] == turn.ally + "d") {
        break;
      }
      x++;
      xx++;
    }
    if (jumpPosDam[0]) {
      arr.push(CRtoPosition(c, r));
      arr.push(enemyArr[0]);
      for (var i = 0; i < jumpPosDam.length; i++) {
        arr.push(jumpPosDam[i]);
      }
      //console.log(arr);
      return arr;
    }
  }
  return false;
}

function checkSingleJump(c, r, self) {
  var stoneArr = []
  // linksonder
  if (checkSingleStone(c, r, "+.+", self)) {
    stoneArr.push(checkSingleStone(c, r, "+.+", self));
  }
  // rechtsonder
  if (checkSingleStone(c, r, "+.-", self)) {
    stoneArr.push(checkSingleStone(c, r, "+.-", self));
  }
  // rechtsboven
  if (checkSingleStone(c, r, "-.-", self)) {
    stoneArr.push(checkSingleStone(c, r, "-.-", self));
  }
  // linksboven
  if (checkSingleStone(c, r, "-.+", self)) {
    stoneArr.push(checkSingleStone(c, r, "-.+", self));
  }
  if (stoneArr[0]) {
    return stoneArr;
  } else {
    return false;
  }
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
  var canJump = checkSingleJump(lastPos.column, lastPos.row, stats.self);
  //console.log(canJump);
  if (canJump[0]) {
    turn = turn.enemy.enemy;
  } else {
    turn = turn.enemy;
    lastPos = false;
  }
  createBoard();
}

function changeBoard(toPos, fromPos, stats) {
	var canJump = false;
  if (lastPos) {
    canJump = checkSingleJump(lastPos.column, lastPos.row, lastPos.stats.self);
  }
  if (turn.ally == "W" && toPos.column == 0 && !canJump[0] || turn.ally == "Z" && toPos.column == 9 && !canJump[0] || stats == "dam" || stats.self == "dam") {
    board[fromPos.column].splice(fromPos.row, 1, "b");
    board[toPos.column].splice(toPos.row, 1, turn.ally + "d");
  } else {
    board[fromPos.column].splice(fromPos.row, 1, "b");
    board[toPos.column].splice(toPos.row, 1, turn.ally);
  }
  from.style.border = "none";
}
