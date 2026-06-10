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
    // Server-only — never exposed to the browser
    cakeApiUrl: process.env.CAKE_API_URL,
    ckmKeyDefault: process.env.CKM_KEY_DEFAULT,
    ckmKeyPid1921: process.env.CKM_KEY_PID1921,
    ckmCampaignDefault: process.env.CKM_CAMPAIGN_DEFAULT || '153',
    ckmCampaignPid1921: process.env.CKM_CAMPAIGN_PID1921 || '154',
    lpCampaignId: process.env.LP_CAMPAIGN_ID || '31680',
    lpSupplierId: process.env.LP_SUPPLIER_ID || '99361',
    lpKey: process.env.LP_KEY_DEFAULT,
    lpKeyPid1921: process.env.LP_KEY_PID1921,
    ringbaApiUrl: process.env.RINGBA_API_URL,
    maPlacementDefault: process.env.MA_PLACEMENT_DEFAULT,
    maPlacementPid1921: process.env.MA_PLACEMENT_PID1921,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    // Public — safe to expose to the browser
    public: {
      gtagId: process.env.GTAG_ID,
      trustedformAccountId: process.env.TRUSTEDFORM_ACCOUNT_ID,
      jornayaAccountId: process.env.JORNAYA_ACCOUNT_ID,
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
        // TrustedForm — captures cert URL into hidden input
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
        // Jornaya LeadID
        {
          innerHTML: `(function() {
  var s = document.createElement('script');
  s.id = 'LeadiDscript_campaign';
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//create.lidstatic.com/campaign/JORNAYA_ACCOUNT_ID.js?snippet_version=2';
  var LeadiDscript = document.getElementById('LeadiDscript_campaign');
  if (!LeadiDscript) { document.body.appendChild(s); }
})();`,
          type: 'text/javascript',
        },
      ],
    },
  },
})
