// Global variables
let player1;
let player2;
let currentPlayer;
const darkSide = "X";

const gameBoardModule = (function () {
  let counter = 0;
  let isGameEnded = false;

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

  const fields = document.querySelectorAll(".board-box");
  const populateBoard = (() => {
    fields.forEach((field) => {
      field.addEventListener("click", () => {
        boxClicked(field);
      });
    });
  })();

  function boxClicked(field) {
    // Check if both players exist before setting player marker
    if (!player1 || !player2) {
      alert("You need two players to play this game :)");
      return;
    }
    // Check if square is not taken
    if (isPopulated(field)) {
      alert("Field is already taken, choose another one");
      return;
    }
    makeMove(field);
  }

  function isPopulated(element) {
    return element.innerHTML;
  }

  function makeMove(field) {
    currentPlayer.setPlayerMarker(field);
    counter++;
    const minMovesToWin = 4;
    if (counter > minMovesToWin) {
      checkResult(counter, currentPlayer);
    }
    if (!isGameEnded) {
      changePlayerTurn();
    }
  }

  const changePlayerTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const checkResult = (turnCount, currentPlayer) => {
    checkPlayerTurns(currentPlayer.playerArray);
    const maxTurnCount = 9;

    if (!isGameEnded && turnCount === maxTurnCount) {
      alert("It's a TIE!");
      return;
    }
  };

  const checkPlayerTurns = (playerArray) => {
    winningPositions.forEach((winningCombo) => {
      if (compareArrays(winningCombo, playerArray)) {
        showEndResult(winningCombo);
        isGameEnded = true;
      }
    });
  };

  const compareArrays = (arr1, arr2) =>
    arr1.every((element) => arr2.includes(element));

  function showEndResult(playerArr) {
    markWinningSquares(playerArr);
    showWinMessage();
  }

  const markWinningSquares = (winningArray) => {
    winningArray.forEach((element) => {
      const squareToHiglight = document.getElementById(element);
      if (currentPlayer.playerSide === darkSide) {
        squareToHiglight.classList.add("dark-side");
      } else {
        squareToHiglight.classList.add("light-side");
      }
    });
  };

  const showWinMessage = () => {
    //setTimout here helps Chrome to render CSS properly when confirm is triggered.
    // https://stackoverflow.com/questions/3787105/weird-problem-with-settimeout-on-google-chrome

    setTimeout(function () {
      if (confirm(getWinMessage())) {
        restartBoard();
      }
    }, 0);
  };

  const getWinMessage = () => {
    const side =
      currentPlayer.playerSide === darkSide ? "Dark side" : "Light side";

    return `Congratz - ${side} with ${currentPlayer.name} Won! Do you want to restart the game?`;
  };

  const restartBoard = () => {
    player1.playerArray.length = 0;
    player2.playerArray.length = 0;
    clearFields();
  };

  function clearFields() {
    fields.forEach((field) => {
      field.innerHTML = "";
      field.className = "board-box";
    });
    counter = 0;
    isGameEnded = false;
  }

  return { clearFields };
})();

const Player = (name, side) => {
  const playerSide = side;
  const playerArray = [];
  const darkSideIcon = "swg swg-darthvader-5 swg-4x";
  const lightSideIcon = "swg swg-yoda-3 swg-4x";
  const darkSideIconSmall = "swg swg-darthvader-5";
  const lightSideIconSmall = "swg swg-yoda-3";

  function setPlayerMarker(square) {
    const icon = document.createElement("span");
    if (playerSide === darkSide) {
      icon.className = darkSideIconSmall;
      icon.style.color = "red";
      square.appendChild(icon);
    } else {
      icon.className = lightSideIconSmall;
      icon.style.color = "whitesmoke";
      square.appendChild(icon);
    }
    saveTurn(square);
  }

  const saveTurn = (field) => {
    playerArray.push(parseInt(field.id));
  };

  const createPlayerCard = (name, side) => {
    const cardHolder = document.querySelector(".card-wrapper");
    // Create player card
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";
    side === darkSide
      ? playerCard.classList.add("dark-side")
      : playerCard.classList.add("light-side");
    // Place player card inside player card wrapper
    cardHolder.appendChild(playerCard);
    // Create card details wrapper
    const detailsWrapper = document.createElement("div");
    detailsWrapper.className = "card-details";
    playerCard.appendChild(detailsWrapper);
    // Create card detail - name
    const cardName = document.createElement("h3");
    cardName.className = "card-name";
    // Place player name inside card detail
    cardName.innerText = name;
    detailsWrapper.appendChild(cardName);
    // Create card detail - player marker
    const cardMarker = document.createElement("div");
    cardMarker.className = "card-marker";
    // Place player side inside card detail
    if (side === darkSide) {
      cardMarker.innerText = "Dark Side";
    } else {
      cardMarker.innerText = "Light Side";
    }
    detailsWrapper.appendChild(cardMarker);
    // Create card icon
    const cardIcon = document.createElement("span");
    cardIcon.id = "player-icon";
    if (side === darkSide) {
      cardIcon.className = darkSideIcon;
      playerCard.appendChild(cardIcon);
    } else {
      cardIcon.className = lightSideIcon;
      playerCard.appendChild(cardIcon);
    }
  };

  return { name, setPlayerMarker, playerSide, playerArray, createPlayerCard };
};

//Functions

const submitForm = () => {
  const playerName = document.getElementById("player-name").value;

  if (!playerName) {
    alert("Please enter player name");
    return;
  }

  const playerMarker = document.querySelector(".player-marker").value;
  const form = document.querySelector(".player-form");

  // Check if player is created first time and remove marker option after it was taken
  if (!player1) {
    player1 = Player(playerName, playerMarker);
    playerName.innerHTML = "";
    setStartingPlayer(player1);
    player1.createPlayerCard(player1.name, player1.playerSide);
  } else {
    player2 = Player(playerName, playerMarker);
    setStartingPlayer(player2);
    player2.createPlayerCard(player2.name, player2.playerSide);
  }
  document.getElementById(playerMarker).disabled = true;
  toogleForm();
  form.reset();
};

const setStartingPlayer = (player) => {
  if (player.playerSide === darkSide) {
    currentPlayer = player1;
  }
};

function toogleForm() {
  const playerForm = document.querySelector(".player-wrapper");
  const sideOption = document.querySelector(".side-option");
  if (player1 && player2) {
    playerForm.style.display = "none";
  } else {
    playerForm.style.display = "block";
  }
}

function resetFormOptions() {
  const sideOptions = document.querySelectorAll(".side-option");

  sideOptions.forEach((option) => {
    option.disabled = false;
  });
  document.querySelector(".player-form").reset();
}

function deleteCards() {
  const playerCards = document.querySelectorAll(".player-card");
  playerCards.forEach((card) => {
    card.remove();
  });
}

function reset() {
  player1 = null;
  player2 = null;
  currentPlayer = null;

  toogleForm();
  resetFormOptions();
  gameBoardModule.clearFields();
  deleteCards();
}
