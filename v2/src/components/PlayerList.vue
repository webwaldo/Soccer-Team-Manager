<template>
  <div>
    <h2>{{ title }} ({{ players.length }})</h2>
    <div :class="title.toLowerCase()">
      <div v-for="player in players" :key="player.name" class="player">
        <div class="player-info">
          <span class="player-name">{{ player.name }}</span>
          <span class="player-times">
            <span class="field-icon timer-stat" :class="{ 'active-timer': player.onField }">{{ formatTime(player.fieldTime) }}</span>
            <span class="bench-icon timer-stat" :class="{ 'active-timer': !player.onField }">{{ formatTime(player.benchTime) }}</span>
          </span>
        </div>
        <div class="button-container">
          <button class="action-btn" @click="$emit('toggle-position', player.name)">
            {{ player.onField ? 'To Bench' : 'To Field' }}
          </button>
          <button
            v-if="store.goalieFeatureEnabled && player.name !== store.goalieName"
            class="action-btn btn-set-goalie"
            @click="store.setGoalie(player.name)">
            To Goalie
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
.player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.player-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.timer-stat { /* Common style for both timers */
  font-size: 0.85em;
  color: #7f8c8d; /* Default muted color */
  padding: 2px 0;
}

.active-timer {
  color: black;
  font-weight: bold;
}

/* Add styles for the new button */
.btn-set-goalie {
  background-color: #3498db; /* Secondary/muted grey color */
  color: white;
  /* margin-left: 5px; Removed as buttons will be stacked */
}

.btn-set-goalie:hover {
  background-color: #2d81b9; /* Darker secondary on hover */
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
  width: 100%;
}

.manage-players-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .button-container .action-btn {
    padding: 6px 10px; /* Reduced padding for mobile */
    font-size: 0.9em; /* Smaller font size for mobile */
  }

  .player-name {
    font-size: 0.95em;
  }

  .timer-stat {
    font-size: 0.8em;
  }

  .player-info {
    /* Ensure player-info and button-container are well-behaved on mobile */
    flex-basis: 60%; /* Give more space to player info */
  }
  .button-container {
    flex-basis: 35%; /* Adjust button container space */
    align-items: flex-end; /* Align buttons to the end on mobile if desired */
  }
}
</style>