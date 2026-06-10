<template>
  <div class="step">
    <h2>What's your name?</h2>
    <input
      v-model="firstName"
      type="text"
      placeholder="First name"
      class="text-input"
      autocomplete="given-name"
    />
    <input
      v-model="lastName"
      type="text"
      placeholder="Last name"
      class="text-input"
      autocomplete="family-name"
      @keydown.enter="handleContinue"
    />
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <button :disabled="!firstName || !lastName" class="btn-primary" @click="handleContinue">
      Continue
    </button>
  </div>
</template>

<script setup lang="ts">
const { lead } = useLeadData()
const { goNext } = useWizard()

const firstName = ref(lead.value.first_name)
const lastName = ref(lead.value.last_name)
const errorMsg = ref('')

function handleContinue() {
  const fn = firstName.value.trim()
  const ln = lastName.value.trim()
  if (!fn || !ln) {
    errorMsg.value = 'Please enter your full name.'
    return
  }
  lead.value.first_name = fn
  lead.value.last_name = ln
  goNext()
}
</script>
