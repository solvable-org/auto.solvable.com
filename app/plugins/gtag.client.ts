// Loads Google Analytics and exposes window.gtag
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gtagId = config.public.gtagId as string | undefined

  if (!gtagId) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', gtagId)
})

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
