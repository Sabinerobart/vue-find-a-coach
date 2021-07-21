<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="getCoaches">Refresh</base-button>
        <base-button link to="/registration" v-if="!isCoach"
          >Register as coach</base-button
        >
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="filteredCoach in filteredCoaches"
          :key="filteredCoach.id"
          :id="filteredCoach.id"
          :firstName="filteredCoach.firstName"
          :lastName="filteredCoach.lastName"
          :rate="filteredCoach.hourlyRate"
          :areas="filteredCoach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import BaseButton from "../../components/UI/BaseButton.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
export default {
  components: { CoachItem, BaseButton, CoachFilter },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"]; // namespaced
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    getCoaches() {
      this.$store.dispatch("coaches/loadCoaches");
    },
  },
  created() {
    this.getCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>