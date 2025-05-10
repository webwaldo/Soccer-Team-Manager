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
          <!-- The "Manage Players" button's functionality is now part of the main ManagePlayersModal -->
          <!-- If this button was intended to open *that* modal, it would need to emit an event -->
          <!-- For now, removing the button as its direct sub-modal is gone. -->
          <!-- <button class="success-btn">Manage Players</button> -->
          <button @click="handleClearState" class="danger-btn">Clear All Data</button>
        </div>
      </div>
      <!-- Sub-modal for Deleting Players has been removed -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'; // ref is no longer needed here
import { useSoccerStore } from '../stores/soccerStore';

export default {
  name: 'ManagementOptions',
  props: {
    isOpen: Boolean,
  },
  emits: ['close'], // Consider if an event like 'open-manage-players-modal' is needed
  setup(props, { emit }) {
    const store = useSoccerStore();
    // isDeletePlayersModalOpen and related logic removed

    // allPlayers computed property removed as it was for the sub-modal

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

    // openDeletePlayersSubModal, closeDeletePlayersSubModal, and deletePlayer methods removed

    const handleClearState = () => {
      if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        store.clearState();
        // maxPlayersControl will automatically update due to reactivity with the store
        // goalieFeatureControl will automatically update
        // emit('close'); // Optionally close the main modal
      }
    };

    // getPlayerType method removed as it was for the sub-modal

    return {
      // Removed: isDeletePlayersModalOpen, allPlayers, openDeletePlayersSubModal, closeDeletePlayersSubModal, deletePlayer, getPlayerType
      handleClearState,
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

/* Sub-Modal (Delete Players) Styles removed */
</style>