<template>
  <div class="step">
    <h2>What's your phone number?</h2>
    <input
      v-model="phone"
      type="tel"
      placeholder="(555) 555-0100"
      class="text-input"
      autocomplete="tel"
      inputmode="tel"
      @keydown.enter="handleContinue"
    />

    <div class="tcpa-consent">
      <p>
        By clicking <strong>See My Options</strong>, I consent to receive calls and texts at the number
        provided, including auto-dialed calls/texts and pre-recorded messages. Consent is not a
        condition of purchase. I also agree to the
        <a href="/terms" target="_blank">Terms of Service</a> and
        <a href="/privacy" target="_blank">Privacy Policy</a>.
      </p>
    </div>

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <p v-if="submitError" class="error">{{ submitError }}</p>

    <button :disabled="!phone || submitting" class="btn-primary btn-primary--orange" @click="handleContinue">
      {{ submitting ? 'Processing...' : 'See My Options' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { lead, captureTrustedForm, captureJornaya } = useLeadData()
const { goTo } = useWizard()
const { submit, submitting, submitError } = useSubmitLead()

const phone = ref(lead.value.phone)
const errorMsg = ref('')

// Loose US phone validation
const PHONE_DIGITS_RE = /\d/g
function normalizePhone(raw: string): string {
  const digits = (raw.match(PHONE_DIGITS_RE) || []).join('')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits[0] === '1') return `+${digits}`
  return ''
}

async function handleContinue() {
  const normalized = normalizePhone(phone.value)
  if (!normalized) {
    errorMsg.value = 'Please enter a valid US phone number.'
    return
  }

  lead.value.phone = normalized

  // Capture compliance tokens right before submit
  captureTrustedForm()
  captureJornaya()

  const result = await submit(lead.value)
  if (result.success) {
    goTo('result')
  }
}
</script>
