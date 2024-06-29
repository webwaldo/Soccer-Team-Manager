<template>
  <div class="management-section">
    <h2>Management Options</h2>
    <div class="management-buttons">
      <button @click="openDeletePlayersModal" class="danger-btn">Delete Players</button>
      <button @click="clearState" class="danger-btn">Clear All Data</button>
    </div>
  </div>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <h2>Delete Players</h2>
      <div v-if="allPlayers.length === 0">No players available.</div>
      <div v-else>
        <div v-for="player in allPlayers" :key="player.name" class="player-item">
          <span>{{ player.name }}</span>
          <span class="player-type">{{ getPlayerType(player) }}</span>
          <button @click="deletePlayer(player)" class="delete-btn">Delete</button>
        </div>
      </div>
      <button @click="closeModal" class="close-btn">Close</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useSoccerStore } from '../stores/soccerStore';

export default {
  name: 'ManagementOptions',
  setup() {
    const store = useSoccerStore();
    const isModalOpen = ref(false);

    const allPlayers = computed(() => [
      ...store.players.map(p => ({ ...p, type: 'active' })),
      ...store.rosterPlayers.map(name => ({ name, type: 'roster' }))
    ]);

    const openDeletePlayersModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const deletePlayer = (player) => {
      if (confirm(`Are you sure you want to delete ${player.name}?`)) {
        if (player.type === 'active') {
          store.removePlayer(player.name);
        } else {
          store.removeRosterPlayer(player.name);
        }
      }
    };

    const clearState = () => {
      if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        store.clearState();
      }
    };

    const getPlayerType = (player) => {
      return player.type === 'active' ? 'Active Player' : 'Roster Player';
    };

    return {
      isModalOpen,
      allPlayers,
      openDeletePlayersModal,
      closeModal,
      deletePlayer,
      clearState,
      getPlayerType
    };
  }
};
</script>

<style scoped>
.management-section {
  margin-top: 20px;
}

.management-buttons {
  display: flex;
  gap: 10px;
}

.danger-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.danger-btn:hover {
  background-color: #c0392b;
}

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

.player-type {
  font-size: 0.8em;
  color: #7f8c8d;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.close-btn {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #2980b9;
}
</style>