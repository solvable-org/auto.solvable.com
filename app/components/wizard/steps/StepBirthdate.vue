<template>
  <div class="step">
    <h2>What's your date of birth?</h2>
    <input
      v-model="birthdate"
      type="date"
      class="text-input"
      :max="maxDate"
      :min="minDate"
      @change="handleChange"
    />
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <button :disabled="!birthdate" class="btn-primary" @click="handleContinue">Continue</button>
  </div>
</template>

<script setup lang="ts">
const { lead } = useLeadData()
const { goNext } = useWizard()

const birthdate = ref(lead.value.birth_date)
const errorMsg = ref('')

// Must be 16–100 years old
const today = new Date()
const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate())
  .toISOString().split('T')[0]
const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
  .toISOString().split('T')[0]

function handleChange() {
  errorMsg.value = ''
}

function handleContinue() {
  if (!birthdate.value) return
  const age = today.getFullYear() - new Date(birthdate.value).getFullYear()
  if (age < 16 || age > 100) {
    errorMsg.value = 'Please enter a valid date of birth.'
    return
  }
  lead.value.birth_date = birthdate.value
  goNext()
}
</script>
