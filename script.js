// Global variables
let player1;
let player2;
let currentPlayer;

const gameBoardModule = (function () {
  const fields = document.querySelectorAll(".board-box");
  let counter = 0;
  let gameWin = false;

  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const changePlayerTurn = () => {
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const checkResult = (turnCount, currentPlayer) => {
    if (turnCount > 8) {
      alert("It's a TIE!");
      return;
    }

    checkPlayerTurns(currentPlayer.playerArray);
  };

  const checkPlayerTurns = (playerArray) => {
    winningPositions.forEach((winningCombo) => {
      if (compareArrays(playerArray, winningCombo)) {
        gameWin = true;
        console.log(`Congratz ${currentPlayer.name} for winning`);
      }
    });
  };

  const compareArrays = (arr1, arr2) => {
    let signal = true;
    arr2.forEach((el) => {
      if (!arr1.includes(el)) {
        signal = false;
      }
    });
    return signal;
  };

  const populateBoard = (() => {
    fields.forEach((field) => {
      // const squareNumber = parseInt(field.id)
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
          // Start checking for winner only when one player has already made at least 2 moves
          if (counter > 4) {
            checkResult(counter, currentPlayer);
          }
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
  let playerSide = side;
  let playerArray = [];

  function setPlayerMarker(square) {
    square.innerText = playerSide;
    saveTurn(square);
  }

  const saveTurn = (field) => {
    playerArray.push(parseInt(field.id));
  };

  return { name, setPlayerMarker, playerSide, playerArray };
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
