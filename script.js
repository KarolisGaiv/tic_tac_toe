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

  const checkResult = (turnCount) => {
    if (turnCount > 8) {
      alert("It's a TIE!");
      return;
    }
  };

  const populateBoard = (() => {
    fields.forEach((field) => {
      field.addEventListener("click", () => {
        // Check if both players exist before setting player marker
        if (player1 && player2 != null) {
          // Check if square is not taken
          if (field.innerText) {
            alert("Field is already taken, choose another one");
            return;
          }
          currentPlayer.setPlayerMarker(field);
          counter++;
          checkResult(counter)
          changePlayerTurn();
        } else {
          alert("You need two players to play this game :)");
        }
      });
    });
  })();

  return {};
})();

const Player = (name, side) => {
  const cardName = document.querySelector(".card-name");
  const cardMarker = document.querySelector(".card-marker");
  const getName = () => name;
  let playerSide = side;

  function setPlayerMarker(square) {
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
    getCurrentPlayer(player2);
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
