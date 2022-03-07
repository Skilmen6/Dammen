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
var Wstones = 20;
var Zstones = 20;
var player = "W";
var witsrc = null;
var zwartsrc = null;
var wittedamsrc = "wittedam";
var zwartedamsrc = "zwartedam";

var from = false;
// var fromR = 1;
// var fromI = 1;
var jump = [
  [
    ["W"],
    [false]
  ],
  [
    ["Z"]
    [false]
  ]
];

var jumpArr = [
  [
    ["W"]
  ],
  [
    ["Z"]
  ]
];

var lastPos = [
  [
    ["W"]
  ],
  [
    ["Z"]
  ]
];

var lastPosJump = [
  [
    ["W"]
  ],
  [
    ["Z"]
  ]
];
var lastJump = [
  [
    ["W"],
    [true]
  ],
  [
    ["Z"],
    [true]
  ]
];
var dam;
var index;
var enemy;
var ally;
var src;
createBoard();

function createBoard() {
  var container = document.getElementById("game-container");

  for (r = 0; r < board.length; r++) {
    var row = createRow();
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
          var black = createBlack();
          black.setAttribute("id", r + "." + i);
          empty.appendChild(black);
          break;

        case "b":
          var empty = createEmptyZ();
          empty.setAttribute("id", r + "." + i);
          row.appendChild(empty);
          break;

        case "W":
          var empty = row.appendChild(createEmptyW());
          var white = createWhite();
          white.setAttribute("id", r + "." + i);
          empty.appendChild(white);
          break;
        case "Wd":
          var empty = row.appendChild(createEmptyW());
          var whitedam = createWhiteDam();
          whitedam.setAttribute("id", r + "." + i);
          empty.appendChild(whitedam);
          break;

        case "Zd":
          var empty = row.appendChild(createEmptyW());
          var blackdam = createBlackDam();
          blackdam.setAttribute("id", r + "." + i);
          empty.appendChild(blackdam);
          break;
      }
    }
  }
}

function createWhiteDam() {
  var whitedam = document.createElement("img");
  whitedam.setAttribute("src", "Img/Wittedam.png");
  wittedamsrc = whitedam.src;

  whitedam.addEventListener("click", function() {
    moveStart(this, wittedamsrc, "Z", "W", 0, true, zwartsrc, zwartedamsrc);
  });
  return whitedam;
}

function createBlackDam() {
  var blackdam = document.createElement("img");
  blackdam.setAttribute("src", "Img/Zwartedam.png");
  zwartedamsrc = blackdam.src;

  blackdam.addEventListener("click", function() {
    moveStart(this, zwartedamsrc, "W", "Z", 1, true, witsrc, wittedamsrc);
  });
  return blackdam;
}

function createBlack() {
  var black = document.createElement("img");
  black.setAttribute("src", "Img/Zwartesteen.png");
  zwartsrc = black.src;

  black.addEventListener("click", function() {
    moveStart(this, zwartsrc, "W", "Z", 1, false, witsrc, wittedamsrc);
  });
  return black;
}

