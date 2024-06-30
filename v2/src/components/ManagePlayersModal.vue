vueCopy<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Manage Players</h2>
        <div v-if="allPlayers.length === 0">No players available.</div>
        <div v-else>
          <div v-for="player in allPlayers" :key="player.name" class="player-item">
            <span>{{ player.name }}</span>
            <div class="button-group">
              <button @click="movePlayerToRoster(player)">
                To Roster
              </button>
              <button @click="clearPlayerStats(player)">Clear Stats</button>
            </div>
          </div>
        </div>
        <button @click="$emit('close')" class="close-btn">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useSoccerStore } from '../stores/soccerStore';
  
  export default {
    name: 'ManagePlayersModal',
    props: {
      isOpen: Boolean,
    },
    emits: ['close'],
    setup() {
      const store = useSoccerStore();
  
      const allPlayers = computed(() => store.players);
  
      const movePlayerToRoster = (player) => {
        store.movePlayerToRoster(player.name);
      };
  
      const clearPlayerStats = (player) => {
        store.clearPlayerStats(player.name);
      };
  
      return {
        allPlayers,
        movePlayerToRoster,
        clearPlayerStats,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .player-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
  }
  
  .player-item button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .player-item button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
  
  .player-item button:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  .close-btn {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .close-btn:hover {
    background-color: #c0392b;
  }
  </style>