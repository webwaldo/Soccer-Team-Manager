<template>
  <div v-if="isOpen" class="modal-overlay-main" @click.self="$emit('close')">
    <div class="modal-content-main">
      <button @click="$emit('close')" class="main-modal-close-button">&times;</button>
      <div class="management-options-content">
        <h2>Options</h2>
        <div class="options-group">
          <label for="maxPlayers">Max Players on Field:</label>
          <input type="number" id="maxPlayers" v-model.number="maxPlayersControl" min="1" class="options-input">
        </div>
        <div class="options-group">
          <label for="goalieFeature">Enable Goalie Feature:</label>
          <input type="checkbox" id="goalieFeature" v-model="goalieFeatureControl" class="options-checkbox">
        </div>
        <div class="management-buttons">
          <button @click="openDeletePlayersSubModal" class="success-btn">Manage Players</button>
          <button @click="handleClearState" class="danger-btn">Clear All Data</button>
        </div>
      </div>

      <!-- Sub-modal for Deleting Players -->
      <div v-if="isDeletePlayersModalOpen" class="modal-overlay-sub" @click.self="closeDeletePlayersSubModal">
        <div class="modal-content-sub">
          <h2>Manage Players</h2>
          <div v-if="allPlayers.length === 0" class="no-players-message">No players available to manage.</div>
          <div v-else class="player-list-container">
            <div v-for="player in allPlayers" :key="player.name" class="player-item">
              <span>{{ player.name }}</span>
              <span class="player-type-label">{{ getPlayerType(player) }}</span>
              <button @click="deletePlayer(player)" class="delete-player-btn">Delete</button>
            </div>
          </div>
          <button @click="closeDeletePlayersSubModal" class="sub-modal-close-button">Done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useSoccerStore } from '../stores/soccerStore';

export default {
  name: 'ManagementOptions',
  props: {
    isOpen: Boolean,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useSoccerStore();
    const isDeletePlayersModalOpen = ref(false);

    const allPlayers = computed(() => [
      ...store.players.map(p => ({ ...p, type: 'active' })),
      ...store.rosterPlayers.map(name => ({ name, type: 'roster' }))
    ].sort((a,b) => a.name.localeCompare(b.name)));

    const maxPlayersControl = computed({
      get: () => store.maxPlayersOnField,
      set: (value) => {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue > 0) {
          store.setMaxPlayersOnField(numValue);
        } else if (value === '' || value === null) {
           // Keep current value or set to a default if input is cleared
           // For now, let's assume we want to prevent empty/invalid and revert or set default
           // This behavior might need refinement based on desired UX.
           // Re-setting to current store value effectively ignores invalid input.
           store.setMaxPlayersOnField(store.maxPlayersOnField);
        }
      }
    });

    const goalieFeatureControl = computed({
      get: () => store.goalieFeatureEnabled,
      set: (value) => {
        store.setGoalieFeatureEnabled(value);
      }
    });

    const openDeletePlayersSubModal = () => {
      isDeletePlayersModalOpen.value = true;
    };

    const closeDeletePlayersSubModal = () => {
      isDeletePlayersModalOpen.value = false;
    };

    const deletePlayer = (player) => {
      // Confirmation is good practice but removed for brevity if not explicitly requested to be kept
      // if (confirm(`Are you sure you want to delete ${player.name}?`)) {
        if (player.type === 'active') {
          store.removePlayer(player.name);
        } else {
          store.removeRosterPlayer(player.name);
        }
        if (allPlayers.value.length === 0) {
            closeDeletePlayersSubModal(); // Close sub-modal if no players left
        }
      // }
    };

    const handleClearState = () => {
      if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        store.clearState();
        // maxPlayersControl will automatically update due to reactivity with the store
        // goalieFeatureControl will automatically update
        // emit('close'); // Optionally close the main modal
      }
    };

    const getPlayerType = (player) => {
      return player.type === 'active' ? 'Active' : 'Roster';
    };

    return {
      isDeletePlayersModalOpen,
      allPlayers,
      openDeletePlayersSubModal,
      closeDeletePlayersSubModal,
      deletePlayer,
      handleClearState,
      getPlayerType,
      maxPlayersControl,
      goalieFeatureControl
    };
  }
};
</script>

<style scoped>
/* Main Modal Styles */
.modal-overlay-main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content-main {
  background-color: #fff;
  padding: 20px 30px 30px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-width: 500px;
  width: calc(100% - 40px);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.main-modal-close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #666;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.main-modal-close-button:hover {
  color: #333;
}

.management-options-content h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 25px;
  color: #333;
  font-size: 1.5em;
}

.options-group {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.options-group label {
  font-weight: 500;
  color: #444;
}

.options-input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 70px;
  text-align: center;
  font-size: 1em;
}

.options-checkbox {
  width: 20px; /* Adjust as needed */
  height: 20px; /* Adjust as needed */
  margin-left: 10px; /* Spacing from label */
}

.management-buttons {
  display: flex;
  flex-direction: column; /* Stack buttons for better mobile view */
  gap: 12px;
  margin-top: 20px;
}

.danger-btn {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1em;
  font-weight: 500;
}

.danger-btn:hover {
  background-color: #c9302c;
}

/* Sub-Modal (Delete Players) Styles */
.modal-overlay-sub {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75); /* Darker for more focus */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Above main modal */
}

.modal-content-sub {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  max-width: 450px;
  width: calc(100% - 40px);
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content-sub h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}

.no-players-message {
  text-align: center;
  color: #777;
  padding: 20px 0;
}

.player-list-container {
  max-height: 300px; /* Limit height and make scrollable if many players */
  overflow-y: auto;
  margin-bottom: 20px;
}

.player-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f7f7f7;
  border: 1px solid #eee;
  border-radius: 4px;
}

.player-type-label {
  font-size: 0.85em;
  color: #555;
  background-color: #e9ecef;
  padding: 3px 7px;
  border-radius: 3px;
  margin-left: auto;
  margin-right: 10px;
}

.delete-player-btn {
  padding: 6px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}
.delete-player-btn:hover {
  background-color: #c0392b;
}

.sub-modal-close-button {
  display: block;
  width: 100%;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}
.sub-modal-close-button:hover {
  background-color: #0056b3;
}
</style>