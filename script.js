const gameBoardModule = (function () {
  // const name = "test"
  // function _privateMethod() {
  //     console.log(name);
  // }
  // function publicMethod() {
  //     _privateMethod()
  // }

  let board = [];
  const fields = document.querySelectorAll(".board-box");

  const populateBoard = () => {
    fields.forEach((field) => {
      field.addEventListener("click", (e) => {
        console.log(e.target);
        playerX.setPlayerMarker(field);
      });
    });
  };

  return {
    board,
    populateBoard,
  };
})();

const Player = (name, side) => {
  const getName = () => name;
  let playerSide = side;

  function setPlayerMarker(square) {
    if(square.innerHTML) {
      alert("Field is already taken, choose another one!")
    }
    square.innerHTML = playerSide;
  }

  return { name, setPlayerMarker };
};

const playerX = Player("test", "X");
gameBoardModule.populateBoard();

