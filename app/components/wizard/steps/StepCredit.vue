<template>
  <div class="step">
    <h2>How would you rate your credit score?</h2>
    <div class="card-grid card-grid--2col">
      <button
        v-for="option in options"
        :key="option.value"
        class="card"
        :class="{ selected: lead.credit_score === option.value }"
        @click="select(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LeadData } from '~/types/lead'

const options: Array<{ label: string, value: LeadData['credit_score'] }> = [
  { label: 'Excellent', value: 'excellent' },
  { label: 'Good', value: 'good' },
  { label: 'Fair', value: 'fair' },
  { label: 'Poor', value: 'poor' },
]

const { lead } = useLeadData()
const { goNext } = useWizard()

function select(value: LeadData['credit_score']) {
  lead.value.credit_score = value
  goNext()
}
</script>
