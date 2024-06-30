function addPlayer(name = null) {
    const playerName = name || playerNameInput.value.trim();
    if (playerName && !players.some(p => p.name === playerName)) {
        players.push({ name: playerName, onField: false, fieldTime: 0, benchTime: 0 });
        playerNameInput.value = '';
        updateUI();
    }
}

function removePlayer(name) {
    if (confirm(`Are you sure you want to remove ${name} from the team?`)) {
        players = players.filter(p => p.name !== name);
        updateUI();
        closeManagePlayersModal();
        openManagePlayersModal();
    }
}

function addAllPlayers() {
    rosterPlayers.forEach(name => {
        if (!players.some(p => p.name === name)) {
            players.push({ name, onField: false, fieldTime: 0, benchTime: 0 });
        }
    });
    updateUI();
}

function getFieldPlayersCount() {
    return players.filter(p => p.onField).length;
}

function togglePlayerPosition(name) {
    const player = players.find(p => p.name === name);
    if (player) {
        if (!player.onField && getFieldPlayersCount() >= MAX_FIELD_PLAYERS) {
            alert(`You can't add more than ${MAX_FIELD_PLAYERS} players to the field.`);
            return;
        }
        player.onField = !player.onField;
        updateUI();
    }
}