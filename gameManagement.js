function updateGameTime() {
    gameTime++;
    players.forEach(player => {
        if (player.onField) {
            player.fieldTime++;
        } else {
            player.benchTime++;
        }
    });
    updateUI();
}

function startGame() {
    gameInterval = setInterval(updateGameTime, 1000);
    isGameRunning = true;
    updateUI();
}

function pauseGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    updateUI();
}

function startPauseGame() {
    if (isGameRunning) {
        pauseGame();
    } else {
        startGame();
    }
    updateUI();
}

function confirmResetGame() {
    if (confirm('Are you sure you want to reset the game? This will clear all current game data.')) {
        resetGame();
    }
}

function resetGame() {
    pauseGame();
    gameTime = 0;
    ownScore = 0;
    otherScore = 0;
    players.forEach(player => {
        player.fieldTime = 0;
        player.benchTime = 0;
        player.onField = false;
    });
    updateUI();
}

function clearState() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.removeItem('soccerAppState');
        players = [];
        gameTime = 0;
        ownScore = 0;
        otherScore = 0;
        resetGame();
    }
}

function updateScore(team, change) {
    if (team === 'own') {
        ownScore = Math.max(0, ownScore + change);
    } else {
        otherScore = Math.max(0, otherScore + change);
    }
    updateUI();
}