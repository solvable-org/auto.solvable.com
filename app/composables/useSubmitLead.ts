import { ref } from 'vue'
import type { LeadData } from '~/types/lead'

export interface SubmitResult {
  success: boolean
  submissionSuccess?: boolean
  offers: MediaAlphaOffer[]
  error?: string
}

export interface MediaAlphaOffer {
  carrier: string
  premium: string
  ctaUrl: string
  position: 'best' | 'runner-up'
}

export const useSubmitLead = () => {
  const submitting = ref(false)
  const submitError = ref<string | null>(null)
  const offers = ref<MediaAlphaOffer[]>([])

  async function submit(lead: LeadData): Promise<SubmitResult> {
    submitting.value = true
    submitError.value = null

    try {
      // Submit the lead via server route (keys never leave the server)
      const result = await $fetch<{ success: boolean, offers: MediaAlphaOffer[] }>('/api/submit-lead', {
        method: 'POST',
        body: lead,
      })

      offers.value = result.offers ?? []

      // Fire-and-forget enrichment calls
      $fetch('/api/ringba-enrich', {
        method: 'POST',
        body: { lead },
      }).catch(() => {})

      // Always navigate to result regardless of Cake/LP outcome —
      // MediaAlpha ads load independently. Pass submissionSuccess separately for logging.
      return { success: true, submissionSuccess: result.success ?? false, offers: offers.value }
    }
    catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed. Please try again.'
      submitError.value = message
      return { success: false, offers: [], error: message }
    }
    finally {
      submitting.value = false
    }
  }

  async function fetchMediaAlphaAds(lead: LeadData): Promise<MediaAlphaOffer[]> {
    try {
      const result = await $fetch<{ offers: MediaAlphaOffer[] }>('/api/mediaalpha-ads', {
        method: 'POST',
        body: { lead },
      })
      return result.offers ?? []
    }
    catch {
      return []
    }
  }

  return { submitting, submitError, offers, submit, fetchMediaAlphaAds }
}
