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

    <!-- Goalie Section -->
    <div v-if="store.goalieFeatureEnabled" class="goalie-section card">
      <h2>Goalie</h2>
      <div v-if="store.currentGoalie" class="goalie-info">
        <span class="player-name">{{ store.currentGoalie.name }}</span>
        <button @click="store.removeGoalie()" class="btn-action btn-remove-goalie">Move to Bench</button>
      </div>
      <div v-else class="no-goalie">
        No Goalie Assigned
      </div>
    </div>

    <PlayerList title="Field Players" :players="store.fieldPlayers" @toggle-position="store.togglePlayerPosition" />
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

.goalie-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f0f8ff; /* Light alice blue for distinction */
  border: 1px solid #d1e7fd;
  border-radius: 8px;
}

.goalie-section h2 {
  margin-top: 0;
  margin-bottom: 10px;
}

.goalie-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
}

.goalie-info .player-name {
  font-weight: bold;
  font-size: 1.1em;
}

.btn-remove-goalie {
  background-color: #ffc107; /* Warning yellow */
  color: #333;
  border-color: #ffc107;
}
.btn-remove-goalie:hover {
  background-color: #e0a800;
}

.no-goalie {
  color: #6c757d; /* Muted text color */
  padding: 10px 0;
  font-style: italic;
}


/* General card style if not already present */
.card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* General button styles if not already present or to override */
.btn-action {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease, border-color 0.2s ease;
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

/* Media query for mobile devices */
@media (max-width: 768px) {
  #app {
    padding: 0 8px; /* Reduced horizontal padding for mobile */
    margin-top: 10px; /* Optionally reduce top margin as well */
  }

  .app-header h1 {
    font-size: 1.5em; /* Slightly smaller title on mobile */
  }

  .options-btn {
    font-size: 1.3rem; /* Slightly smaller options button */
  }
  
  /* You might want to adjust padding/margins for other elements too for a tighter mobile layout */
  .card, .goalie-section {
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>