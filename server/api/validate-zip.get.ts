export default defineEventHandler(async (event) => {
  const { zip } = getQuery(event)

  if (!zip || !/^\d{5}$/.test(String(zip))) {
    throw createError({ statusCode: 400, message: 'Invalid ZIP code' })
  }

  // Primary: Solvable's own ZIP service
  try {
    const primary = await $fetch<{ city: string, state: string, state_abbr: string }>(
      `https://solvable-live.dedicatedresource.net/solvable/fetch/zipdata/v1/${zip}`,
    )
    if (primary?.city) {
      return { zip, city: primary.city, state: primary.state_abbr || primary.state }
    }
  }
  catch { /* fall through to backup */ }

  // Fallback: zippopotam.us
  const fallback = await $fetch<{ places: Array<{ 'place name': string, 'state abbreviation': string }> }>(
    `https://api.zippopotam.us/us/${zip}`,
  )

  if (!fallback?.places?.length) {
    throw createError({ statusCode: 404, message: 'ZIP code not found' })
  }

  return {
    zip,
    city: fallback.places[0]?.['place name'] ?? '',
    state: fallback.places[0]?.['state abbreviation'] ?? '',
  }
})
