<template>
  <div id="app">
    <h1>Soccer Subs App</h1>
    <GameTime />
    <ScoreBoard />
    <SubTimer />
    <PlayerList title="Field" :players="store.fieldPlayers" @toggle-position="store.togglePlayerPosition" />
    <PlayerList 
      title="Bench" 
      :players="store.benchPlayers" 
      @toggle-position="store.togglePlayerPosition"
      @manage-players="openManagePlayersModal"
    />
    <AddPlayer @add-player="store.addPlayer" />
    <RosterList :players="store.players" @add-player="store.addPlayer" />
    <ManagementOptions :players="store.players" @remove-player="store.removePlayer" @clear-state="store.clearState" />
    <ManagePlayersModal :is-open="isManagePlayersModalOpen" @close="closeManagePlayersModal" />
  </div>
</template>

<script>
import { onMounted, watch, ref } from 'vue';
import { useSoccerStore } from './stores/soccerStore';
import GameTime from './components/GameTime.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import SubTimer from './components/SubTimer.vue';
import PlayerList from './components/PlayerList.vue';
import AddPlayer from './components/AddPlayer.vue';
import RosterList from './components/RosterList.vue';
import ManagementOptions from './components/ManagementOptions.vue';
import ManagePlayersModal from './components/ManagePlayersModal.vue';

export default {
  name: 'App',
  components: {
    GameTime,
    ScoreBoard,
    SubTimer,
    PlayerList,
    AddPlayer,
    RosterList,
    ManagementOptions,
    ManagePlayersModal
  },
  setup() {
    const store = useSoccerStore();
    const isManagePlayersModalOpen = ref(false);

    const openManagePlayersModal = () => {
      isManagePlayersModalOpen.value = true;
    };

    const closeManagePlayersModal = () => {
      isManagePlayersModalOpen.value = false;
    };

    onMounted(() => {
      store.loadState();
      store.updateGameTime();
    });

    watch(() => store.$state, () => {
      store.saveState();
    }, { deep: true });

    return {
      store,
      isManagePlayersModalOpen,
      openManagePlayersModal,
      closeManagePlayersModal
    };
  }
};
</script>