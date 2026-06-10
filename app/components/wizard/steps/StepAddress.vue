<template>
  <div class="step">
    <h2>What's your address?</h2>
    <input
      v-model="address1"
      type="text"
      placeholder="Street address"
      class="text-input"
      autocomplete="address-line1"
    />
    <input
      v-model="address2"
      type="text"
      placeholder="Apt, suite, etc. (optional)"
      class="text-input"
      autocomplete="address-line2"
    />
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <button :disabled="!address1" class="btn-primary" @click="handleContinue">Continue</button>
  </div>
</template>

<script setup lang="ts">
const { lead } = useLeadData()
const { goNext } = useWizard()

const address1 = ref(lead.value.address1)
const address2 = ref(lead.value.address2)
const errorMsg = ref('')

function handleContinue() {
  const a1 = address1.value.trim()
  if (!a1) {
    errorMsg.value = 'Please enter your street address.'
    return
  }
  lead.value.address1 = a1
  lead.value.address2 = address2.value.trim()
  goNext()
}
</script>
