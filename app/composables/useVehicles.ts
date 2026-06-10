import { ref } from 'vue'

// NHTSA vehicle model lookup with in-memory cache
const modelCache = new Map<string, string[]>()

export const useVehicles = () => {
  const loading = ref(false)
  const models = ref<string[]>([])
  const error = ref<string | null>(null)

  async function fetchModels(make: string, year: string): Promise<string[]> {
    const key = `${make}-${year}`
    if (modelCache.has(key)) {
      models.value = modelCache.get(key)!
      return models.value
    }

    loading.value = true
    error.value = null

    try {
      const encodedMake = encodeURIComponent(make)
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodedMake}/modelyear/${year}?format=json`
      const data = await $fetch<{ Results: Array<{ Model_Name: string }> }>(url)
      const result = data.Results.map((r) => r.Model_Name).sort()
      modelCache.set(key, result)
      models.value = result
      return result
    }
    catch {
      error.value = 'Could not load vehicle models.'
      models.value = []
      return []
    }
    finally {
      loading.value = false
    }
  }

  function clearModels() {
    models.value = []
    error.value = null
  }

  return { loading, models, error, fetchModels, clearModels }
}
