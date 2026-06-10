import type { LeadData } from '~/types/lead'
import type { MediaAlphaOffer } from '~/composables/useSubmitLead'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ lead: LeadData }>(event)
  const lead = body.lead

  const placement = lead.pid === '1921' ? config.maPlacementPid1921 : config.maPlacementDefault

  if (!placement) return { offers: [] }

  try {
    const result = await $fetch<{ ads: Array<{ carrier: string, premium: string, click_url: string }> }>(
      'https://vcapi.adquadrant.com/vtrack/mediaalpha-ads',
      {
        method: 'POST',
        body: {
          placement_id: placement,
          zip: lead.zip,
          state: lead.state,
          vehicle_year: lead.cars[0]?.year,
          vehicle_make: lead.cars[0]?.make,
          vehicle_model: lead.cars[0]?.model,
          gender: lead.gender,
          credit_score: lead.credit_score,
          currently_insured: lead.currently_insured,
        },
      },
    )

    const offers: MediaAlphaOffer[] = (result.ads ?? []).slice(0, 2).map((ad, i) => ({
      carrier: ad.carrier,
      premium: ad.premium,
      ctaUrl: ad.click_url,
      position: i === 0 ? 'best' : 'runner-up',
    }))

    return { offers }
  }
  catch {
    return { offers: [] }
  }
})
