document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell")
  const resetButton = document.getElementById("reset")
  const resultDisplay = document.querySelector("h4")
  const popUp = document.querySelector(".pop")
  const popUpMessage = document.querySelector(".pop h5")

  let currentPlayer = "X"
  let gameActive = true
  let boardState = ["", "", "", "", "", "", "", "", ""]

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function addColor(cell) {
    if (currentPlayer == "X") {
      cell.style.color = "red"
    }
  }

  const handleCellClick = (cell, index) => {
    if (boardState[index] !== "" || !gameActive) return

    boardState[index] = currentPlayer
    cell.textContent = currentPlayer

    checkResult()
    switchPlayer()
    addColor(cell)
  }

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    resultDisplay.textContent = `${currentPlayer}'s Turn`
  }

  const checkResult = () => {
    let roundWon = false
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i]
      if (
        boardState[a] === "" ||
        boardState[b] === "" ||
        boardState[c] === ""
      ) {
        continue
      }
      if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
        roundWon = true
        break
      }
    }

    if (roundWon) {
      resultDisplay.textContent = `${currentPlayer} Wins!`
      popUpMessage.textContent = `${currentPlayer} Wins!`
      gameActive = false
      popUp.classList.remove("hide")
      return
    }

    if (!boardState.includes("")) {
      resultDisplay.textContent = "Draw!"
      popUpMessage.textContent = "It's a Draw!"
      gameActive = false
      popUp.classList.remove("hide")
      return
    }
  }

  const resetGame = () => {
    currentPlayer = "X"
    gameActive = true
    boardState = ["", "", "", "", "", "", "", "", ""]
    resultDisplay.textContent = `${currentPlayer}'s Turn`
    cells.forEach((cell) => (cell.textContent = ""))
    popUp.classList.add("hide")
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index))
  })

  resetButton.addEventListener("click", resetGame)

  // Initialize game
  resultDisplay.textContent = `${currentPlayer}'s Turn`
})
