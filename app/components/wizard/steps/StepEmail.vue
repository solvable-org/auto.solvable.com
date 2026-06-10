<template>
  <div class="step">
    <h2>What's your email address?</h2>
    <input
      v-model="email"
      type="email"
      placeholder="you@example.com"
      class="text-input"
      autocomplete="email"
      @keydown.enter="handleContinue"
    />
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <button :disabled="!email" class="btn-primary" @click="handleContinue">Continue</button>
  </div>
</template>

<script setup lang="ts">
const { lead } = useLeadData()
const { goNext } = useWizard()

const email = ref(lead.value.email)
const errorMsg = ref('')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function handleContinue() {
  const val = email.value.trim()
  if (!EMAIL_RE.test(val)) {
    errorMsg.value = 'Please enter a valid email address.'
    return
  }
  lead.value.email = val
  goNext()
}
</script>
