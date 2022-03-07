
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


var board = [
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["Zd", "c", "Zd", "c", "Zd", "c", "Zd", "c", "Zd", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "Wd", "c", "Wd", "c", "Wd", "c", "Wd", "c", "Wd"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"]
]

var board = [
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "Z", "c", "b", "c", "Zd", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "Wd", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "W", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"]
]

var board = [
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "Z", "c", "Z", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "W", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "Z", "c", "Z", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"]
]

var board = [
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "Z", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "W", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "b", "c", "b", "c", "b", "c", "b"],
  ["b", "c", "Z", "c", "b", "c", "b", "c", "b", "c"],
  ["c", "b", "c", "W", "c", "W", "c", "b", "c", "b"],
  ["b", "c", "b", "c", "b", "c", "b", "c", "b", "c"]
]

//check of player naar linksonder kan slaan
++
//check of player naar rechtsonder kan slaan
+-
//check of player naar rechtsboven kan slaan
--
//check of player naar linksboven kan slaan
-+

// column is verticaal
// row is horizontaal
  // jumparr
  [
    // array met alle mogelijke jumps voor elke steen
    [
      //array met start positie, positie van vijand die geslagen kan worden en alle mogelijke eindposities in die volgorde
      [

      ]
    ]
  ]

// checkMultiJump functie
moet checken:
ALS er meerdere stenen kunnen slaan.
WELKE het meest kan slaan en deze return.

om te checken WELKE het meest kan slaan moet:
ALLE stenen hebben welke kunnen slaan.
VOOR elke steen EEN nieuw board aanmaken en deze een kopie maken van het normale board.
ELKE steen zijn slag laten doen op zijn board.
ALS er meerdere stenen zijn die weer kunnen slaan deze opslaan en opnieuw functie uitvoeren.
ALS de stenen niet meer kunnen slaan sla positie op van stenen die het meest kunnen slaan en return deze.

// dingen die ik moet doen voor AI
moet een value geven aan elke mogelijke positie van het bord.
moet een value geven aan de hand van of AI kan slaan of kan blokeren.

// ideeën voor AI
AI kan aan de hand van de zetten van tegestander de 'skill level' van tegenstander herkenen
 en aan de hand daarvan zijn eigen zetten veranderen. word ook wel 'adaptability' genoemnt
