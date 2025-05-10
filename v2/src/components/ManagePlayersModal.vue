vueCopy<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Manage Players ({{ allPlayers.length }})</h2>
        <div v-if="allPlayers.length === 0">No players available.</div>
        <div v-else>
          <div v-for="player in sortedPlayers" :key="player.name" class="player-item">
            <span>
              {{ player.name }}
              <span class="player-status-icon">
                {{ player.status === 'goalie' ? '[G]' : player.status === 'field' ? '⚽' : player.status === 'bench' ? '🪑' : '📋' }}
              </span>
            </span>
            <div class="button-group">
              <button v-if="player.source === 'active'" @click="movePlayerToRoster(player)">
                To Roster
              </button>
              <button v-if="player.source === 'active'" @click="clearPlayerStats(player)">Clear Stats</button>
              <button @click="deletePlayer(player)" class="delete-btn">Delete</button>
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
  
      const allPlayers = computed(() => store.allPlayersDetailed);

      const sortedPlayers = computed(() => {
        return [...allPlayers.value].sort((a, b) => {
          if (a.source === 'roster' && b.source !== 'roster') {
            return 1; // a comes after b
          }
          if (a.source !== 'roster' && b.source === 'roster') {
            return -1; // a comes before b
          }
          // Optional: further sort non-roster players alphabetically or by status if needed
          // if (a.name < b.name) return -1;
          // if (a.name > b.name) return 1;
          return 0; // keep original order for players of the same source type
        });
      });
  
      const movePlayerToRoster = (player) => {
        // Ensure player is active before moving
        if (player.source === 'active') {
          store.movePlayerToRoster(player.name);
        }
      };
  
      const clearPlayerStats = (player) => {
        // Ensure player is active before clearing stats
        if (player.source === 'active') {
          store.clearPlayerStats(player.name);
        }
      };

      const deletePlayer = (player) => {
        if (confirm(`Are you sure you want to delete ${player.name}? This action cannot be undone.`)) {
          if (player.source === 'active') {
            store.removePlayer(player.name);
          } else if (player.source === 'roster') {
            store.removeRosterPlayer(player.name);
          }
        }
      };
  
      return {
        allPlayers,
        sortedPlayers,
        movePlayerToRoster,
        clearPlayerStats,
        deletePlayer, // Expose new method
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
    background-color: #3498db; /* Blue for general actions */
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.9em;
  }

  .player-item button.delete-btn {
    background-color: #e74c3c; /* Red for delete */
  }
  .player-item button.delete-btn:hover {
    background-color: #c0392b;
  }

  .player-status-icon {
    font-weight: bold;
    margin-left: 8px;
    font-size: 0.9em;
    color: #555;
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