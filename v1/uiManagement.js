function loadState() {
    const savedState = localStorage.getItem('soccerAppState');
    if (savedState) {
        const state = JSON.parse(savedState);
        players = state.players;
        gameTime = state.gameTime;
        ownScore = state.ownScore;
        otherScore = state.otherScore;
        isGameRunning = state.isGameRunning;
        updateUI();
        if (isGameRunning) {
            startGame();
        }
    }
    updateRoster();
}

function saveState() {
    const state = {
        players: players,
        gameTime: gameTime,
        ownScore: ownScore,
        otherScore: otherScore,
        isGameRunning: isGameRunning
    };
    localStorage.setItem('soccerAppState', JSON.stringify(state));
}

function updateUI() {
    fieldDiv.innerHTML = '';
    benchDiv.innerHTML = '';

    const fieldPlayers = players.filter(p => p.onField).sort((a, b) => b.fieldTime - a.fieldTime);
    const benchPlayers = players.filter(p => !p.onField).sort((a, b) => b.benchTime - a.benchTime);

    fieldPlayers.forEach(player => createPlayerElement(player, fieldDiv));
    benchPlayers.forEach(player => createPlayerElement(player, benchDiv));

    const gameTimeBlock = document.getElementById('gameTimeBlock');
    const toggleGameBtn = document.getElementById('toggleGameBtn');

    gameTimeBlock.className = isGameRunning ? 'game-time-block' : 'game-time-block paused';
    toggleGameBtn.innerHTML = isGameRunning ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';


    gameTimeDiv.textContent = `Game Time: ${formatTime(gameTime)}`;
    gameTimeDiv.className = isGameRunning ? 'active' : 'paused';
    ownScoreValue.textContent = ownScore;
    otherScoreValue.textContent = otherScore;
    saveState();
    updateRoster();

    document.getElementById('managePlayersBtn').style.display = players.length > 0 ? 'block' : 'none';
}

function createPlayerElement(player, container) {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';
    
    const playerInfo = document.createElement('div');
    playerInfo.className = 'player-info';
    playerInfo.innerHTML = `
        <span class="player-name">${player.name}</span>
        <span class="player-times">
            <span class="field-icon">${formatTime(player.fieldTime)}</span>
            <span class="bench-icon">${formatTime(player.benchTime)}</span>
        </span>
    `;
    playerDiv.appendChild(playerInfo);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const actionBtn = document.createElement('button');
    actionBtn.className = 'action-btn';
    actionBtn.textContent = player.onField ? 'To Bench' : 'To Field';
    actionBtn.onclick = () => togglePlayerPosition(player.name);
    actionBtn.disabled = !player.onField && getFieldPlayersCount() >= MAX_FIELD_PLAYERS;
    buttonContainer.appendChild(actionBtn);

    playerDiv.appendChild(buttonContainer);
    container.appendChild(playerDiv);
}

function updateRoster() {
    rosterDiv.innerHTML = '';
    rosterPlayers.forEach(name => {
        if (!players.some(p => p.name === name)) {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'roster-player';
            playerDiv.textContent = name;
            playerDiv.onclick = () => addPlayer(name);
            rosterDiv.appendChild(playerDiv);
        }
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function openManagePlayersModal() {
    const modal = document.getElementById('managePlayersModal');
    const modalPlayerList = document.getElementById('modalPlayerList');
    modalPlayerList.innerHTML = '';

    players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.className = 'modal-player-item';
        playerItem.innerHTML = `
            <span>${player.name}</span>
            <button class="modal-remove-btn" onclick="removePlayer('${player.name}')">Remove</button>
        `;
        modalPlayerList.appendChild(playerItem);
    });

    modal.style.display = 'block';
}

function closeManagePlayersModal() {
    const modal = document.getElementById('managePlayersModal');
    modal.style.display = 'none';
}