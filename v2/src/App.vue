<template>
  <div id="app">
    <h1>Soccer Subs App</h1>
    <GameTime />
    <ScoreBoard />
    <PlayerList title="Field" :players="store.fieldPlayers" @toggle-position="store.togglePlayerPosition" />
    <PlayerList title="Bench" :players="store.benchPlayers" @toggle-position="store.togglePlayerPosition" />
    <AddPlayer @add-player="store.addPlayer" />
    <RosterList :players="store.players" @add-player="store.addPlayer" />
    <ManagementOptions :players="store.players" @remove-player="store.removePlayer" @clear-state="store.clearState" />
  </div>
</template>

<script>
import { onMounted, watch } from 'vue';
import { useSoccerStore } from './stores/soccerStore';
import GameTime from './components/GameTime.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import PlayerList from './components/PlayerList.vue';
import AddPlayer from './components/AddPlayer.vue';
import RosterList from './components/RosterList.vue';
import ManagementOptions from './components/ManagementOptions.vue';

export default {
  name: 'App',
  components: {
    GameTime,
    ScoreBoard,
    PlayerList,
    AddPlayer,
    RosterList,
    ManagementOptions
  },
  setup() {
    const store = useSoccerStore();

    onMounted(() => {
      store.loadState();
      store.updateGameTime();
    });

    watch(() => store.$state, () => {
      store.saveState();
    }, { deep: true });

    return {
      store
    };
  }
};
</script>