<template>
    <div>
      <h2>{{ title }} ({{ players.length }})</h2>
      <div :class="title.toLowerCase()">
        <div v-for="player in players" :key="player.name" class="player">
          <div class="player-info">
            <span class="player-name">{{ player.name }}</span>
            <span class="player-times">
              <span class="field-icon">{{ formatTime(player.fieldTime) }}</span>
              <span class="bench-icon">{{ formatTime(player.benchTime) }}</span>
            </span>
          </div>
          <div class="button-container">
            <button class="action-btn" @click="$emit('toggle-position', player.name)">
              {{ player.onField ? 'To Bench' : 'To Field' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlayerList',
    props: ['title', 'players'],
    emits: ['toggle-position'],
    setup() {
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
  
      return {
        formatTime
      };
    }
  };
  </script>