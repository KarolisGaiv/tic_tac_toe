// Global variables
let player1;
let player2;
let currentPlayer;

const gameBoardModule = (function () {
  const fields = document.querySelectorAll(".board-box");
  let counter = 0;

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
        showWinMessage(winningCombo);
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

  const markWinningSquares = (winningArray) => {
    winningArray.forEach((element) => {
      let squareToHiglight = document.getElementById(element);
      if (currentPlayer.playerSide == "X") {
        squareToHiglight.classList.add("dark-side");
      } else {
        squareToHiglight.classList.add("light-side");
      }
    });
  };

  const showWinMessage = (winningArray) => {
    markWinningSquares(winningArray);
    currentPlayer.playerSide == "X"
      ? alert(
          `Congratz - Dark Side with ${currentPlayer.name} Won! Do you want to restart game?`
        )
      : alert(
          `Congratz - Light Side with ${currentPlayer.name} Won! Do you want to restart game?`
        );
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
  let playerSide = side;
  let playerArray = [];
  const darkSideIcon = "swg swg-darthvader-5 swg-4x";
  const lightSideIcon = "swg swg-yoda-3 swg-4x";
  const darkSideIconSmall = "swg swg-darthvader-5";
  const lightSideIconSmall = "swg swg-yoda-3";

  function setPlayerMarker(square) {
    const icon = document.createElement("span");
    if (playerSide == "X") {
      icon.className = darkSideIconSmall;
      icon.style.color = "red";
      square.appendChild(icon);
    } else {
      icon.className = lightSideIconSmall;
      icon.style.color = "whitesmoke";
      square.appendChild(icon);
    }
    // square.innerText = playerSide;
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
    side == "X"
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
    if (side == "X") {
      cardMarker.innerText = "Dark Side";
      detailsWrapper.appendChild(cardMarker);
    } else {
      cardMarker.innerText = "Light Side";
      detailsWrapper.appendChild(cardMarker);
    }
    // Create card icon
    const cardIcon = document.createElement("span");
    cardIcon.id = "player-icon";
    if (side == "X") {
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
  const playerMarker = document.querySelector(".player-marker").value;
  const form = document.querySelector(".player-form");
  const submitBtn = document.querySelector(".submit-btn");

  if (!playerName) {
    alert("Please enter player name");
    return;
  }

  // Check if player is created first time and remove marker option after it was taken
  if (player1 == null) {
    player1 = Player(playerName, playerMarker);
    document.getElementById(playerMarker).remove();
    getCurrentPlayer(player1);
    player1.createPlayerCard(player1.name, player1.playerSide);
  } else {
    player2 = Player(playerName, playerMarker);
    getCurrentPlayer(player2);
    player2.createPlayerCard(player2.name, player2.playerSide);
  }

  // Remove player creation form after both players are created
  if (player1 && player2 != null) {
    document.querySelector(".player-wrapper").remove();
  }

  form.reset();
};

const getCurrentPlayer = (player) => {
  if (player.playerSide == "X") {
    currentPlayer = player;
  }
};
