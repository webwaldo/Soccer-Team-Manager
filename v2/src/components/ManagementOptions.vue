<template>
    <div class="management-section">
      <h2>Management Options</h2>
      <div class="management-buttons">
        <button @click="openManagePlayersModal">Manage Players</button>
        <button @click="clearState" class="danger-btn">Clear All Data</button>
      </div>
    </div>
    <div id="managePlayersModal" class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <span class="close" @click="closeManagePlayersModal">&times;</span>
        <h2>Manage Players</h2>
        <div id="modalPlayerList">
          <div v-for="player in players" :key="player.name" class="modal-player-item">
            <span>{{ player.name }}</span>
            <button class="modal-remove-btn" @click="removePlayer(player.name)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'ManagementOptions',
    props: ['players'],
    emits: ['remove-player', 'clear-state'],
    setup(props, { emit }) {
      const isModalOpen = ref(false);
  
      const openManagePlayersModal = () => {
        isModalOpen.value = true;
      };
  
      const closeManagePlayersModal = () => {
        isModalOpen.value = false;
      };
  
      const removePlayer = (name) => {
        if (confirm(`Are you sure you want to remove ${name} from the team?`)) {
          emit('remove-player', name);
        }
      };
  
      const clearState = () => {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
          emit('clear-state');
        }
      };
  
      return {
        isModalOpen,
        openManagePlayersModal,
        closeManagePlayersModal,
        removePlayer,
        clearState
      };
    }
  };
  </script>