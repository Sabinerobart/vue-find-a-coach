<template>
  <base-dialog
    :show="!!error"
    @close="handleError"
    title="Oups ! An error occured !"
  >
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach now !</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
import BaseCard from "../../components/UI/BaseCard.vue";
import BaseDialog from "../../components/UI/BaseDialog.vue";

export default {
  components: {
    CoachForm,
    BaseCard,
    BaseDialog,
  },
  data() {
    return {
      error: null,
      loading: false,
    };
  },
  methods: {
    async saveData(data) {
      this.loading = true;
      try {
        await this.$store.dispatch("coaches/registerCoach", data);
        this.loading = false;
        this.$router.replace("/coaches"); // same as .push, but we can't go back to the register form after that
      } catch (error) {
        this.loading = false;
        this.error = error.message || "Failed to post !";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
