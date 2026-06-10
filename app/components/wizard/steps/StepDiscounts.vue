<template>
  <div class="step">
    <h2>Which discounts apply to you?</h2>
    <p class="step-hint">Select all that apply</p>
    <div class="card-grid card-grid--2col">
      <button
        class="card card--toggle"
        :class="{ selected: lead.homeowner }"
        @click="lead.homeowner = !lead.homeowner"
      >
        Homeowner
      </button>
      <button
        class="card card--toggle"
        :class="{ selected: lead.marital_status }"
        @click="lead.marital_status = !lead.marital_status"
      >
        Married
      </button>
      <button
        class="card card--toggle"
        :class="{ selected: lead.military_affiliation }"
        @click="lead.military_affiliation = !lead.military_affiliation"
      >
        Military / Veteran
      </button>
    </div>
    <button class="btn-primary" @click="goNext">Continue</button>
  </div>
</template>

<script setup lang="ts">
const { lead } = useLeadData()
const { goNext } = useWizard()
</script>
