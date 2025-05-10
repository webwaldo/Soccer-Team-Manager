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
          <button
            v-if="player.name !== store.goalieName"
            class="action-btn btn-set-goalie"
            @click="store.setGoalie(player.name)">
            Set Goalie
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
import { useSoccerStore } from '../stores/soccerStore'; // Import the store

export default {
  name: 'PlayerList',
  props: ['title', 'players'],
  emits: ['toggle-position', 'manage-players'],
  setup() {
    const store = useSoccerStore(); // Instantiate the store

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return {
      formatTime,
      store // Expose store to template
    };
  }
};
</script>

<style scoped>
/* Add styles for the new button */
.btn-set-goalie {
  background-color: #6c757d; /* Secondary/muted grey color */
  color: white;
  /* margin-left: 5px; Removed as buttons will be stacked */
}

.btn-set-goalie:hover {
  background-color: #5a6268; /* Darker secondary on hover */
}

.button-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 8px; /* Space between stacked buttons */
  align-items: flex-start; /* Align buttons to the start of the container */
}

.button-container .action-btn {
  width: 100%; /* Make buttons take full width of their container */
  box-sizing: border-box; /* Ensure padding and border don't expand width */
  text-align: center;
}


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