// Loads Jornaya LeadID using the account ID from app.config (versioned, non-secret)
export default defineNuxtPlugin(() => {
  const { jornayaAccountId } = useAppConfig()
  if (!jornayaAccountId) return

  const s = document.createElement('script')
  s.id = 'LeadiDscript_campaign'
  s.type = 'text/javascript'
  s.async = true
  s.src = `//create.lidstatic.com/campaign/${jornayaAccountId}.js?snippet_version=2`
  if (!document.getElementById('LeadiDscript_campaign')) {
    document.body.appendChild(s)
  }
})
