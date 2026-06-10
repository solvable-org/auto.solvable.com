<template>
  <div class="wizard-page">
    <WizardShell>
      <component :is="currentStepComponent" />
    </WizardShell>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { StepId } from '~/types/lead'

import StepZip from '~/components/wizard/steps/StepZip.vue'
import StepYear from '~/components/wizard/steps/StepYear.vue'
import StepMake from '~/components/wizard/steps/StepMake.vue'
import StepModel from '~/components/wizard/steps/StepModel.vue'
import StepAnotherVehicle from '~/components/wizard/steps/StepAnotherVehicle.vue'
import StepInsured from '~/components/wizard/steps/StepInsured.vue'
import StepDiscounts from '~/components/wizard/steps/StepDiscounts.vue'
import StepGender from '~/components/wizard/steps/StepGender.vue'
import StepCredit from '~/components/wizard/steps/StepCredit.vue'
import StepBirthdate from '~/components/wizard/steps/StepBirthdate.vue'
import StepName from '~/components/wizard/steps/StepName.vue'
import StepAddress from '~/components/wizard/steps/StepAddress.vue'
import StepEmail from '~/components/wizard/steps/StepEmail.vue'
import StepPhone from '~/components/wizard/steps/StepPhone.vue'
import StepResult from '~/components/wizard/StepResult.vue'

const STEP_COMPONENTS: Record<StepId, Component> = {
  'zip': StepZip,
  'year': StepYear,
  'make': StepMake,
  'model': StepModel,
  'another-vehicle': StepAnotherVehicle,
  'insured': StepInsured,
  'discounts': StepDiscounts,
  'gender': StepGender,
  'credit': StepCredit,
  'birthdate': StepBirthdate,
  'name': StepName,
  'address': StepAddress,
  'email': StepEmail,
  'phone': StepPhone,
  'result': StepResult,
}

const { currentStep } = useWizard()
const { captureUtmParams } = useLeadData()

const currentStepComponent = computed(() => STEP_COMPONENTS[currentStep.value])

onMounted(() => {
  captureUtmParams()
})
</script>
