<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>How to Use the App</h3>
      <ul>
        <li><strong>Add Players:</strong> Add each player once</li>
        <li><strong>Manage Team:</strong> Click the "Manage Players" button to select the team for the match.</li>
        <li><strong>Start Game:</strong> Once players are added, you can manage game time and substitutions.</li>
        <li><strong>Track Score:</strong> Use the scoreboard to keep track of the game's progress.</li>
        <li><strong>Substitutions:</strong> Manage player substitutions efficiently during the game.</li>
      </ul>
      <button @click="closeModal">Got it!</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  text-align: left;
  color: #333;
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.modal-content ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
}

.modal-content li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.modal-content button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #45a049;
}
</style>