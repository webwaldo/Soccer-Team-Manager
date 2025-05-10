<template>
  <div id="roster-container">
    <h2>📋 Roster</h2>
    <div v-if="store.rosterPlayers.length > 0">
      <p>Click a player to move them to the Bench.</p>
      <div id="roster" class="roster">
        <div v-for="player in store.rosterPlayers" :key="player" class="bench-icon roster-player" @click="addPlayer(player)">
          {{ player }}
        </div>
      </div>
      <button @click="addAllPlayers" class="action-btn">Bench all Players from Roster</button>
    </div>
    <div v-else class="instructions">
      <h3>Roster Empty</h3>
      <p>The roster is for players not available for the match.</p>
      <p>Use the "Manage Players" button to move a player to the roster</p>
    </div>
  </div>
</template>

<script>
import { useSoccerStore } from '../stores/soccerStore';

export default {
  name: 'RosterList',
  setup() {
    const store = useSoccerStore();

    const addPlayer = (name) => {
      store.addPlayer(name);
    };

    const addAllPlayers = () => {
      store.rosterPlayers.forEach(name => addPlayer(name));
    };

    return {
      store,
      addPlayer,
      addAllPlayers
    };
  }
};
</script>