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