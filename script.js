(function() {
    const setupSelection = document.querySelector("#setup");
    const startGameButton = document.querySelector("#startGame");
    const boardSelection = document.querySelector(".board");
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector("#status");
    const resetButton = document.querySelector("#reset");

    let currentPlayer = "X";
    let board = ['','','','','','','','',''];
    let isGameActive = true;
    let players = {
        player1: {name: '', symbol: 'X'},
        player2: {name: '', symbol: 'O'}
    };
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    function checkWiner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.textContent = `Player ${currentPlayer === players.player1.symbol ? players.player1.name : players.player2.name} wins!`;
                isGameActive = false;
                return;
            }
        }
        if (!board.includes('')) {
            statusText.textContent = 'Draw!'
            isGameActive = false;
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'));

        if (board[index] !== '' || !isGameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWiner();

        currentPlayer = currentPlayer === players.player1.symbol ? players.player2.symbol : players.player1.symbol;
        statusText.textContent = `It's ${currentPlayer === players.player1.symbol ? players.player1.name : players.player2.name}'s turn`;
    }

    function resetGame() {
        board = ['','','','','','','','',''];
        currentPlayer = players.player1.symbol;
        isGameActive = true;
        cells.forEach(cell => cell.textContent = '');
        statusText.textContent = `It's ${players.player1.name}'s turn`;
        boardSelection.style.display = 'grid';
        resetButton.style.display = 'block';
        setupSelection.style.display = 'none';
    }

    function startGame() {
        const player1Name = document.getElementById('player1Name').value;
        const player1Symbol = document.getElementById('player1Symbol').value;
        const player2Name =document.getElementById('player2Name').value;
        const player2Symbol = document.getElementById('player2Symbol').value;

        if (player1Name && player2Name && player1Symbol && player2Symbol && player1Symbol !== player2Symbol) {
            players.player1.name = player1Name;
            players.player1.symbol = player1Symbol;
            players.player2.name = player2Name;
            players.player2.symbol = player2Symbol;
            currentPlayer = players.player1.symbol;
            resetGame();
        } else {
            alert('Please enter valid names and symbols for both players. Symbols must be different.');
        }
    }

    startGameButton.addEventListener('click', startGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
})();