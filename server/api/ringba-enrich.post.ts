export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()
  const body = await readBody(event)

  if (!appConfig.ringbaApiUrl) return { ok: true }

  try {
    await $fetch(appConfig.ringbaApiUrl as string, {
      method: 'POST',
      body: body.lead,
    })
  }
  catch {
    // Fire-and-forget — do not surface Ringba errors to the client
  }

  return { ok: true }
})
