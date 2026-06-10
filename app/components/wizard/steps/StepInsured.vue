<template>
  <div class="step">
    <h2>Are you currently insured?</h2>
    <div class="card-grid card-grid--2col">
      <button
        class="card"
        :class="{ selected: lead.currently_insured === true }"
        @click="select(true)"
      >
        Yes
      </button>
      <button
        class="card"
        :class="{ selected: lead.currently_insured === false }"
        @click="select(false)"
      >
        No
      </button>
    </div>

    <!-- Insurer dropdown appears inline when Yes is selected — not a separate step -->
    <div v-if="showInsurerSelect" class="insurer-row">
      <label>Who is your current insurer?</label>
      <select v-model="lead.insured_with" class="select-input" @change="handleInsurerSelected">
        <option value="">Select insurer</option>
        <option v-for="insurer in INSURERS" :key="insurer" :value="insurer">{{ insurer }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const INSURERS = [
  '21st Century',
  'AAA',
  'Allstate',
  'American Family',
  'Bristol West',
  'Dairyland',
  'Esurance',
  'Farmers',
  'GEICO',
  'Infinity',
  'Liberty Mutual',
  'MetLife',
  'Nationwide',
  'Progressive',
  'Safe Auto',
  'State Farm',
  'Travelers',
  'USAA',
  'Other',
  'None',
]

const { lead } = useLeadData()
const { goNext } = useWizard()

const showInsurerSelect = computed(() => lead.value.currently_insured === true)

function select(insured: boolean) {
  lead.value.currently_insured = insured
  if (!insured) {
    lead.value.insured_with = ''
    goNext()
  }
  // If yes — wait for insurer selection below
}

function handleInsurerSelected() {
  if (lead.value.insured_with) goNext()
}
</script>
