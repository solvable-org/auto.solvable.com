<template>
  <div class="step">
    <h2>What's your ZIP code?</h2>
    <p v-if="locationLabel" class="location-hint">{{ locationLabel }}</p>

    <input
      v-model="zip"
      type="text"
      inputmode="numeric"
      maxlength="5"
      placeholder="e.g. 90210"
      class="text-input"
      autofocus
      @keydown.enter="handleContinue"
    />

    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

    <button :disabled="loading || zip.length < 5" class="btn-primary" @click="handleContinue">
      {{ loading ? 'Looking up...' : 'Continue' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const zip = ref('')
const loading = ref(false)
const errorMsg = ref('')
const locationLabel = ref('')

const { lead, setZip } = useLeadData()
const { goNext } = useWizard()

// Pre-fill if returning to this step
onMounted(() => {
  if (lead.value.zip) zip.value = lead.value.zip
})

async function handleContinue() {
  if (zip.value.length < 5) return
  loading.value = true
  errorMsg.value = ''

  try {
    const result = await $fetch<{ zip: string, city: string, state: string }>('/api/validate-zip', {
      query: { zip: zip.value },
    })
    locationLabel.value = `${result.city}, ${result.state}`
    setZip(result.zip, result.city, result.state)
    goNext()
  }
  catch {
    errorMsg.value = 'ZIP code not found. Please check and try again.'
  }
  finally {
    loading.value = false
  }
}
</script>
