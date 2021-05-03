const gameBoardModule = (function () {
  // const name = "test"
  // function _privateMethod() {
  //     console.log(name);
  // }
  // function publicMethod() {
  //     _privateMethod()
  // }

  let board = [];

  return {
    board: board,
  };
})();

// const Player = (name, choice) => {
//     const getName = () => name
//     const getChoice = () => choice

// return {getName, getChoice}
// }

const fields = document.querySelectorAll(".board-box");

const populateBoard = () => {
  let currentMark = "X";
  fields.forEach((field) => {
    field.addEventListener("click", (e) => {
      if (field.innerHTML) {
        field.innerHTML = "O";
        currentMark = "X";
      } else {
        field.innerHTML = currentMark;
        currentMark = "O"
      }
    });
  });
};

populateBoard();
