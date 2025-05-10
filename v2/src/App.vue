<template>
  <div id="app">
    <header class="app-header">
      <h1>Soccer Subs App</h1>
      <button @click="toggleManagementOptions" class="options-btn" title="Settings">
        <i class="fas fa-cog"></i>
      </button>
    </header>
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
    <ManagementOptions :is-open="showManagementOptions" @close="closeManagementOptions" />
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
    const showManagementOptions = ref(false);

    const toggleManagementOptions = () => {
      showManagementOptions.value = !showManagementOptions.value;
    };

    const closeManagementOptions = () => {
      showManagementOptions.value = false;
    };

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
      closeManagePlayersModal,
      showManagementOptions,
      toggleManagementOptions,
      closeManagementOptions
    };
  }
};
</script>

<style>
/* Assuming Font Awesome is linked globally or via vite build */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.options-btn {
  background: none;
  border: none;
  font-size: 1.5rem; /* Adjust size as needed */
  cursor: pointer;
  color: #333; /* Adjust color as needed */
  padding: 5px;
}

.options-btn:hover {
  color: #007bff; /* Adjust hover color as needed */
}

/* Add other global styles or component-specific styles below if needed */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
}
</style>