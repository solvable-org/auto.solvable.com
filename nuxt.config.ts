export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],

  nitro: {
    // Switch to 'aws-lambda' when Anetto has the AWS environment ready
    preset: 'node-server',
  },

  runtimeConfig: {
    // Server-only secrets — override via NUXT_* env vars
    ckmKeyDefault: '',      // NUXT_CKM_KEY_DEFAULT
    ckmKeyPid1921: '',      // NUXT_CKM_KEY_PID1921
    lpKey: '',              // NUXT_LP_KEY
    lpKeyPid1921: '',       // NUXT_LP_KEY_PID1921
    googleMapsApiKey: '',   // NUXT_GOOGLE_MAPS_API_KEY
    // Public — override via NUXT_PUBLIC_* env vars
    public: {
      gtagId: '',           // NUXT_PUBLIC_GTAG_ID
    },
  },

  app: {
    head: {
      title: 'Auto Insurance Quotes | Solvable',
      meta: [
        { name: 'description', content: 'Compare auto insurance quotes and save.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
        // TrustedForm — captures cert URL into hidden input xxTrustedFormCertUrl
        {
          innerHTML: `(function() {
  var field = 'xxTrustedFormCertUrl';
  var tf = document.createElement('script');
  tf.type = 'text/javascript'; tf.async = true;
  tf.src = 'http' + ('https:' == document.location.protocol ? 's' : '') +
    '://api.trustedform.com/trustedform.js?field=' + field + '&ping_field=xxTrustedFormPingUrl&l=' +
    new Date().getTime() + Math.random();
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
})();`,
          type: 'text/javascript',
        },
        // Jornaya LeadID is loaded by app/plugins/compliance.client.ts
        // so we can inject the account ID from app.config at runtime.
      ],
    },
  },
})
