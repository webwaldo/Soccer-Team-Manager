<template>
    <div>
      <h2>Add Player from Roster</h2>
      <div id="roster" class="roster">
        <div v-for="player in availableRosterPlayers" :key="player" class="roster-player" @click="addPlayer(player)">
          {{ player }}
        </div>
      </div>
      <button @click="addAllPlayers" class="action-btn">Add All Players from Roster</button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    name: 'RosterList',
    props: {
      players: {
        type: Array,
        required: true
      }
    },
    setup(props, { emit }) {
      const rosterPlayers = ["Max", "Austo Wilson", "Mathew", "Avery", "Austin levins", "Evie", "Amelia", "Fletcher"];
  
      const availableRosterPlayers = computed(() => 
        rosterPlayers.filter(name => !props.players.some(p => p.name === name))
      );
  
      const addPlayer = (name) => {
        emit('add-player', name);
      };
  
      const addAllPlayers = () => {
        availableRosterPlayers.value.forEach(name => addPlayer(name));
      };
  
      return {
        availableRosterPlayers,
        addPlayer,
        addAllPlayers
      };
    }
  };
  </script>