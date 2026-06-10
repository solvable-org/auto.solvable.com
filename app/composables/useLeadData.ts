import { defaultLeadData, type Car, type LeadData } from '~/types/lead'

// SSR-safe global state — single source of truth, never read from the DOM
export const useLeadData = () => {
  const lead = useState<LeadData>('lead', defaultLeadData)

  // Capture UTM/tracking params from the URL on page load
  function captureUtmParams() {
    const route = useRoute()
    const q = route.query

    if (q.pid) lead.value.pid = String(q.pid)
    if (q.cid) lead.value.cid = String(q.cid)
    if (q.sub1) lead.value.sub1 = String(q.sub1)
    if (q.sub2) lead.value.sub2 = String(q.sub2)
    if (q.sub3) lead.value.sub3 = String(q.sub3)
    if (q.sub4) lead.value.sub4 = String(q.sub4)
    if (q.sub5) lead.value.sub5 = String(q.sub5)
  }

  function setZip(zip: string, city: string, state: string) {
    lead.value.zip = zip
    lead.value.city = city
    lead.value.state = state
  }

  function addCar(car: Car) {
    lead.value.cars.push(car)
  }

  function updateLastCar(fields: Partial<Car>) {
    const last = lead.value.cars.at(-1)
    if (last) Object.assign(last, fields)
  }

  // Capture TrustedForm cert URL from the hidden input placed by the TF script
  function captureTrustedForm() {
    if (import.meta.client) {
      const el = document.querySelector<HTMLInputElement>('input[name="xxTrustedFormCertUrl"]')
      if (el?.value) lead.value.trustedform_cert_url = el.value
    }
  }

  // Capture Jornaya LeadID token
  function captureJornaya() {
    if (import.meta.client) {
      const el = document.querySelector<HTMLInputElement>('#leadid_token')
      if (el?.value) lead.value.jornaya_leadid = el.value
    }
  }

  return {
    lead,
    captureUtmParams,
    setZip,
    addCar,
    updateLastCar,
    captureTrustedForm,
    captureJornaya,
  }
}
