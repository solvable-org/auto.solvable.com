<template>
  <div class="wizard-shell">
    <header class="wizard-header">
      <div class="wizard-logo">Solvable</div>
      <button
        v-if="!isFirstStep() && !isResultStep()"
        class="wizard-back"
        aria-label="Go back"
        @click="goBack"
      >
        ← Back
      </button>
    </header>

    <main class="wizard-content">
      <slot />
    </main>

    <!-- TrustedForm hidden input — populated by the TF script -->
    <input type="hidden" name="xxTrustedFormCertUrl" value="" />
    <!-- Jornaya LeadID hidden input -->
    <input id="leadid_token" type="hidden" name="leadid_token" value="" />
  </div>
</template>

<script setup lang="ts">
const { goBack, isFirstStep, isResultStep } = useWizard()
</script>

<style scoped>
.wizard-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.wizard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.wizard-logo {
  font-weight: 700;
  font-size: 1.25rem;
}
.wizard-back {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #6b7280;
}
.wizard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
}
</style>
