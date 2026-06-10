<template>
  <div class="step">
    <h2>What is your gender?</h2>
    <div class="card-grid card-grid--2col">
      <button
        v-for="option in options"
        :key="option.value"
        class="card"
        :class="{ selected: lead.gender === option.value }"
        @click="select(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LeadData } from '~/types/lead'

const options: Array<{ label: string, value: LeadData['gender'] }> = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Non-binary', value: 'non-binary' },
]

const { lead } = useLeadData()
const { goNext } = useWizard()

function select(value: LeadData['gender']) {
  lead.value.gender = value
  goNext()
}
</script>
