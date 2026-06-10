import { STEP_ORDER, STEP_GA_EVENT, defaultLeadData, type StepId } from '~/types/lead'

export const useWizard = () => {
  const currentStep = useState<StepId>('wizard-step', () => 'zip')
  const { lead } = useLeadData()
  const config = useRuntimeConfig()

  function sendGaEvent(step: StepId) {
    if (!import.meta.client) return
    const gtagId = config.public.gtagId
    if (!gtagId || typeof window.gtag === 'undefined') return
    window.gtag('event', STEP_GA_EVENT[step])
  }

  function goTo(step: StepId) {
    currentStep.value = step
    sendGaEvent(step)
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goNext() {
    const idx = STEP_ORDER.indexOf(currentStep.value)
    if (idx === -1 || idx >= STEP_ORDER.length - 1) return
    goTo(STEP_ORDER[idx + 1] as StepId)
  }

  // Back navigation must be skip-aware:
  // If currently_insured=false, pressing back from discounts goes to insured, not insurer.
  // The another-vehicle step loops back through year/make/model for a second car.
  function goBack() {
    const step = currentStep.value
    const idx = STEP_ORDER.indexOf(step)
    if (idx <= 0) return

    // Skip logic: the insurer inline is part of StepInsured, not a separate step,
    // so no special case needed here for that path.
    // Another-vehicle: if the user said "no more vehicles" from another-vehicle step,
    // back just goes to the previous step in order.
    goTo(STEP_ORDER[idx - 1] as StepId)
  }

  function isFirstStep() {
    return currentStep.value === STEP_ORDER[0]
  }

  function isResultStep() {
    return currentStep.value === 'result'
  }

  // Restart the wizard — resets all lead data, preserves UTM params
  function restart() {
    const { pid, cid, sub1, sub2, sub3, sub4, sub5 } = lead.value
    Object.assign(lead.value, defaultLeadData())
    lead.value.pid = pid
    lead.value.cid = cid
    lead.value.sub1 = sub1
    lead.value.sub2 = sub2
    lead.value.sub3 = sub3
    lead.value.sub4 = sub4
    lead.value.sub5 = sub5
    currentStep.value = 'zip'
  }

  return {
    currentStep,
    goTo,
    goNext,
    goBack,
    isFirstStep,
    isResultStep,
    restart,
  }
}

