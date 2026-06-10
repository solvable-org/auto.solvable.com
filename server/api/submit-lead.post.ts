import type { LeadData } from '~/types/lead'

// Carrier name map from vCAPI response
const CARRIER_MAP: Record<number, string> = {
  1: 'Allstate',
  3: 'Farmers',
  5: 'State Farm',
  7: 'Independent Agent',
}

function getCkmConfig(pid: string, config: ReturnType<typeof useRuntimeConfig>) {
  return pid === '1921'
    ? { key: config.ckmKeyPid1921, campaignId: config.ckmCampaignPid1921 }
    : { key: config.ckmKeyDefault, campaignId: config.ckmCampaignDefault }
}

function getLpKey(pid: string, config: ReturnType<typeof useRuntimeConfig>) {
  return pid === '1921' ? config.lpKeyPid1921 : config.lpKey
}

function buildCakePayload(lead: LeadData, config: ReturnType<typeof useRuntimeConfig>) {
  const { key: ckmKey, campaignId } = getCkmConfig(lead.pid, config)
  const [firstName, ...rest] = (lead.first_name + ' ' + lead.last_name).trim().split(' ')
  const lastName = rest.join(' ') || firstName

  const primaryCar = lead.cars[0]

  return {
    ckm_key: ckmKey,
    ckm_campaign_id: campaignId,
    fd_zip: lead.zip,
    fv_year: primaryCar?.year ?? '',
    fv_make: primaryCar?.make ?? '',
    fv_model: primaryCar?.model ?? '',
    fv2_year: lead.cars[1]?.year ?? '',
    fv2_make: lead.cars[1]?.make ?? '',
    fv2_model: lead.cars[1]?.model ?? '',
    multidriver: lead.cars.length > 1 ? 'true' : 'false',
    currently_insured: lead.currently_insured ? '1' : '0',
    insured_with: lead.insured_with,
    homeowner: lead.homeowner ? 'true' : 'false',
    marital_status: lead.marital_status ? 'true' : 'false',
    military_affiliation: lead.military_affiliation ? 'true' : 'false',
    gender: lead.gender === 'male' ? 'M' : lead.gender === 'female' ? 'F' : 'X',
    credit_score: lead.credit_score.charAt(0).toUpperCase() + lead.credit_score.slice(1),
    fd_birthday: lead.birth_date,
    first_name: firstName,
    last_name: lastName,
    address1: lead.address1,
    address2: lead.address2,
    city: lead.city,
    state: lead.state,
    zip: lead.zip,
    email: lead.email,
    phone: lead.phone,
    ip: lead.ip,
    tcpa_text: lead.trustedform_cert_url ? 'agreed' : '',
    xxTrustedFormCertUrl: lead.trustedform_cert_url,
    leadid_token: lead.jornaya_leadid,
    cid: lead.cid,
    sub_1: lead.sub1,
    sub_2: lead.sub2,
    sub_3: lead.sub3,
    sub_5: lead.sub5,
  }
}

function buildLpPayload(lead: LeadData, config: ReturnType<typeof useRuntimeConfig>) {
  const lpKey = getLpKey(lead.pid, config)
  const primaryCar = lead.cars[0]

  return {
    lp_campaign_id: config.lpCampaignId,
    lp_supplier_id: config.lpSupplierId,
    lp_key: lpKey,
    zip_code: lead.zip,
    state: lead.state,
    city: lead.city,
    vehicle_year: primaryCar?.year ?? '',
    vehicle_make: primaryCar?.make ?? '',
    vehicle_model: primaryCar?.model ?? '',
    currently_insured: lead.currently_insured ? '1' : '0',
    current_insurer: lead.insured_with,
    home_owner: lead.homeowner ? '1' : '0',
    marital_status: lead.marital_status ? 'married' : 'single',
    gender: lead.gender,
    credit_rating: lead.credit_score,
    dob: lead.birth_date,
    first_name: lead.first_name,
    last_name: lead.last_name,
    address: lead.address1,
    email: lead.email,
    phone: lead.phone,
    trusted_form_cert_url: lead.trustedform_cert_url,
    leadid_token: lead.jornaya_leadid,
    sub1: lead.sub1,
    sub2: lead.sub2,
    sub3: lead.sub3,
    sub5: lead.sub5,
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const lead = await readBody<LeadData>(event)

  const cakePayload = buildCakePayload(lead, config)
  const lpPayload = buildLpPayload(lead, config)

  // Submit Cake and LeadProsper in parallel
  const [cakeResult] = await Promise.allSettled([
    $fetch(config.cakeApiUrl as string, {
      method: 'POST',
      body: cakePayload,
    }),
    $fetch('https://api.leadprosper.io/direct_post', {
      method: 'POST',
      body: lpPayload,
    }),
  ])

  // Parse carrier from Cake response for the result screen
  let carrierName = ''
  if (cakeResult.status === 'fulfilled') {
    const resp = cakeResult.value as Record<string, unknown>
    const carrierId = Number(resp?.carrier ?? resp?.carrier_id ?? -1)
    carrierName = CARRIER_MAP[carrierId] ?? ''
  }

  return {
    success: cakeResult.status === 'fulfilled',
    carrierName,
    offers: [],
  }
})
