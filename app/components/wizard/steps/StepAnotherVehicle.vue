<template>
  <div class="step">
    <h2>Do you have another vehicle to insure?</h2>
    <div class="card-grid card-grid--2col">
      <button class="card" @click="select(true)">Yes</button>
      <button class="card" @click="select(false)">No</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepId } from '~/types/lead'

const { goTo, goNext } = useWizard()

function select(another: boolean) {
  if (another) {
    // Loop back to year to collect the second vehicle
    goTo('year' as StepId)
  }
  else {
    goNext()
  }
}
</script>
