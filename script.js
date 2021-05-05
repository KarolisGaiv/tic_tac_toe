// Global variables
let player1;
let player2;
let currentPlayer;

const gameBoardModule = (function () {
  const fields = document.querySelectorAll(".board-box");
  let counter = 0;

  const changePlayerTurn = () => {
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const populateBoard = (() => {
    fields.forEach((field) => {
      field.addEventListener("click", () => {
        // Check if both players exist before setting player marker
        if (player1 && player2 != null) {
          currentPlayer.setPlayerMarker(field);
          counter++;
          changePlayerTurn()
        } else {
          alert("You need two players to play this game :)");
        }
      });
    });
  })();

  return { counter };
})();

const Player = (name, side) => {
  const getName = () => name;
  let playerSide = side;

  function setPlayerMarker(square) {
    if (square.innerText) {
      alert("Field is already taken, choose another one!");
    }
    square.innerText = playerSide;
  }

  return { name, setPlayerMarker, playerSide };
};

//Functions

const submitForm = () => {
  const playerName = document.getElementById("player-name").value;
  const playerMarker = document.querySelector(".player-marker").value;
  const form = document.querySelector(".player-form");
  const submitBtn = document.querySelector(".submit-btn");

  // Check if player is created first time and remove marker option after it was taken
  if (player1 == null) {
    player1 = Player(playerName, playerMarker);
    document.getElementById(playerMarker).remove();
    getCurrentPlayer(player1);
  } else {
    player2 = Player(playerName, playerMarker);
    currentPlayer = player2;
  }

  // Disable player creation if two players already exist
  if (player1 && player2 != null) {
    submitBtn.disabled = true;
  }

  form.reset();
};

const getCurrentPlayer = (player) => {
  if (player.playerSide == "X") {
    currentPlayer = player;
  }
};

// 1. Get current player
// 2. Change current player after each turn
