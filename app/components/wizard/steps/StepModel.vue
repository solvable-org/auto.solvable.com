<template>
  <div class="step">
    <h2>What's the model?</h2>

    <div v-if="loading" class="loading-hint">Loading models...</div>

    <div v-else-if="models.length" class="card-grid card-grid--3col">
      <button
        v-for="model in models"
        :key="model"
        class="card"
        :class="{ selected: selectedModel === model }"
        @click="select(model)"
      >
        {{ model }}
      </button>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
      <button class="btn-link" @click="goNext">Skip</button>
    </div>

    <div v-else class="error">
      No models found for this make/year.
      <button class="btn-link" @click="goNext">Skip</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { lead, updateLastCar } = useLeadData()
const { goNext } = useWizard()
const { loading, models, error, fetchModels } = useVehicles()

const selectedModel = ref('')
const currentCar = computed(() => lead.value.cars.at(-1))

onMounted(async () => {
  selectedModel.value = currentCar.value?.model ?? ''
  if (currentCar.value?.make && currentCar.value?.year) {
    await fetchModels(currentCar.value.make, currentCar.value.year)
  }
})

function select(model: string) {
  selectedModel.value = model
  updateLastCar({ model })
  goNext()
}
</script>
