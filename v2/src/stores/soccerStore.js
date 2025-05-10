import { defineStore } from 'pinia'

export const useSoccerStore = defineStore('soccer', {
  state: () => ({
    players: [],
    rosterPlayers: [],
    gameTime: 0,
    ownScore: 0,
    otherScore: 0,
    isGameRunning: false,
    lastUpdateTime: null,
    clearStateFlag: 0,
    maxPlayersOnField: 7, // Default to 7 players
    goalieName: null,
  }),
  getters: {
    currentGoalie: (state) => state.goalieName ? state.players.find(p => p.name === state.goalieName) : null,
    // Field players excluding the goalie
    fieldPlayers: (state) => state.players.filter(p => p.onField && p.name !== state.goalieName).sort((a, b) => b.fieldTime - a.fieldTime),
    // Bench players (goalie is never on bench if active goalie)
    benchPlayers: (state) => state.players.filter(p => !p.onField && p.name !== state.goalieName).sort((a, b) => b.benchTime - a.benchTime),
    activeFieldPlayersCount: (state) => {
      let count = state.players.filter(p => p.onField && p.name !== state.goalieName).length;
      if (state.goalieName && state.players.some(p => p.name === state.goalieName && p.onField)) {
        count++;
      }
      return count;
    },
  },
  actions: {
    togglePlayerPosition(name) {
      const player = this.players.find(p => p.name === name);
      if (!player) return;

      if (name === this.goalieName) {
        this.removeGoalie(); // Moving goalie to bench
        return;
      }

      if (!player.onField) { // Moving player to field
        if (this.activeFieldPlayersCount >= this.maxPlayersOnField) {
          alert(`You can't add more than ${this.maxPlayersOnField} players to the field (including goalie).`);
          return;
        }
      }
      player.onField = !player.onField;
    },
    removePlayer(name) {
      if (name === this.goalieName) {
        this.goalieName = null;
      }
      this.players = this.players.filter(p => p.name !== name);
    },
  
    removeRosterPlayer(name) {
      this.rosterPlayers = this.rosterPlayers.filter(p => p !== name);
    },
    updateScore(team, change) {
      if (team === 'own') {
        this.ownScore = Math.max(0, this.ownScore + change);
      } else {
        this.otherScore = Math.max(0, this.otherScore + change);
      }
    },
    startGame() {
      this.isGameRunning = true;
      this.lastUpdateTime = Date.now();
    },
    pauseGame() {
      this.isGameRunning = false;
      this.lastUpdateTime = null;
    },
    resetGame() {
      this.gameTime = 0;
      this.ownScore = 0;
      this.otherScore = 0;
      this.isGameRunning = false;
      this.lastUpdateTime = null;
      this.players.forEach(player => {
        player.fieldTime = 0;
        player.benchTime = 0;
        player.onField = false;
      });
      this.goalieName = null;
    },
    clearState() {
      const defaultMaxPlayers = this.maxPlayersOnField; // Preserve maxPlayersOnField
      this.$reset();
      this.maxPlayersOnField = defaultMaxPlayers; // Restore maxPlayersOnField
      this.goalieName = null; // Ensure goalieName is reset
      this.clearStateFlag++; // Increment the flag to trigger watchers
    },
    updateGameTime() {
      if (this.isGameRunning) {
        const now = Date.now();
        const elapsed = this.lastUpdateTime ? Math.floor((now - this.lastUpdateTime) / 1000) : 0;
        this.gameTime += elapsed;
        this.lastUpdateTime = now;

        this.players.forEach(player => {
          if (player.name === this.goalieName) { // Goalie's time does not increment
            return;
          }
          if (player.onField) {
            player.fieldTime += elapsed;
          } else {
            player.benchTime += elapsed;
          }
        });
      }
    },
    loadState() {
      const savedState = localStorage.getItem('soccerAppState');
      if (savedState) {
        const state = JSON.parse(savedState);
        // Ensure goalieName is part of the state being loaded, or initialize if not
        if (state.goalieName === undefined) {
          state.goalieName = null;
        }
        if (state.maxPlayersOnField === undefined) {
            state.maxPlayersOnField = 7; // Default if not in saved state
        }
        this.$patch(state);
        if (this.isGameRunning) {
          this.lastUpdateTime = Date.now();
        }
      } else {
        // Initialize goalieName if no saved state
        this.goalieName = null;
        this.maxPlayersOnField = 7; // Ensure default
      }
    },
    saveState() {
      localStorage.setItem('soccerAppState', JSON.stringify({
        ...this.$state,
        lastUpdateTime: this.isGameRunning ? Date.now() : null,
      }));
    },
    movePlayerToRoster(name) {
      if (name === this.goalieName) {
        this.goalieName = null; // Clear goalie if they are moved to roster
      }
      const playerIndex = this.players.findIndex(p => p.name === name);
      if (playerIndex !== -1) {
        const player = this.players[playerIndex];
        this.players.splice(playerIndex, 1);
        if (!this.rosterPlayers.includes(player.name)) {
          this.rosterPlayers.push(player.name);
        }
      }
    },

    addPlayer(name) {
      if (!this.players.some(p => p.name === name)) {
        this.players.push({ name, onField: false, fieldTime: 0, benchTime: 0 });
        const rosterIndex = this.rosterPlayers.indexOf(name);
        if (rosterIndex !== -1) {
          this.rosterPlayers.splice(rosterIndex, 1);
        }
      }
    },

    clearPlayerStats(name) {
      const player = this.players.find(p => p.name === name);
      if (player) {
        player.fieldTime = 0;
        player.benchTime = 0;
      }
    },
    setMaxPlayersOnField(limit) {
      if (typeof limit === 'number' && limit > 0) {
        this.maxPlayersOnField = limit;
      }
    },
    setGoalie(playerName) {
      const newGoalie = this.players.find(p => p.name === playerName);
      if (!newGoalie) return;

      // If there's an existing goalie and it's not the new one, move old goalie to bench
      if (this.goalieName && this.goalieName !== playerName) {
        const oldGoalie = this.players.find(p => p.name === this.goalieName);
        if (oldGoalie) {
          oldGoalie.onField = false;
        }
      }
      
      // Set new goalie
      newGoalie.onField = true; // Ensure goalie is on field
      this.goalieName = playerName;

      // Check field player limit - this logic might need adjustment based on how goalie fits in
      // For now, setting goalie bypasses the direct count check in togglePlayerPosition,
      // but activeFieldPlayersCount getter includes goalie.
    },
    removeGoalie() {
      if (this.goalieName) {
        const goalie = this.players.find(p => p.name === this.goalieName);
        if (goalie) {
          goalie.onField = false; // Move goalie to bench
        }
        this.goalieName = null;
      }
    },
  },
})