<template>
    <div class="sub-timer">
      <div class="sub-timer-header">
        <h3>Sub Timer</h3>
        <div class="timer-display" :class="{ 'negative': remainingTime < 0 }">
          {{ formattedTime }}
        </div>
      </div>
      <div class="timer-controls">
        <button v-for="duration in timerDurations" :key="duration" @click="setTimer(duration)" :class="{ 'active': selectedDuration === duration }">
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
  
      const formattedTime = computed(() => {
        const minutes = Math.floor(Math.abs(remainingTime.value) / 60);
        const seconds = Math.abs(remainingTime.value) % 60;
        const sign = remainingTime.value < 0 ? '-' : '';
        return `${sign}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });
  
      const setTimer = (duration) => {
        selectedDuration.value = duration;
        remainingTime.value = duration * 60;
      };
  
      const resetTimer = () => {
        remainingTime.value = selectedDuration.value * 60;
      };
  
      watch(() => store.gameTime, (newTime, oldTime) => {
        if (store.isGameRunning && newTime > oldTime) {
          remainingTime.value--;
        }
      });
  
      return {
        timerDurations,
        selectedDuration,
        remainingTime,
        formattedTime,
        setTimer,
        resetTimer
      };
    }
  };
  </script>
  <style scoped>
  .sub-timer {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .sub-timer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .sub-timer-header h3 {
    margin: 0;
  }
  
  .timer-display {
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .timer-display.negative {
    color: #e74c3c;
  }
  
  .timer-controls {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
  }
  
  .timer-controls button {
    padding: 5px 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .timer-controls button.active {
    background-color: #2980b9;
  }
  
  .reset-timer-btn {
    width: 100%;
    padding: 10px;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .reset-timer-btn:hover {
    background-color: #27ae60;
  }
  
  @media (max-width: 600px) {
    .timer-controls {
      flex-wrap: wrap;
    }
  
    .timer-controls button {
      flex: 1 0 30%;
      margin: 2px;
    }
  }
  </style>