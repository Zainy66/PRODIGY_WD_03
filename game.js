
const item = document.querySelectorAll(".item");
const popup = document.querySelector(".popup");
const newGame = document.getElementById("new-game");
const message = document.getElementById("message");
const playerTurn = document.getElementById("player-turn");

let xTurn = true;
let count = 0;
let playerXWins = 0;
let playerOWins = 0;

// Display X or O on click
item.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText === "") { // Check if the cell is empty
      if (xTurn) {
        element.innerText = "X";
        xTurn = false;
      } else {
        element.innerText = "O";
        xTurn = true;
      }
      playerTurn.innerText = xTurn ? 'X Turn' : 'O Turn';
      playerTurn.classList.remove(xTurn ? 'o' : 'x');
      playerTurn.classList.add(xTurn ? 'x' : 'o');
      count++;
      element.disabled = true;
      checkWin();
    }
  });
});

// Function to check for winner
const checkWin = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [el1, el2, el3] = [
      item[pattern[0]].innerText,
      item[pattern[1]].innerText,
      item[pattern[2]].innerText,
    ];

    // Check if all three match and are not empty
    if (el1 !== "" && el1 === el2 && el2 === el3) {
      if (el1 === "X") {
        playerXWins++;
      } else {
        playerOWins++;
      }
      winMatch(el1);
      return; // Exit the function if a winner is found
    }
  }

  // Check for draw (all cells filled)
  if (count === 9) {
    drawMatch();
  }
};

// Function to display winner message
const winMatch = (player) => {
  disableButtons();
  if (player === "X") {
    message.innerText = "X Wins!";
  } else {
    message.innerText = "O Wins!";
  }
  popup.classList.remove("hide");
  checkGameOver(); 
};


const drawMatch = () => {
  disableButtons();
  message.innerText = "It's a Draw!";
  popup.classList.remove("hide");
};


newGame.addEventListener("click", () => {
  count = 0;
  enableButtons();
  xTurn = true;
  playerTurn.innerText = "X Turn";
  playerTurn.classList.remove('o');
  playerTurn.classList.add('x');
  item.forEach((element) => {
    element.innerText = ""; 
    element.disabled = false; 
  });
});


const disableButtons = () => {
  item.forEach((element) => {
    element.disabled = true;
  });
};


const enableButtons = () => {
  item.forEach((element) => {
    element.disabled = false;
  });
  popup.classList.add("hide"); 
};


const checkGameOver = () => {
  if (playerXWins == 3) {
    message.innerText = "Player X Wins the Game!";
    playerXWins = 0;
    playerOWins = 0;

  } else if (playerOWins == 3) {
    message.innerText = "Player O Wins the Game!";
     playerXWins = 0;
    playerOWins = 0;
  }

}
