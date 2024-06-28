<template>
    <div>
      <h2>Add New Player</h2>
      <div class="add-player-container">
        <input type="text" v-model="playerName" placeholder="Enter player name" @keypress.enter="addPlayer">
        <button @click="addPlayer"><i class="fas fa-plus"></i></button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'AddPlayer',
    setup(props, { emit }) {
      const playerName = ref('');
  
      const addPlayer = () => {
        if (playerName.value.trim()) {
          emit('add-player', playerName.value.trim());
          playerName.value = '';
        }
      };
  
      return {
        playerName,
        addPlayer
      };
    }
  };
  </script>