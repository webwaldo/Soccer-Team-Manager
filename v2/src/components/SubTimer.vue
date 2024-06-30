<template>
    <div class="sub-timer">
      <div class="sub-timer-header">
        <h3>Sub Timer</h3>
        <div class="timer-display" :class="{ 'negative': remainingTime < 0 }">
          {{ formattedTime }}
        </div>
        <button @click="toggleTimerOptions" class="cog-button" :class="{ 'active': showTimerOptions }">
          <i class="fas fa-cog"></i>
        </button>
      </div>
      <div v-if="showTimerOptions" class="timer-controls">
        <button 
          v-for="duration in timerDurations" 
          :key="duration" 
          @click="setTimer(duration)" 
          :class="{ 'active': selectedDuration === duration }"
        >
          {{ duration }}m
        </button>
      </div>
      <button @click="resetTimer" class="reset-timer-btn">Reset Timer</button>
    </div>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue';
  import { useSoccerStore } from '../stores/soccerStore';
  
  export default {
    name: 'SubTimer',
    setup() {
      const store = useSoccerStore();
      const timerDurations = [1, 2, 3, 4, 5, 10];
      const selectedDuration = ref(5); // Default to 5 minutes
      const remainingTime = ref(selectedDuration.value * 60);
      const showTimerOptions = ref(false);
  
      const formattedTime = computed(() => {
        const minutes = Math.floor(Math.abs(remainingTime.value) / 60);
        const seconds = Math.abs(remainingTime.value) % 60;
        const sign = remainingTime.value < 0 ? '-' : '';
        return `${sign}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });
  
      const toggleTimerOptions = () => {
        showTimerOptions.value = !showTimerOptions.value;
      };
  
      const setTimer = (duration) => {
        selectedDuration.value = duration;
        remainingTime.value = duration * 60;
        showTimerOptions.value = false;
      };
  
      const resetTimer = () => {
        remainingTime.value = selectedDuration.value * 60;
      };
  
      watch(() => store.gameTime, (newTime, oldTime) => {
        if (store.isGameRunning && newTime > oldTime) {
          remainingTime.value--;
        }
      });
  
      // Watch for clearState action
      watch(() => store.clearStateFlag, () => {
        selectedDuration.value = 5;
        remainingTime.value = 5 * 60;
        showTimerOptions.value = false;
      });
  
      return {
        timerDurations,
        selectedDuration,
        remainingTime,
        formattedTime,
        showTimerOptions,
        toggleTimerOptions,
        setTimer,
        resetTimer
      };
    }
  };
  </script>
  
  <style scoped>
  .sub-timer {
    position: sticky;
    top: 70px; /* Adjust this value based on the height of your GameTime component */
    z-index: 999;
    background-color: #34495e;
    color: white;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .sub-timer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0px;
  }
  
  .sub-timer-header h3 {
    margin: 0;
    font-size: 0.9em;
  }
  
  .timer-display {
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .timer-display.negative {
    color: #e74c3c;
  }
  
  .cog-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  
  .cog-button:hover {
    transform: rotate(45deg);
  }
  
  .cog-button.active {
    color: #3498db;
  }
  
  .timer-controls {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  
  .timer-controls button {
    padding: 5px 10px;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .timer-controls button:hover {
    background-color: #27ae60;
  }
  
  .timer-controls button.active {
    background-color: #27ae60;
  }
  
  .reset-timer-btn {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0;
  }
  
  .reset-timer-btn:hover {
    background-color: #2980b9;
  }
  
  @media (max-width: 480px) {
    .sub-timer {
      padding: 10px;
    }
  
    .timer-display {
      font-size: 1.2em;
    }
  
    .timer-controls button {
      padding: 3px 6px;
      font-size: 0.9em;
    }
  }
  </style>