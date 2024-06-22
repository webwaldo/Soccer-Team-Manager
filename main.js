let players = [];
let gameTime = 0;
let gameInterval;
let isGameRunning = false;
let ownScore = 0;
let otherScore = 0;
const rosterPlayers = ["Max", "Austo Wilson", "Mathew", "Xander", "Avery", "Austin levins", "Eve", "Amelia", "Fletcher"];
const MAX_FIELD_PLAYERS = 5;

const toggleGameBtn = document.getElementById('toggleGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const clearStateBtn = document.getElementById('clearStateBtn');
const addPlayerBtn = document.getElementById('addPlayerBtn');
const playerNameInput = document.getElementById('playerName');
const fieldDiv = document.getElementById('field');
const benchDiv = document.getElementById('bench');
const gameTimeDiv = document.getElementById('gameTime');
const ownScoreValue = document.getElementById('ownScoreValue');
const otherScoreValue = document.getElementById('otherScoreValue');
const rosterDiv = document.getElementById('roster');
const addAllPlayersBtn = document.getElementById('addAllPlayersBtn');

toggleGameBtn.onclick = startPauseGame;
resetGameBtn.onclick = confirmResetGame;
clearStateBtn.onclick = clearState;
addPlayerBtn.onclick = () => addPlayer();
addAllPlayersBtn.onclick = addAllPlayers;
playerNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addPlayer();
    }
});

document.getElementById('managePlayersBtn').onclick = openManagePlayersModal;
document.querySelector('.close').onclick = closeManagePlayersModal;
window.onclick = function(event) {
    const modal = document.getElementById('managePlayersModal');
    if (event.target == modal) {
        closeManagePlayersModal();
    }
}

loadState();