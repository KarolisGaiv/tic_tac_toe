// Global variables
let player1;
let player2;

const gameBoardModule = (function () {
  const fields = document.querySelectorAll(".board-box");

  const populateBoard = (() => {
    fields.forEach((field) => {
      field.addEventListener("click", () => {
        player1.setPlayerMarker(field);
      });
    });
  })();

  return {};
})();

// const gameController = (function () {
// })();

const Player = (name, side) => {
  const getName = () => name;
  let playerSide = side;

  function setPlayerMarker(square) {
    if (square.innerText) {
      alert("Field is already taken, choose another one!");
    }
    square.innerText = playerSide;
  }

  return { name, setPlayerMarker };
};

//Functions

const submitForm = () => {
  const playerName = document.getElementById("player-name").value;
  const playerMarker = document.getElementById("player-marker").value;
  const form = document.querySelector(".player-form");
  const submitBtn = document.querySelector(".submit-btn")
  console.log(playerName);
  console.log(playerMarker);

  // Check if player is created first time
  if(player1 == null) {
    player1 = Player(playerName, playerMarker)
  } else {
    player2 = Player(playerName, playerMarker)
  }

  // Disable player creaton if two players already exist
  if(player1 && player2 != null) {
    submitBtn.disabled = true
  }

  form.reset();
};


