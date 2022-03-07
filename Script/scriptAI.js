function beepBoop() {
  if (ai == turn.ally || lastPos && lastPos.stats.ally == aiColor) {
    console.log(ai);

    var moves = findLegalMoves();
    console.log(moves);
    var bestMove = findBestMove(moves);
    doMove(bestMove, moves, aiColor);
  } else {
    return false;
  }
}

  function boopBeep() {
    if (aiTwo == turn.ally || lastPos && lastPos.stats.ally == aiColorTwo) {
      console.log(ai);

      var moves = findLegalMoves();
      console.log(moves);
      var bestMove = findBestMove(moves);
      doMoveTwo(bestMove, moves, aiColorTwo);
    } else {
      return false;
    }
  }

  // FUNCTION_FIND_ALL_LEGAL_MOVES( MY_BOARD ) Returns: array ALL_LEGAL_MOVES
  // FUNCTION_FIND_BEST_MOVE( MY_BOARD, ALL_LEGAL_MOVES ) Returns: array MY_MOVE
  // FUNCTION_DO_MOVE( MY_BOARD, MY_MOVE ) Throws: error ILLEGAL_MOVE Updates: MY_BOARD
  // repeat from start for each turn
function findLegalMoves() {
  var possibleJump = false;
  var arr = [];
  if (lastPos) {
    var canJump = checkSingleJump(lastPos.column, lastPos.row, lastPos.stats.self);
    if (canJump[0]){
      for (var i = 0; i < canJump.length; i++) {
        arr.push(canJump[i]);
      }
    }
  } else {
    for (var c = 0; c < board.length; c++) {
      for (var r = 0; r < board[c].length; r++) {
        var stoneJumpArr = [];
        switch (board[c][r]) {
          case turn.ally:
            stoneJumpArr = checkSingleJump(c, r, "stone");
            if (stoneJumpArr[0]){
              possibleJump = true;
            }
            break;

          case turn.ally + "d":
            stoneJumpArr = checkSingleJump(c, r, "dam");
            if (stoneJumpArr[0]){
              possibleJump = true;
            }
            break;
        }
        if (stoneJumpArr[0]){
          for (var i = 0; i < stoneJumpArr.length; i++) {
            arr.push(stoneJumpArr[i]);
          }
        }
      }
    }
    for (var c = 0; c < board.length; c++) {
      for (var r = 0; r < board[c].length; r++) {
        var stoneMoveArr = [];
        switch (board[c][r]) {
          case turn.ally:
            if (!possibleJump){
              stoneMoveArr = checkMove(c, r, "stone");
            }
            break;

          case turn.ally + "d":
            if (!possibleJump){
              stoneMoveArr = checkMove(c, r, "dam");
            }
            break;
        }
        if (!possibleJump && stoneMoveArr[0]){
          for (var i = 0; i < stoneMoveArr.length; i++) {
            arr.push(stoneMoveArr[i]);
          }
        }
      }
    }
  }
  console.log(arr);
  return arr;
}

function findBestMove(moves){
  var arr = [];
  arr.push(Math.floor(Math.random() * (moves.length - 1)));
  console.log(moves[arr[0]].length - 1);
  arr.push(Math.floor(Math.random() * (moves[arr[0]].length - 2)) + 2);
  console.log(Math.floor(Math.random() * (moves[arr[0]].length - 1)) + 2);
  console.log(arr);
  return arr;
}

function doMove(bestMove, moves, color){
  var from = moves[bestMove[0]][0];
  console.log(from);
  var to = moves[bestMove[0]][bestMove[1]];
  console.log(to);
  setTimeout(function() {
    ai = "turn";
    eventFire(document.getElementById(from), "click");
    console.log(document.getElementById(from));
    ai = color;
}, 100);

  setTimeout(function() {
    ai = "turn";
    eventFire(document.getElementById(to), "click");
    console.log(document.getElementById(to));
    ai = color;
}, 200);

}

function doMoveTwo(bestMove, moves, color){
  var from = moves[bestMove[0]][0];
  console.log(from);
  var to = moves[bestMove[0]][bestMove[1]];
  console.log(to);
  setTimeout(function() {
    aiTwo = "turn";
    eventFire(document.getElementById(from), "click");
    console.log(document.getElementById(from));
    aiTwo = color;
}, 100);

  setTimeout(function() {
    aiTwo = "turn";
    eventFire(document.getElementById(to), "click");
    console.log(document.getElementById(to));
    aiTwo = color;
}, 200);

}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    var evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
