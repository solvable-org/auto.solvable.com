<template>
  <div class="step">
    <h2>What year is your vehicle?</h2>
    <div class="card-grid">
      <button
        v-for="year in recentYears"
        :key="year"
        class="card"
        :class="{ selected: selectedYear === year }"
        @click="select(year)"
      >
        {{ year }}
      </button>
    </div>

    <div class="other-row">
      <label>Other year:</label>
      <select v-model="selectedYear" @change="selectFromDropdown">
        <option value="">Select year</option>
        <option v-for="year in allYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getVehicleYears } from '~/data/makes'

const { lead } = useLeadData()
const { goNext } = useWizard()

const allYears = getVehicleYears()
const recentYears = allYears.slice(0, 8)
const selectedYear = ref('')

onMounted(() => {
  selectedYear.value = lead.value.cars.at(-1)?.year ?? ''
})

function select(year: string) {
  selectedYear.value = year

  const lastCar = lead.value.cars.at(-1)
  // Only push a new car if the last one already has a make (i.e. is complete),
  // or if there are no cars yet. Otherwise update the in-progress car.
  if (!lastCar || lastCar.make) {
    lead.value.cars.push({ year, make: '', model: '' })
  }
  else {
    lastCar.year = year
    lastCar.make = ''
    lastCar.model = ''
  }

  goNext()
}

function selectFromDropdown() {
  if (selectedYear.value) select(selectedYear.value)
}
</script>
