import { defineStore } from 'pinia'

export const useSoccerStore = defineStore('soccer', {
  state: () => ({
    players: [],
    rosterPlayers: ["Max", "Austo Wilson", "Mathew", "Avery", "Austin levins", "Evie", "Amelia", "Fletcher"],
    gameTime: 0,
    ownScore: 0,
    otherScore: 0,
    isGameRunning: false,
    lastUpdateTime: null,
  }),
  getters: {
    fieldPlayers: (state) => state.players.filter(p => p.onField),
    benchPlayers: (state) => state.players.filter(p => !p.onField),
  },
  actions: {
    togglePlayerPosition(name) {
      const player = this.players.find(p => p.name === name);
      if (player) {
        if (!player.onField && this.fieldPlayers.length >= 5) {
          alert("You can't add more than 5 players to the field.");
          return;
        }
        player.onField = !player.onField;
      }
    },
    removePlayer(name) {
      this.players = this.players.filter(p => p.name !== name);
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
    },
    clearState() {
      this.$reset();
    },
    updateGameTime() {
      if (this.isGameRunning) {
        const now = Date.now();
        const elapsed = this.lastUpdateTime ? Math.floor((now - this.lastUpdateTime) / 1000) : 0;
        this.gameTime += elapsed;
        this.lastUpdateTime = now;

        this.players.forEach(player => {
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
        this.$patch(state);
        if (this.isGameRunning) {
          this.lastUpdateTime = Date.now();
        }
      }
    },
    saveState() {
      localStorage.setItem('soccerAppState', JSON.stringify({
        ...this.$state,
        lastUpdateTime: this.isGameRunning ? Date.now() : null,
      }));
    },
    movePlayerToRoster(name) {
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
  },
})