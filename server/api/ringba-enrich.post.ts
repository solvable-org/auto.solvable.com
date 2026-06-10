export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!config.ringbaApiUrl) return { ok: true }

  try {
    await $fetch(config.ringbaApiUrl as string, {
      method: 'POST',
      body: body.lead,
    })
  }
  catch {
    // Fire-and-forget — do not surface Ringba errors to the client
  }

  return { ok: true }
})
