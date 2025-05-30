<template>
    <div id="gameTimeBlock" class="game-time-block" :class="{ 'paused': !store.isGameRunning }">
      <div class="game-time-wrapper">
        <div id="gameTime" :class="{ 'paused': !store.isGameRunning }">Game Time: {{ formattedTime }}</div>
      </div>
      <div class="game-controls">
        <button @click="toggleGame" class="toggle-game-btn">
          <i :class="store.isGameRunning ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
        <button @click="resetGame" class="reset-game-btn">
          <i class="fas fa-redo"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, onUnmounted, watch } from 'vue';
  import { useSoccerStore } from '../stores/soccerStore';
  
  export default {
    name: 'GameTime',
    setup() {
      const store = useSoccerStore();
  
      const formattedTime = computed(() => {
        const minutes = Math.floor(store.gameTime / 60);
        const seconds = store.gameTime % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });
  
      const updateInterval = 1000; // 1 second
      let intervalId = null;
  
      const startUpdateInterval = () => {
        if (!intervalId) {
          intervalId = setInterval(() => {
            store.updateGameTime();
          }, updateInterval);
        }
      };
  
      const stopUpdateInterval = () => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };
  
      const toggleGame = () => {
        if (store.isGameRunning) {
          store.pauseGame();
          stopUpdateInterval();
        } else {
          store.startGame();
          startUpdateInterval();
        }
      };
  
      const resetGame = () => {
        if (confirm('Are you sure you want to reset the game?')) {
          stopUpdateInterval();
          store.resetGame();
        }
      };
  
      onMounted(() => {
        if (store.isGameRunning) {
          startUpdateInterval();
        }
      });
  
      onUnmounted(() => {
        stopUpdateInterval();
      });
  
      watch(() => store.isGameRunning, (newValue) => {
        if (newValue) {
          startUpdateInterval();
        } else {
          stopUpdateInterval();
        }
      });
  
      return {
        store,
        formattedTime,
        toggleGame,
        resetGame
      };
    }
  };
  </script>

<style scoped>
.game-time-block {
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-bottom: 20px; /* Add some space below the sticky element */
  transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
  .game-time-wrapper {
    padding-left: 0 !important; /* Remove left padding */
    padding-right: 0 !important; /* Remove right padding */
  }
  #gameTime {
    font-size: 1.2em; /* Optionally adjust font size */
  }
  .game-controls .toggle-game-btn,
  .game-controls .reset-game-btn {
    padding: 5px 8px; /* Smaller buttons on mobile */
    font-size: 1.2em;
  }
}
</style>