function createWhite() {
  var white = document.createElement("img");
  white.setAttribute("src", "Img/Wittesteen.png");
  witsrc = white.src;

  white.addEventListener("click", function() {
    moveStart(this, witsrc, "Z", "W", 0, false, witsrc, wittedamsrc);
  });
  return white;
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

function createEmptyZ() {
  var empty = document.createElement("div");
  empty.setAttribute("class", "spelvak");
  var src = "brown";
  var enem;
  var ind;
  var play;
  var enemydamsrc;
  var enemysrc;
  if (player == "W") {
    play = "W";
    enem = "Z";
    ind = 0;
    enemysrc = zwartsrc;
    enemydamsrc = zwartedamsrc;
  } else if (player == "Z") {
    play = "Z";
    enem = "W";
    ind = 1;
    enemysrc = witsrc;
    enemydamsrc = wittedamsrc;
  }

  empty.addEventListener("click", function() {
    moveStart(this, src, enem, play, ind, false, enemysrc, enemydamsrc);
  });
  return empty;
}

function clearChildren(p) {
  while (p.firstChild) {
    p.removeChild(p.firstChild)
  }
}

function resetArray(arr) {
  arr = [
    [
      ["W"]
    ],
    [
      ["Z"]
    ]
  ];
  return arr
}

function moveStart(elem, selfsrc, enemy, ally, index, dam, enemysrc, enemydamsrc) {
  // console.log(elem);
  // console.log(selfsrc);
  // console.log(enemy);
  // console.log(ally);
  // console.log(index);
  // console.log(dam);
  // console.log(enemysrc);
  // console.log(enemydamsrc);
  if (Zstones == 0) {
    alert("Wit heeft gewonnen");
    return true;
  }
  if (Wstones == 0) {
    alert("Zwart heeft gewonnen");
    return true;
  }
  if (elem.src == selfsrc && player == ally) {
    if (from) {
      from.style.border = "none";
    }
    from = elem;
    from.style.border = "1px solid red";
    console.log(player);
  }
  if (from.src == selfsrc && player == ally || player == ally && selfsrc == "brown") {
    checkJump(enemy, ally, index, dam);
    console.log(lastPos[index]);
    if (lastPos[index][1]) {
      lastPosCheck(enemy, ally, index, dam);
      if (lastPosJump[index][1]) {
        for (i = 0; i < lastPosJump[index].length - 1; i++) {
          if (lastPosJump[index][i + 1]) {
            var jumpR = parseInt(lastPosJump[index][i + 1][0]);
            var jumpI = parseInt(lastPosJump[index][i + 1][1]);
            console.log(lastPosJump[index]);

            var posfrom = from.id.split(".");
            fromR = parseInt(posfrom[0]);
            fromI = parseInt(posfrom[1]);

            if (jumpR == fromR && jumpI == fromI) {
              jumpPiece(from, elem, ally, enemy, index, dam, enemysrc, enemydamsrc);
            } else if (jumpR !== fromR && jumpI !== fromI) {
              alert("U moet slaan");
              from = false;
              jumpArr = resetArray(jumpArr);
            }
          }
        }
      } else {
        player = enemy;
      }
      if (lastPosJump[index][1]) {
        lastJump[index][1] = false;
      } else {
        lastPos = resetArray(lastPos);
        lastJump[index][1] = true;
      }
    }
    for (i = 0; i < jumpArr.length + 1; i++) {
      if (jumpArr[index][i + 1] && lastJump[index][1]) {
        var jumpR = parseInt(jumpArr[index][i + 1][0]);
        var jumpI = parseInt(jumpArr[index][i + 1][1]);

        var posfrom = from.id.split(".");
        fromR = parseInt(posfrom[0]);
        fromI = parseInt(posfrom[1]);

        // console.log(i);
        // console.log(jumpArr[index]);
        // console.log(jumpR);
        // console.log(fromR);
        // console.log(jumpI);
        // console.log(fromI);
        if (jumpR == fromR && jumpI == fromI) {
          jumpPiece(from, elem, ally, enemy, index, dam, enemysrc, enemydamsrc);
        } else if (jumpR !== fromR && jumpI !== fromI) {
          alert("U moet slaan");
          from = false;
          jumpArr = resetArray(jumpArr);
        }
      }
    }
    lastPosJump = resetArray(lastPosJump);
  }
  // console.log(elem);
  // console.log(selfsrc);
  // console.log(enemy);
  // console.log(ally);
  // console.log(index);
  // console.log(dam);
  // console.log(enemysrc);
  // console.log(enemydamsrc);
  if (from.src == selfsrc && isLegalMove(from, elem, enemysrc, enemydamsrc, dam, ally) && player == ally || isLegalMove(from, elem, enemysrc, enemydamsrc, dam, ally) && player == ally && selfsrc == "brown") {
    if (jumpPiece(from, elem, ally, enemy, index, dam, enemysrc, enemydamsrc) && !lastPosJump[index] || jumpPiece(from, elem, ally, enemy, index, dam, enemysrc, enemydamsrc) && lastPosJump[index][1] !== true) {
      movePiece(from, elem, ally, enemy, index, dam);
    } else {
      alert("u moet slaan");
    }
  }

  function lastPosCheck(enemy, ally, index, dam) {
    if (!dam) {
      if (lastPos[index][1] && player == ally) {
        var posfrom = lastPos[index][1].id.split(".");

        var fromR = parseInt(posfrom[0]);
        var fromI = parseInt(posfrom[1]);
        if (board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI - 1] == enemy && board[fromR - 2][fromI - 2] == "b" || board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI - 1] == enemy + "d" && board[fromR - 2][fromI - 2] == "b") {
          var rsis = fromR + "." + fromI;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "--";
          lastPosJump[index].push(rsisarr);
          console.log(lastPosJump);

        }
        if (board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI + 1] == enemy && board[fromR - 2][fromI + 2] == "b" || board[fromR - 1] && board[fromR - 2] && board[fromR - 1][fromI + 1] == enemy + "d" && board[fromR - 2][fromI + 2] == "b") {
          var rsis = fromR + "." + fromI;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "-+";
          lastPosJump[index].push(rsisarr);
          console.log(lastPosJump);

        }
        if (board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI - 1] == enemy && board[fromR + 2][fromI - 2] == "b" || board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI - 1] == enemy + "d" && board[fromR + 2][fromI - 2] == "b") {
          var rsis = fromR + "." + fromI;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "+-";
          lastPosJump[index].push(rsisarr);
          console.log(lastPosJump);

        }
        if (board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI + 1] == enemy && board[fromR + 2][fromI + 2] == "b" || board[fromR + 1] && board[fromR + 2] && board[fromR + 1][fromI + 1] == enemy + "d" && board[fromR + 2][fromI + 2] == "b") {
          var rsis = fromR + "." + fromI;
          var rsisarr = rsis.split(".");
          rsisarr[2] = "++";
          lastPosJump[index].push(rsisarr);
          console.log(lastPosJump);

        }
      }
    } else if (dam) {

    }
  }

  function jumpPiece(from, elem, ally, enemy, index, dam, enemysrc, enemydamsrc) {
    var posfrom = from.id.split(".");
    var posto = elem.id.split(".");

    var fromR = parseInt(posfrom[0]);
    var fromI = parseInt(posfrom[1]);

    var toR = parseInt(posto[0]);
    var toI = parseInt(posto[1]);
    if (jumpArr[index]) {
      for (i = 0; i < jumpArr[index].length + 1; i++) {
        if (jumpArr[index][i + 1]) {
          switch (jumpArr[index][i + 1][2]) {
            case "--":
              if (toR == fromR - 2 && toI == fromI - 2) {
                board[fromR - 1].splice(fromI - 1, 1, "b");
                jump[index][1] = true;

                if (enemy == "W") {
                  Wstones = Wstones - 1;
                } else if (enemy == "Z") {
                  Zstones = Zstones - 1;
                }
                movePiece(from, elem, ally, enemy, index, dam);
              } else if (isLegalMove(from, elem, enemysrc, enemydamsrc, dam, ally)) {
                from = false;
                return false;
              }
              break;
            case "-+":
              if (toR == fromR - 2 && toI == fromI + 2) {
                board[fromR - 1].splice(fromI + 1, 1, "b");
                jump[index][1] = true;
                if (enemy == "W") {
                  Wstones = Wstones - 1;
                } else if (enemy == "Z") {
                  Zstones = Zstones - 1;
                }
                movePiece(from, elem, ally, enemy, index, dam);
              } else if (isLegalMove(from, elem, enemysrc, enemydamsrc, dam, ally)) {
                from = false;
                return false;
              }
              break;
            case "+-":
              if (toR == fromR + 2 && toI == fromI - 2) {
                board[fromR + 1].splice(fromI - 1, 1, "b");
                jump[index][1] = true;
                if (enemy == "W") {
                  Wstones = Wstones - 1;
                } else if (enemy == "Z") {
                  Zstones = Zstones - 1;
                }
                movePiece(from, elem, ally, enemy, index, dam);
              } else if (isLegalMove(from, elem, enemysrc, enemydamsrc, dam, ally)) {
                from = false;
                return false;
              }
              break;
            case "++":
              if (toR == fromR + 2 && toI == fromI + 2) {
                board[fromR + 1].splice(fromI + 1, 1, "b");
                jump[index][1] = true;
                if (enemy == "W") {
                  Wstones = Wstones - 1;
                } else if (enemy == "Z") {
                  Zstones = Zstones - 1;
                }
                movePiece(from, elem, ally, enemy, index, dam);
              } else if (isLegalMove(from, elem, enemysrc, enemydamsrc, dam, ally)) {
                from = false;
                return false;
              }
              break;
          }
        }
      }
    }
    jumpArr = resetArray(jumpArr);
    return true;
  }

  function movePiece(from, elem, ally, enemy, index, dam) {
    jumpArr = resetArray(jumpArr);
    var container = document.getElementById("game-container");
    var posfrom = from.id.split(".");
    var posto = elem.id.split(".");

    var fromR = parseInt(posfrom[0]);
    var fromI = parseInt(posfrom[1]);

    var toR = parseInt(posto[0]);
    var toI = parseInt(posto[1]);

    if (ally == "W" && toR == 0) {
      board[toR].splice(toI, 1, ally + "d");
      board[fromR].splice(fromI, 1, "b");
    } else if (ally == "Z" && toR == 9) {
      board[toR].splice(toI, 1, ally + "d");
      board[fromR].splice(fromI, 1, "b");
    } else {
      board[toR].splice(toI, 1, ally);
      board[fromR].splice(fromI, 1, "b");
    }
    checkJump(enemy, ally, index, dam);
    console.log(lastPosJump[index]);
    console.log(jumpArr[index]);
    console.log(jump[index]);
    if (jumpArr[index][1] && jump[index][1] == true) {
      player = ally;
      console.log(player);
      jumpArr = resetArray(jumpArr);
      lastPos[index][1] = elem;
    }
    lastPosJump = resetArray(lastPosJump);
    lastPosCheck(enemy, ally, index, dam);
    if (lastPosJump[index][1]) {
      player = ally;
      console.log(player);
      jumpArr = resetArray(jumpArr);
      lastPos[index][1] = elem;
    } else {
      lastPos = resetArray(lastPos);
      jumpArr = resetArray(jumpArr);
      lastPosJump = resetArray(lastPosJump);
      player = enemy;
      jump[index][1] = false;
    }
    console.log(player);
    from = false;
    clearChildren(container);
    createBoard();
  }

  function isLegalMove(from, elem, enemysrc, enemydamsrc, dam, ally) {
    var posfrom = from.id.split(".");
    var posto = elem.id.split(".");

    var fromR = parseInt(posfrom[0]);
    var fromI = parseInt(posfrom[1]);

    var toR = parseInt(posto[0]);
    var toI = parseInt(posto[1]);

    if (player == "W") {
      if (toR == fromR - 1 && toI == fromI - 1 && elem.src !== enemysrc || toI == fromI + 1 && toR == fromR - 1 && elem.src !== enemysrc && toR == fromR - 1 && toI == fromI - 1 && elem.src !== enemydamsrc || toI == fromI + 1 && toR == fromR - 1 && elem.src !== enemydamsrc) {
        return true;
      } else {
        return false;
      }
    } else if (player == "Z") {
      if (toR == fromR + 1 && toI == fromI - 1 && elem.src !== enemysrc || toI == fromI + 1 && toR == fromR + 1 && elem.src !== enemysrc && toR == fromR + 1 && toI == fromI - 1 && elem.src !== enemydamsrc || toI == fromI + 1 && toR == fromR + 1 && elem.src !== enemydamsrc) {
        return true;
      } else {
        return false;
      }
    }
  }

  function checkJump(enemy, ally, index, dam) {

    for (r = 0; r < board.length; r++) {

      for (i = 0; i < board[r].length; i++) {

        if (!dam) {

          if (board[r][i] == ally && player == ally) {

            if (board[r - 1] && board[r - 2] && board[r - 1][i - 1] == enemy && board[r - 2][i - 2] == "b" || board[r - 1] && board[r - 2] && board[r - 1][i - 1] == enemy + "d" && board[r - 2][i - 2] == "b") {
              var rs = r.toString();
              var is = i.toString();

              var rsis = rs + "." + is;
              var rsisarr = rsis.split(".");
              rsisarr[2] = "--";

              jumpArr[index].push(rsisarr);
              console.log(jumpArr[index]);
            }
            if (board[r - 1] && board[r - 2] && board[r - 1][i + 1] == enemy && board[r - 2][i + 2] == "b" || board[r - 1] && board[r - 2] && board[r - 1][i + 1] == enemy + "d" && board[r - 2][i + 2] == "b") {
              var rs = r.toString();
              var is = i.toString();

              var rsis = rs + "." + is;
              var rsisarr = rsis.split(".");
              rsisarr[2] = "-+";

              jumpArr[index].push(rsisarr);
              console.log(jumpArr[index]);
            }
            if (board[r + 1] && board[r + 2] && board[r + 1][i - 1] == enemy && board[r + 2][i - 2] == "b" || board[r + 1] && board[r + 2] && board[r + 1][i - 1] == enemy + "d" && board[r + 2][i - 2] == "b") {
              var rs = r.toString();
              var is = i.toString();

              var rsis = rs + "." + is;
              var rsisarr = rsis.split(".");
              rsisarr[2] = "+-";

              jumpArr[index].push(rsisarr);
              console.log(jumpArr[index]);
            }
            if (board[r + 1] && board[r + 2] && board[r + 1][i + 1] == enemy && board[r + 2][i + 2] == "b" || board[r + 1] && board[r + 2] && board[r + 1][i + 1] == enemy + "d" && board[r + 2][i + 2] == "b") {
              var rs = r.toString();
              var is = i.toString();

              var rsis = rs + "." + is;
              var rsisarr = rsis.split(".");
              rsisarr[2] = "++";

              jumpArr[index].push(rsisarr);
              console.log(jumpArr[index]);
            }
          }
          // } else if (dam) {

        }
      }
    }
  }
}
