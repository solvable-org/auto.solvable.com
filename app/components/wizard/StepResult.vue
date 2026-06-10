<template>
  <div class="step step--result">
    <h2>Here are your options!</h2>
    <p class="step-hint">Based on your profile, {{ lead.first_name }}, we found the following quotes.</p>

    <div v-if="loadingAds" class="loading-hint">Loading your best offers...</div>

    <div v-else-if="adOffers.length" class="offers">
      <div
        v-for="offer in adOffers"
        :key="offer.ctaUrl"
        class="offer-card"
        :class="offer.position === 'best' ? 'offer-card--best' : 'offer-card--runner'"
      >
        <div class="offer-label">{{ offer.position === 'best' ? 'Best Offer' : 'Runner Up' }}</div>
        <div class="offer-carrier">{{ offer.carrier }}</div>
        <div class="offer-premium">{{ offer.premium }}</div>
        <a :href="offer.ctaUrl" target="_blank" rel="noopener" class="offer-cta">
          Get This Rate
        </a>
      </div>
    </div>

    <div v-else class="no-offers">
      <p>We're still matching you with carriers. Check your email shortly for your personalized quotes.</p>
    </div>

    <button class="btn-link" @click="restart">Start over</button>
  </div>
</template>

<script setup lang="ts">
const { lead } = useLeadData()
const { restart } = useWizard()
const { fetchMediaAlphaAds } = useSubmitLead()

const loadingAds = ref(true)
const adOffers = ref<Awaited<ReturnType<typeof fetchMediaAlphaAds>>>([])

onMounted(async () => {
  adOffers.value = await fetchMediaAlphaAds(lead.value)
  loadingAds.value = false
})
</script>
