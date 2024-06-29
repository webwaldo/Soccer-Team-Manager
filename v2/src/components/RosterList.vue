<template>
  <div>
    <h2>Add Player from Roster</h2>
    <div id="roster" class="roster">
      <div v-for="player in store.rosterPlayers" :key="player" class="roster-player" @click="addPlayer(player)">
        {{ player }}
      </div>
    </div>
    <button @click="addAllPlayers" class="action-btn">Add All Players from Roster</button>
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