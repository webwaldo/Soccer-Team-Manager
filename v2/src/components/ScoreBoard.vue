<template>
  <div class="score-container">
    <div class="score-box">
      <span class="score-label">Our Team</span>
      <div class="score-controls">
        <button class="score-btn" @click="updateScore('own', -1)">-</button>
        <span class="score-value">{{ store.ownScore }}</span>
        <button class="score-btn" @click="updateScore('own', 1)">+</button>
      </div>
    </div>
    <div class="score-divider"></div>
    <div class="score-box">
      <span class="score-label">Their Team</span>
      <div class="score-controls">
        <button class="score-btn" @click="updateScore('other', -1)">-</button>
        <span class="score-value">{{ store.otherScore }}</span>
        <button class="score-btn" @click="updateScore('other', 1)">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useSoccerStore } from '../stores/soccerStore';

export default {
  name: 'ScoreBoard',
  setup() {
    const store = useSoccerStore();

    const updateScore = (team, change) => {
      store.updateScore(team, change);
    };

    return {
      store,
      updateScore
    };
  }
};
</script>

<style scoped>
.score-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #34495e;
  padding: 10px;
  border-radius: 8px;
  color: white;
  margin-bottom: 20px;
}

.score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
}

.score-label {
  font-size: 0.9em;
  margin-bottom: 5px;
}

.score-controls {
  display: flex;
  align-items: center;
}

.score-value {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 10px;
}

.score-btn {
  font-size: 1.2em;
  padding: 0 8px;
  cursor: pointer;
  background-color: #2ecc71;
  border: none;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.score-btn:hover {
  background-color: #27ae60;
}

.score-divider {
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 15px;
}

@media (max-width: 480px) {
  .score-container {
    flex-direction: row;
    justify-content: space-around;
  }
  
  .score-box {
    flex-direction: row;
    align-items: center;
  }

  .score-label {
    margin-bottom: 0;
    margin-right: 5px;
  }

  .score-divider {
    height: 30px;
    margin: 0 8px; /* Reduced horizontal margin for mobile */
  }

  .score-value {
    font-size: 1.2em;
  }

  .score-btn {
    font-size: 1em;
    padding: 2px 6px;
  }
}
</style>