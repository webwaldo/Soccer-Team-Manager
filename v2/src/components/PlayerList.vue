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
    <button v-if="title === 'Bench'" @click="$emit('manage-players')" class="manage-players-btn">
      Manage Players
    </button>
  </div>
</template>

<script>
export default {
  name: 'PlayerList',
  props: ['title', 'players'],
  emits: ['toggle-position', 'manage-players'],
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

<style scoped>
.manage-players-btn {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.manage-players-btn:hover {
  background-color: #2980b9;
}
</style>