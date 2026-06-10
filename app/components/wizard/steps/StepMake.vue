<template>
  <div class="step">
    <h2>What's the make of your vehicle?</h2>
    <div class="card-grid card-grid--3col">
      <button
        v-for="make in VEHICLE_MAKES"
        :key="make"
        class="card"
        :class="{ selected: selectedMake === make }"
        @click="select(make)"
      >
        {{ make }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VEHICLE_MAKES } from '~/data/makes'

const { lead, updateLastCar } = useLeadData()
const { goNext } = useWizard()

const selectedMake = ref('')

onMounted(() => {
  selectedMake.value = lead.value.cars.at(-1)?.make ?? ''
})

function select(make: string) {
  selectedMake.value = make
  // Write to store immediately — never read DOM at submit
  updateLastCar({ make, model: '' })
  goNext()
}
</script>
