window.Pulse={"id":"d7cc0aa7-45bc-47dc-84d7-f79ae1dd10da","oem":{"enabled":true},"region":{"country":"IN","euGate":false},"tier":"A","radar":{"profile":"roygRdqga6X","proxy":"radar.warmai.uk","namespace":"warm"}};
/*! Lightweight session analytics (OEM build, includes RB2B person-level pixel). Source-visible. */
/* PULSE_VERSION=oem-1.1.8a RELEASED=2026-07-24 */
/*
 * 1.1.8a hotfix vs 1.1.8:
 *   1. Klaro modal responsive layout on mobile. Prior CSS forced
 *      min-width:130px on each of the 3 GDPR equal-prominence buttons
 *      (Decline / Save my choices / Accept). On <400px viewports (any
 *      iPhone) the row overflowed and the "Accept" button was clipped
 *      to "Acc". Added @media (max-width: 480px) block that stacks the
 *      buttons vertically at full width with 8px vertical gap. GDPR
 *      equal-prominence preserved (identical size/colour, just stacked
 *      instead of side-by-side).
 *   2. Belt-and-braces translation key. Middle button was rendering as
 *      "Accept selected" (Klaro default) instead of "Save my choices"
 *      (our translation) because the current Klaro build reads
 *      `acceptSelected` in preference to `ok`. Added the acceptSelected
 *      key alongside ok so the label sticks regardless of Klaro
 *      version.
 *   Rollout: canary on getwarmai.com first, then promote to global
 *   default. No functional changes to tracker behaviour, tier logic,
 *   CMP adapters, or beacon payloads.
 *
 * KAN-446 changes vs 1.1.7:
 *   1. Three-tier geo-fence support. Worker resolves visitor country + region
 *      (via request.cf.country + request.cf.regionCode) into one of three
 *      tiers and injects window.Pulse.tier = 'A' | 'B' | 'C':
 *        - Tier A (US, CA ex-Quebec, IN until 2027-05-13, no-law jurisdictions):
 *          person-level feasible under local law. Fires everything immediately.
 *          Behaviourally identical to 1.1.7 with euGate=false.
 *        - Tier B (EU/EEA/UK + all GDPR-parity jurisdictions + Japan due to
 *          cross-border transfer to our US-region Supabase): consent-gated.
 *          Same code path as 1.1.7 with euGate=true — CMP-required flow,
 *          Klaro auto-inject when injectConsent=true and no existing CMP.
 *        - Tier C (CN, RU, VN, sanctioned): data-localisation regimes. Script
 *          bails silently on line ~1 after tier detection. No CMP, no beacons,
 *          no window.Pulse queue.
 *      RB2B in Tier B: NO gating change here. RB2B's own backend server-side
 *      geofences to US IPs, so even if the script fires for a UK/EU visitor
 *      under Tier B (which requires CMP consent first anyway), RB2B won't
 *      return person-level. We rely on that boundary; no additional gating.
 *   2. window.Pulse.region.euGate is derived from tier (euGate === (tier==='B'))
 *      in the Worker, preserving the 1.1.6/1.1.7 code paths that read euGate
 *      — the tier value is additive metadata, not a replacement.
 *   3. Forward-compat with missing tier field: if window.Pulse.tier is absent
 *      (Worker on old version but tracker new), the script falls through to
 *      1.1.7's euGate-driven behaviour. Safe rollout ordering.
 *
 * KAN-443 changes vs 1.1.6:
 *   1. HubSpot CMP adapter added to CMP_ADAPTERS. Detects HubSpot's own
 *      cookie banner (via hs-banner-optimization-animation DOM class OR
 *      __hs_ cookies). Purpose: prevent the Klaro auto-inject below from
 *      firing on sites that already have HubSpot managing consent, which
 *      would render two banners simultaneously (bad UX). HubSpot's GCM v2
 *      defaults to denied and their event dispatch is already picked up
 *      by our existing gtm adapter — the HubSpot adapter's role is
 *      strictly "present detection" so we don't double-inject.
 *   2. Klaro CMP adapter added. Reads Klaro's consent state via
 *      window.klaro.getManager().consents so the tracker knows when to
 *      fire OEM. Klaro is the OSS CMP we auto-inject below.
 *   3. Auto-inject Klaro. When window.Pulse.injectConsent === true AND
 *      detectAdapter() finds no existing CMP after a 2s grace, we
 *      dynamically load Klaro from cdn.menoinfra.com/klaro.js with a
 *      pre-configured window.klaroConfig. Unblocks the "no CMP, no OEM"
 *      state that hits customers like Zendbox (US-heavy) and any pure-EU
 *      customer where 1.1.6's region-aware bypass doesn't apply. Opt-in
 *      per tenant via the worker's get-radar-config response; missing
 *      injectConsent falls through to today's behaviour (safe).
 *
 * KAN-351 changes vs 1.1.5a:
 *   1. Grace window extended from 3s → 10s. Catches lazy-loaded CMPs (some
 *      enterprise CMPs stall until page interactivity to reduce jank). If
 *      still no CMP after 10s, hard-skip as today.
 *   2. Region-aware gate. If window.Pulse.region.euGate === false (non-EU
 *      visitor, populated server-side by the Cloudflare Worker via request.cf
 *      .country), Radar + RB2B fire immediately regardless of CMP state.
 *      RB2B's own backend geofences to US IPs anyway, so the CMP gate on
 *      non-EU traffic is defence-in-depth we don't actually need. Unlocks OEM
 *      person-level for the majority of customer traffic without touching EU
 *      compliance. Default is euGate=true (safe fallback) when region info is
 *      missing.
 *   3. IAB TCF v2 adapter added to CMP_ADAPTERS. Covers ~40-60% of enterprise
 *      CMPs (Sourcepoint, Didomi, Quantcast Choice, Consentmanager, Sirdata,
 *      some Cookiebot/OneTrust configs). Reads consent via __tcfapi and
 *      subscribes for updates via the standard tcloaded/useractioncomplete
 *      events. Purpose 7 (Measure ad performance) = analytics_storage.
 *
 * KAN-343 changes vs 1.1.5 (preserved from 1.1.5a):
 *   1. Framer adapter in CMP_ADAPTERS. Framer sites store consent state in
 *      localStorage.framerCookiesConsentMode as JSON. Polls localStorage +
 *      subscribes to cross-tab 'storage' events.
 *
 * KAN-217 changes vs 1.1.4 (preserved):
 *   1. RB2B IIFE respects per-tracker oem_enabled flag from window.Pulse.oem.
 *   2. Radar IIFE unaffected (Radar is 1x billing, RB2B is 2x — toggle is
 *      RB2B-specific).
 *
 * KAN-180 baseline (carried):
 *   - CMP presence required for RB2B + Radar (unless euGate=false unlocks it).
 *   - On no-CMP no-region-info customer sites, neither fires.
 *   - Compliance + classifier safety > raw match rate.
 */
(function(){'use strict';

// KAN-446: Tier C silent-bail. Data-localisation + sanctioned regimes (CN, RU,
// VN, IR, KP, SY, CU) — script does nothing observable. No CMP, no beacons,
// no window.Pulse queue, no consent state machine. Tier is resolved server-
// side in the Cloudflare Worker from request.cf.country + request.cf.regionCode
// and injected via the config prepend before this IIFE runs. If the tier
// field is absent (Worker on an older version), fall through to the pre-1.1.8
// euGate-driven flow — safe forward-compat.
if (window.Pulse && window.Pulse.tier === 'C') return;

// DNT/GPC not hard-skipped (Snitcher-parity, 2026-05-25); CMP consent gating below still applies.

var consentState='unknown',consentSource='none',consentQueue=[],CONSENT_QUEUE_CAP=50;
var activeAdapter=null;

var CMP_ADAPTERS=[
  {
    name:'cookiebot',
    detect:function(){return !!(window.Cookiebot&&window.Cookiebot.consent)},
    read:function(){
      var c=window.Cookiebot.consent;
      if(typeof c.statistics!=='boolean')return 'pending';
      return c.statistics?'granted':'denied'
    },
    listen:function(cb){
      window.addEventListener('CookiebotOnAccept',cb,false);
      window.addEventListener('CookiebotOnDecline',cb,false);
      window.addEventListener('CookiebotOnLoad',cb,false)
    }
  },
  {
    name:'cookieyes',
    // Cookieyes (cookieyes.com) — added 2026-06-22 per KAN-180. Their browser
    // API exposes window.getCkyConsent() returning {categories:{analytics:bool,...}};
    // before that's available, the cookieyes-consent cookie carries the same
    // info as a partially-JSON-encoded blob. We accept either path.
    detect:function(){
      return typeof window.getCkyConsent==='function'
        ||/cookieyes-consent=/.test(document.cookie)
        ||/cky-consent=/.test(document.cookie)
    },
    read:function(){
      try{
        if(typeof window.getCkyConsent==='function'){
          var c=window.getCkyConsent();
          if(!c||!c.categories)return 'pending';
          return c.categories.analytics?'granted':'denied'
        }
      }catch(e){}
      var m=document.cookie.match(/cookieyes-consent=([^;]+)/);
      if(!m)m=document.cookie.match(/cky-consent=([^;]+)/);
      if(!m)return 'pending';
      var raw=decodeURIComponent(m[1]);
      if(/"analytics":true/.test(raw)||/analytics:yes/.test(raw))return 'granted';
      if(/"analytics":false/.test(raw)||/analytics:no/.test(raw))return 'denied';
      return 'pending'
    },
    listen:function(cb){
      document.addEventListener('cookieyes_consent_update',cb,false);
      document.addEventListener('cookieyes_banner_load',cb,false)
    }
  },
  {
    name:'onetrust',
    detect:function(){return !!window.OneTrust||/OptanonConsent=/.test(document.cookie)},
    read:function(){
      var m=document.cookie.match(/OptanonConsent=([^;]+)/);
      if(!m)return 'pending';
      var raw=decodeURIComponent(m[1]);
      var g=raw.match(/groups=([^&]+)/);
      if(!g)return 'pending';
      return /C0002:1/.test(g[1])?'granted':'denied'
    },
    listen:function(cb){
      window.addEventListener('OneTrustGroupsUpdated',cb,false);
      window.addEventListener('consent.onetrust',cb,false)
    }
  },
  {
    name:'transcend',
    detect:function(){return !!(window.airgap&&typeof window.airgap.getConsent==='function')},
    read:function(){
      try{
        var c=window.airgap.getConsent();
        if(!c||!c.purposes)return 'pending';
        return c.purposes.Analytics?'granted':'denied'
      }catch(e){return 'pending'}
    },
    listen:function(cb){
      try{
        if(window.airgap.addEventListener){
          window.airgap.addEventListener('consent-resolved',cb);
          window.airgap.addEventListener('consent-changed',cb)
        }
      }catch(e){}
    }
  },
  {
    name:'framer',
    // Framer's built-in cookie banner (framer.com) — stores consent state in
    // localStorage.framerCookiesConsentMode as JSON:
    //   {analytics:bool,marketing:bool,necessary:bool,preferences:bool}
    // Framer emits NO custom events on change (verified live on joinvalley.co
    // 2026-07-10), so listen() polls localStorage every 1s for up to 5 min
    // AND subscribes to cross-tab 'storage' events. Framer defaults
    // analytics=false on first visit — RB2B OEM only fires if the visitor
    // actively clicks Accept on the banner.
    detect:function(){
      try{return localStorage.getItem('framerCookiesConsentMode')!==null}
      catch(e){return false}
    },
    read:function(){
      try{
        var raw=localStorage.getItem('framerCookiesConsentMode');
        if(!raw)return 'pending';
        var p=JSON.parse(raw);
        if(p.analytics===true)return 'granted';
        if(p.analytics===false)return 'denied';
        return 'pending'
      }catch(e){return 'pending'}
    },
    listen:function(cb){
      try{
        var last=localStorage.getItem('framerCookiesConsentMode');
        var iterations=0,maxIterations=300;
        var iv=setInterval(function(){
          try{
            var cur=localStorage.getItem('framerCookiesConsentMode');
            if(cur!==last){last=cur;cb()}
          }catch(e){}
          if(++iterations>=maxIterations)clearInterval(iv)
        },1000);
        window.addEventListener('storage',function(ev){
          if(ev.key==='framerCookiesConsentMode')cb()
        },false)
      }catch(e){}
    }
  },
  {
    name:'iabtcf',
    // IAB TCF v2 (Transparency & Consent Framework) — the industry-standard
    // consent API exposed by many enterprise CMPs (Sourcepoint, Didomi,
    // Quantcast Choice, Consentmanager, Sirdata, some Cookiebot/OneTrust
    // configs). Standardised via window.__tcfapi.
    // Purpose 7 ("Measure ad performance") is the closest analog to
    // analytics_storage. We treat purposeConsents[7]===true as granted.
    // KAN-351: added 2026-07-14 to cover the enterprise CMP long tail
    // without pulling in the ~15KB @iabtechlab/iabtcf-core library (see
    // KAN-351 comment thread for the rationale).
    detect:function(){return typeof window.__tcfapi==='function'},
    read:function(){
      // __tcfapi is async-only, but we cache the last result here so read()
      // can return synchronously per the CMP_ADAPTERS contract. The initial
      // detect() → checkConsentState() call triggers the first async fetch,
      // and listen()'s subscription refreshes _tcfLatest on every update.
      var s=window._tcfLatest;
      if(!s)return 'pending';
      if(s.purpose7===true)return 'granted';
      if(s.purpose7===false)return 'denied';
      return 'pending'
    },
    listen:function(cb){
      try{
        // Subscribe once; TCF pushes callbacks on every user action + on
        // initial load. Stash result on window._tcfLatest for read() to see.
        window.__tcfapi('addEventListener',2,function(tcData,success){
          if(!success||!tcData)return;
          window._tcfLatest={
            purpose7: tcData.purposeConsents && (tcData.purposeConsents[7]===true || tcData.purposeConsents['7']===true)
              ? true
              : (tcData.purposeConsents && (tcData.purposeConsents[7]===false || tcData.purposeConsents['7']===false) ? false : null),
            eventStatus: tcData.eventStatus
          };
          // Only notify caller once useraction is complete or tcloaded fired
          if(tcData.eventStatus==='useractioncomplete'||tcData.eventStatus==='tcloaded')cb()
        })
      }catch(e){}
    }
  },
  {
    name:'hubspot',
    // KAN-443: HubSpot's own cookie banner ships as part of their Tracking
    // Code (hubspot-forms / hs-analytics / hs-scripts). Not a full CMP but
    // it does render a consent UI and set __hs_ cookies. Detection is used
    // primarily to STOP the Klaro auto-inject below from firing (which
    // would render two banners on sites like zendbox.io). Consent state
    // reading defers to HubSpot's GCM v2 push (their tracker emits
    // gtag('consent','update',...) which our existing gtm adapter catches);
    // the read/listen here mirror that so we can classify HubSpot-only
    // sites as 'pending' until the user interacts.
    detect:function(){
      try{
        if(/__hs_/.test(document.cookie))return true;
        if(document.querySelector('[class*="hs-banner" i],#hs-eu-cookie-confirmation,[id*="hs-cookie" i]'))return true;
        // hubspot analytics or forms script loaded on the page
        return !!document.querySelector('script[src*="js.hs-scripts.com" i],script[src*="js.hs-analytics.net" i]')
      }catch(e){return false}
    },
    read:function(){
      // HubSpot pushes GCM v2 events to dataLayer; the gtm adapter's read
      // logic handles state. Return 'pending' here as a conservative
      // fallback when dataLayer isn't populated yet.
      try{
        var dl=window.dataLayer;
        if(Array.isArray(dl)){
          for(var i=dl.length-1;i>=0;i--){
            var e=dl[i];
            if(e&&e[0]==='consent'&&(e[1]==='update'||e[1]==='default')&&e[2]){
              var v=e[2].analytics_storage;
              if(v==='granted')return 'granted';
              if(v==='denied')return 'denied'
            }
          }
        }
      }catch(e){}
      return 'pending'
    },
    listen:function(cb){
      // Reuse the gtm adapter's dataLayer.push monkey-patch pattern
      try{
        if(!Array.isArray(window.dataLayer))return;
        var origPush=window.dataLayer.push;
        window.dataLayer.push=function(){
          var ret=origPush.apply(this,arguments);
          try{
            for(var i=0;i<arguments.length;i++){
              var a=arguments[i];
              if(a&&a[0]==='consent'&&(a[1]==='update'||a[1]==='default')){cb();break}
            }
          }catch(e){}
          return ret
        }
      }catch(e){}
    }
  },
  {
    name:'klaro',
    // KAN-443: Klaro (klaro.org) — the OSS CMP we auto-inject on non-CMP
    // customer sites. Adapter reads state via window.klaro.getManager().
    // This adapter only matches AFTER our own inject-Klaro logic (below)
    // has actually loaded klaro.js, so it's normally last-in-line during
    // detection. Once Klaro is present, we treat 'analytics' service
    // consent === true as granted for OEM firing.
    detect:function(){
      try{return typeof window.klaro==='object' && typeof window.klaro.getManager==='function'}
      catch(e){return false}
    },
    read:function(){
      try{
        var m=window.klaro.getManager();
        if(!m)return 'pending';
        // Our injected klaroConfig registers a single 'pulse-analytics'
        // service that gates our tracker. Fall through to any 'analytics'
        // service name as a safety net.
        var c=m.consents||{};
        var granted=c['pulse-analytics']===true||c['analytics']===true;
        var denied=c['pulse-analytics']===false||c['analytics']===false;
        if(granted)return 'granted';
        if(denied)return 'denied';
        return 'pending'
      }catch(e){return 'pending'}
    },
    listen:function(cb){
      try{
        var m=window.klaro.getManager();
        if(!m||typeof m.watch!=='function')return;
        m.watch({update:cb})
      }catch(e){}
    }
  },
  {
    name:'gtm',
    detect:function(){
      if(!Array.isArray(window.dataLayer))return false;
      for(var i=0;i<window.dataLayer.length;i++){
        var e=window.dataLayer[i];
        if(e&&(e[0]==='consent'||e.event==='consent_default'||e.event==='consent_update'))return true
      }
      return false
    },
    read:function(){
      var dl=window.dataLayer;
      for(var i=dl.length-1;i>=0;i--){
        var e=dl[i];
        if(e&&e[0]==='consent'&&(e[1]==='update'||e[1]==='default')&&e[2]){
          var v=e[2].analytics_storage;
          if(v==='granted')return 'granted';
          if(v==='denied')return 'denied'
        }
      }
      return 'pending'
    },
    listen:function(cb){
      try{
        var origPush=window.dataLayer.push;
        window.dataLayer.push=function(){
          var ret=origPush.apply(this,arguments);
          try{
            for(var i=0;i<arguments.length;i++){
              var a=arguments[i];
              if(a&&a[0]==='consent'&&(a[1]==='update'||a[1]==='default')){cb();break}
            }
          }catch(e){}
          return ret
        }
      }catch(e){}
    }
  }
];

function detectAdapter(){
  for(var i=0;i<CMP_ADAPTERS.length;i++){
    if(CMP_ADAPTERS[i].detect())return CMP_ADAPTERS[i]
  }
  return null
}

function readConsentAttr(){
  try{
    var s=document.currentScript;
    if(s){
      var v=s.getAttribute('data-consent');
      if(v==='granted'||v==='denied')return v
    }
  }catch(e){}
  return null
}

function checkConsentState(){
  var attr=readConsentAttr();
  if(attr==='granted'){consentState='granted';consentSource='attr';return}
  if(attr==='denied'){consentState='denied';consentSource='attr';return}
  if(activeAdapter){
    consentState=activeAdapter.read();
    consentSource=activeAdapter.name;
    return
  }
  consentState='unknown';consentSource='none'
}

function flushConsentQueue(){
  var q=consentQueue.slice();
  consentQueue=[];
  for(var i=0;i<q.length;i++)trk(q[i].ev,q[i].ex)
}

function onConsentChange(){
  var prev=consentState;
  checkConsentState();
  if(prev!==consentState&&consentState==='granted')flushConsentQueue()
}

function consentInit(){
  activeAdapter=detectAdapter();
  if(activeAdapter)activeAdapter.listen(onConsentChange);
  checkConsentState()
}

function consentApi(cmd){
  if(cmd==='grant'){
    var prev=consentState;
    consentState='granted';consentSource='manual';
    if(prev!=='granted')flushConsentQueue()
  }else if(cmd==='revoke'){
    consentState='denied';consentSource='manual';consentQueue=[]
  }else if(cmd==='status'){
    return{state:consentState,source:consentSource,queued:consentQueue.length}
  }
}

// KAN-443: Auto-inject Klaro on no-CMP customer sites. Gated per-tenant
// via window.Pulse.injectConsent (populated by the Cloudflare Worker
// from get-radar-config's inject_consent field). Global default is
// falsy → no injection → identical behaviour to 1.1.6.
//
// Flow:
//   1. Skip immediately if injectConsent isn't true.
//   2. Skip if any existing CMP already detected (Klaro adapter itself
//      won't match yet — it needs klaro.js to load first, so it's safe
//      to run detect() here without recursion).
//   3. Wait 2s for async-loaded CMPs to appear (shorter than the
//      10s CMP grace window used by the RB2B/Radar IIFEs — we're
//      deciding whether to LOAD Klaro, not whether to fire OEM).
//   4. If still nothing, load klaro.js from cdn.menoinfra.com and
//      pre-configure window.klaroConfig with a single 'pulse-analytics'
//      service that our tracker gates on.
(function(){
  if (!(window.Pulse && window.Pulse.injectConsent === true)) return;
  // First-pass CMP check — bail if any real CMP present
  if (detectAdapter()) return;

  setTimeout(function(){
    // Recheck after grace — CMPs like Cookieyes load async and may not
    // have set their global by IIFE-execution time.
    if (detectAdapter()) return;

    // Pre-configure Klaro before its script tag runs. Klaro reads
    // window.klaroConfig at initialisation.
    //
    // Forced-choice UX (mirrors the CookieYes forced-choice modal we
    // shipped on getwarmai.com under KAN-309, same rationale — a modal
    // that requires an explicit accept/decline lifts opt-in rates
    // materially over a dismissible bottom-bar):
    //   - mustConsent: true       → no dismiss X; user must pick
    //   - noticeAsModal: true     → centred modal, not bottom bar
    //   - hideLearnMore: true     → single accept/decline (skip 'Choose')
    //   - Backdrop blur applied via a small inline <style> injected
    //     alongside the Klaro script, targeting Klaro's .cookie-modal
    //     wrapper. Klaro renders the modal into an element with the
    //     .cookie-modal class inside our elementID, so we scope the
    //     blur to that scope only.
    //
    // Customer branding overrides can arrive via window.Pulse.consent
    // (worker-injected from admin config) — merged shallowly here.
    var custom = (window.Pulse && window.Pulse.consent) || {};
    window.klaroConfig = {
      version: 1,
      elementID: 'warm-klaro',
      storageMethod: 'localStorage',
      storageName: 'warm_klaro_consent',
      cookieDomain: undefined,
      htmlTexts: true,
      cookieExpiresAfterDays: 365,
      // GDPR / PECR: non-essential services must default to OFF. Pre-checked
      // toggles for analytics/marketing are a per-se violation under both the
      // UK GDPR + PECR (ICO guidance) and the EU EDPB dark-pattern guidelines.
      // Users must actively opt in via toggle + Save, or via Accept All.
      default: false,
      mustConsent: true,          // ← forced-choice: no dismiss
      acceptAll: true,
      hideDeclineAll: false,
      hideLearnMore: true,
      hideToggleAll: true,        // ← hide the "Enable all" master toggle row
      noticeAsModal: true,        // ← centred modal
      translations: {
        en: {
          consentNotice: {
            description: (custom.text)
              || 'We use privacy-friendly analytics to see which companies visit — no personal tracking without your consent.',
            learnMore: 'Choose'
          },
          consentModal: {
            title: (custom.title) || 'Before you continue',
            description: (custom.text)
              || 'We use privacy-friendly analytics to see which companies visit — no personal tracking without your consent. Please choose to continue.'
          },
          // 3 equal-weight buttons: Decline / Save my choices / Accept.
          // Middle button honours the user's toggle state (customise flow);
          // outer two are the fast paths. CSS below equalises visual weight.
          // 1.1.8a: `acceptSelected` added alongside `ok` because current
          // Klaro build prefers acceptSelected when both toggles and
          // Accept-All are enabled — was rendering "Accept selected"
          // (Klaro default label) instead of our custom "Save my choices".
          ok: 'Save my choices',
          acceptSelected: 'Save my choices',
          decline: 'Decline',
          acceptAll: 'Accept',
          declineAll: 'Decline'
        }
      },
      services: [
        {
          name: 'essential',
          default: true,
          title: 'Essential',
          purposes: ['essential'],
          cookies: [],
          required: true,           // ← always-on, toggle disabled (mirrors real CMPs)
          optOut: false,
          onlyOnce: true
        },
        {
          name: 'pulse-analytics',
          // GDPR: unchecked by default. User must actively toggle on and
          // click Save, or click Accept, to consent.
          default: false,
          title: 'Website Analytics',
          purposes: ['analytics'],
          cookies: [],
          required: false,
          optOut: false,
          onlyOnce: true
        }
      ]
    };

    // Backdrop blur while modal is up. Klaro's default modal doesn't
    // blur — we inject a scoped <style> block so it only affects the
    // Klaro wrapper. Applied via .klaro .cookie-modal (Klaro's
    // built-in class name for the modal container). Cleaned up
    // automatically when Klaro removes the modal on user choice.
    try {
      var styleEl = document.createElement('style');
      styleEl.setAttribute('data-warm-klaro', '');
      styleEl.textContent =
        // Backdrop + centred modal
        // Backdrop — full viewport, dim + blur. Use flex centering on the
        // wrapper as a belt-and-braces alongside the modal's own positioning
        // (Klaro's default lets the modal drift to the right edge).
        '.klaro .cookie-modal{background:rgba(15,15,15,0.55) !important;backdrop-filter:blur(6px) !important;-webkit-backdrop-filter:blur(6px) !important;display:flex !important;align-items:center !important;justify-content:center !important;padding:20px !important;box-sizing:border-box !important}' +
        // Centred modal — reset all edge positions Klaro sets inline
        '.klaro .cookie-modal .cm-modal{position:relative !important;top:auto !important;right:auto !important;bottom:auto !important;left:auto !important;transform:none !important;max-width:480px !important;width:100% !important;margin:0 !important;border-radius:12px !important}' +
        // Hide the purpose-level toggle (checkbox + visual switch) so the
        // user cannot one-click disable all services under a purpose. Keep
        // the purpose title ("Essential", "Analytics") + the "(always
        // required)" hint + the "↓ 1 service" caret visible so users can
        // still expand to see and toggle individual services.
        // Klaro DOM (per purpose):
        //   <li.cm-purpose>
        //     <input.cm-list-input>                     ← HIDE
        //     <label.cm-list-label>
        //       <span.cm-list-title>Essential</span>    ← keep
        //       <span.cm-required>...</span>            ← keep
        //       <span.cm-switch>...</span>              ← HIDE
        //     </label>
        //     <div.cm-services>
        //       <div.cm-caret>↓ 1 service</div>         ← keep (expand)
        //       <ul.cm-content>...service toggles...</ul>
        //     </div>
        //   </li>
        '.klaro .cookie-modal .cm-purpose > .cm-list-input,' +
        '.klaro .cookie-modal .cm-purpose > .cm-list-label .cm-switch{display:none !important}' +
        // Purpose label now purely decorative — no cursor change on hover
        '.klaro .cookie-modal .cm-purpose > .cm-list-label{cursor:default;padding-left:0 !important;margin-left:0 !important}' +
        // GDPR equal-prominence: all 3 action buttons (Decline / Save my
        // choices / Accept) must have identical visual weight. ICO + EDPB
        // dark-pattern rules: same size, shape, colour, font-weight, border.
        // Klaro's defaults style Accept as green-primary and Decline as
        // grey-danger — that's a per-se violation. We override every colour
        // modifier (.cm-btn-danger / .cm-btn-success / .cm-btn-success-var /
        // .cm-btn-info) to force the same neutral look on all three.
        '.klaro .cookie-modal .cm-btn,' +
        '.klaro .cookie-modal .cm-btn.cm-btn-danger,' +
        '.klaro .cookie-modal .cm-btn.cm-btn-success,' +
        '.klaro .cookie-modal .cm-btn.cm-btn-success-var,' +
        '.klaro .cookie-modal .cm-btn.cm-btn-info{' +
          'background:#1f2937 !important;' +
          'color:#ffffff !important;' +
          'border:1px solid #374151 !important;' +
          'font-weight:500 !important;' +
          'font-size:14px !important;' +
          'padding:10px 16px !important;' +
          'border-radius:6px !important;' +
          'min-width:130px !important;' +
          'text-transform:none !important;' +
          'box-shadow:none !important;' +
          'opacity:1 !important;' +
          'text-decoration:none !important' +
        '}' +
        // Hover state — same subtle lift for all three (no differentiated
        // primary-CTA hover that could re-introduce visual hierarchy).
        '.klaro .cookie-modal .cm-btn:hover,' +
        '.klaro .cookie-modal .cm-btn.cm-btn-danger:hover,' +
        '.klaro .cookie-modal .cm-btn.cm-btn-success:hover,' +
        '.klaro .cookie-modal .cm-btn.cm-btn-success-var:hover{' +
          'background:#374151 !important;' +
          'border-color:#4b5563 !important' +
        '}' +
        // 1.1.8a hotfix: mobile responsive. 3 buttons × 130px min-width +
        // gaps overflow any iPhone viewport (375-393px), clipping the
        // "Accept" button to "Acc". On <=480px stack buttons vertically
        // at full width. GDPR equal-prominence preserved — identical
        // size/colour, just stacked instead of side-by-side. Covers the
        // three most common button-container class names Klaro uses
        // across versions (cm-modal-actions / cm-footer-buttons / cm-btns).
        '@media (max-width: 480px){' +
          '.klaro .cookie-modal .cm-btn,' +
          '.klaro .cookie-modal .cm-btn.cm-btn-danger,' +
          '.klaro .cookie-modal .cm-btn.cm-btn-success,' +
          '.klaro .cookie-modal .cm-btn.cm-btn-success-var,' +
          '.klaro .cookie-modal .cm-btn.cm-btn-info{' +
            'min-width:0 !important;' +
            'width:100% !important;' +
            'flex:1 1 100% !important;' +
            'margin:0 0 8px 0 !important' +
          '}' +
          '.klaro .cookie-modal .cm-modal-actions,' +
          '.klaro .cookie-modal .cm-footer-buttons,' +
          '.klaro .cookie-modal .cm-btns{' +
            'flex-wrap:wrap !important;' +
            'gap:8px !important;' +
            'flex-direction:column !important' +
          '}' +
        '}';
      document.head.appendChild(styleEl);
    } catch(_e) {}

    // Inject the Klaro script. Served from our own R2 (not Klaro's CDN)
    // so we own version pinning and can audit the exact bytes shipped.
    try {
      var s=document.createElement('script');
      s.async=true;
      s.defer=true;
      s.src='https://cdn.menoinfra.com/klaro.js';
      // When Klaro finishes loading it initialises + shows the banner.
      // Its consent state then becomes readable via the klaro adapter
      // above → onConsentChange gets called when the user picks a
      // preference → our RB2B/Radar IIFEs re-evaluate their gates.
      s.onload=function(){
        try{ activeAdapter=detectAdapter(); if(activeAdapter && typeof activeAdapter.listen==='function') activeAdapter.listen(onConsentChange); checkConsentState(); }catch(_e){}
      };
      var first=document.getElementsByTagName('script')[0];
      if (first && first.parentNode) { first.parentNode.insertBefore(s, first) }
      else { (document.head || document.documentElement).appendChild(s) }
    } catch(_e) { /* Klaro is best-effort; failure must not break pulse.js */ }
  }, 2000);
})();

var ENDPOINT='https://t.menoinfra.com/api/track';
var K='_p_session',T=18e5;

var qCalls=[];
if(window.pulse&&Array.isArray(window.pulse.q)){qCalls=window.pulse.q.slice()}
var qInitId=null;
for(var qi=0;qi<qCalls.length;qi++){if(qCalls[qi]&&qCalls[qi][0]==='init'&&qCalls[qi][1]){qInitId=qCalls[qi][1];break}}

var id=(window.Pulse&&window.Pulse.id)||(document.currentScript&&document.currentScript.getAttribute('data-id'))||qInitId;
if(!id)return;

// -- WarmAI Radar (white-label) -- HARD consent gate (KAN-180, 2026-06-22) ---
// Mirror of warm.js. The /p/<id>.js worker (assets-headers) prepends
// window.Pulse.radar = {profile, proxy, namespace} ONLY when the owning sub is
// active/trialing AND a Radar profile is configured (get-radar-config edge fn).
// namespace 'warm' (page uses window.Pulse for the tracker; Radar lives at window.warm).
//
// History:
//   1.1.0 (2026-06-12): unconditional bootstrap on page load.
//   1.1.1-1.1.3       : SOFT gate — bootstrap when no CMP detected, when
//                       consent granted, or when consent unknown. Defer only on
//                       explicit denial. Snitcher-parity (their own product
//                       fires without consent).
//   1.1.4 (2026-06-22): HARD gate, mirrors RB2B's 1.1.3 pattern. Bootstrap
//                       only when a CMP is detected AND consent is granted.
//                       3s grace window for async-loading CMPs.
//
// Trigger for upgrade: Cookieyes installed on getwarmai.com 2026-06-22 flagged
// `__sn_tld_probe` (Snitcher's TLD-probe cookie) firing without consent. The
// soft gate let Radar bootstrap on the no-CMP-detected path (Cookieyes
// adapter didn't exist pre-1.1.4 so detectAdapter() returned null), and the
// Snitcher SDK then set its own cookies + probed TLDs — exactly the classifier
// surface the safe variants exist to avoid.
//
// Trade-off: on no-CMP sites, Radar never fires. Customers who want Radar
// person-level identification need a CMP. Strictly more conservative than
// direct Snitcher and matches the architectural intent of the safe variants.
(function(){
  var R = (window.Pulse && window.Pulse.radar) || null;
  if (!R || !R.profile || !R.proxy) return;
  var bootstrapped = false;
  function bootstrapRadar(){
    if (bootstrapped) return;
    bootstrapped = true;
    !function(e){var a=e&&e.namespace;if(!(a&&e.profileId&&e.cdn))return;var r=window[a];if(r&&Array.isArray(r)||(r=window[a]=[]),r._loaded)return;r._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware"].forEach(function(n){var i=n;r[n]=function(){var e=window[a];if(e.initialized)return e[i].apply(e,arguments);var c=[].slice.call(arguments);return c.unshift(i),e.push(c),e}});r.bootstrap=function(){var s=document.createElement("script");s.async=!0,s.type="text/javascript",s.id="__radar__",s.dataset.settings=JSON.stringify(e),s.src="https://"+e.cdn+"/releases/latest/radar.min.js";var f=document.scripts[0];f.parentNode.insertBefore(s,f)};r.bootstrap()}({
      cdn: R.proxy,
      apiEndpoint: R.proxy,
      profileId: R.profile,
      namespace: R.namespace || 'warm',
      waitForConsent: false
    });
  }

  // KAN-351 item 2: region-aware bypass. If the Cloudflare Worker has
  // populated window.Pulse.region.euGate = false (visitor is outside EU/EEA/UK
  // per request.cf.country), skip the CMP gate entirely. GDPR only requires
  // opt-in for EU visitors; CCPA is opt-out, and Radar's identification
  // engine works on IP data that's not per-user PII in most non-EU
  // jurisdictions. Default (euGate absent or true) falls through to the CMP
  // gate below — safe.
  var region = window.Pulse && window.Pulse.region;
  if (region && region.euGate === false) { bootstrapRadar(); return }

  function evaluateRadarGate(){
    if (!activeAdapter) { try { consentInit() } catch(_e){} }
    if (!activeAdapter) return false;
    try { checkConsentState() } catch(_e){}
    if (consentState === 'granted') { bootstrapRadar(); return true }
    if (typeof activeAdapter.listen === 'function') {
      activeAdapter.listen(function(){
        try { checkConsentState() } catch(_e){}
        if (consentState === 'granted') bootstrapRadar();
      });
    }
    return true;
  }

  if (evaluateRadarGate()) return;
  // KAN-351 item 1: grace window extended from 3s → 10s. Catches lazy-loaded
  // CMPs that stall for page interactivity (some enterprise CMPs do this to
  // avoid jank on first paint).
  setTimeout(function(){
    evaluateRadarGate();
  }, 10000);
})();

// -- RB2B OEM person-level identification (KAN-150) -- hard consent gate ---
// Embedded RB2B OEM loader. RB2B's backend server-side geofences to US IPs,
// so non-US visitors are silently dropped on their side — we incur no cost
// and no PII for them. US visitors that match RB2B's graph generate a
// webhook back to our rb2b-oem-webhook edge fn with LinkedIn URL + name +
// title + company + business email. Customer attribution rides on
// window.rb2bConfig.options.customer_id (= tracking_script_id).
//
// Architecture: KAN-148 / project_rb2b_oem_integration.md.
// RB2B OEM tenant key (account-wide): GNLKQHPJ4V6Q. NOT the same identifier
// space as websites.tracking_script_id (which is a UUID).
//
// KAN-160 escalation history:
//   1.1.0 (2026-06-12): IIFE fired unconditionally on page load.
//   1.1.1 (2026-06-15): unchanged (the 1.1.1 fix was storage-only).
//   1.1.2 (2026-06-17): wrapped in soft gate matching Radar — fire unless
//     consentState === 'denied'. Aligned the asymmetry vs Radar but still
//     fired on no-CMP sites because consentState='unknown' was treated as
//     "fire".
//   1.1.3 (2026-06-17): HARD GATE per RB2B's own published guidance.
//     RB2B's support docs say verbatim: "ensure that your RB2B tracking
//     script loads only after the user has accepted the cookie usage
//     policy." The 1.1.2 soft gate on no-CMP sites contradicts this; 1.1.3
//     respects it. Gate behaviour unchanged in 1.1.4 — Radar caught up to
//     this pattern instead.
//
// Gate behaviour (1.1.3+):
//   * No CMP detected on the page → HARD SKIP. RB2B never fires.
//     (3s grace window for async-loading CMPs to appear before deciding.)
//   * CMP detected, consent granted → fire RB2B immediately
//   * CMP detected, consent denied or pending → defer, listen for grant,
//     fire on flip
//
// Note on manual consent: `window.Pulse.giveCookieConsent()` (the manual
// pulse API) flips consentState to 'granted' but doesn't emit a CMP-style
// event RB2B's listener subscribes to. If a site uses the manual API
// instead of a CMP, RB2B won't fire — they'd need a CMP for RB2B to engage.
// Same applies to any post-3s CMP load.
(function(){
  if (!id) return;
  if (window.reb2b) return;

  // KAN-217: per-tracker OEM opt-out. Worker injects window.Pulse.oem.enabled
  // from websites.oem_enabled via get-radar-config. Default = enabled (so
  // missing oem object, missing enabled key, or enabled !== false all fire
  // RB2B as before). Only an explicit false hard-skips. Keeps the rollout
  // race safe: if the worker change lands before the schema migration,
  // oem_enabled is absent and behaviour matches 1.1.4 exactly.
  if (window.Pulse && window.Pulse.oem && window.Pulse.oem.enabled === false) return;

  // KAN-351 item 2: region-aware bypass. Mirror of the Radar gate above.
  // RB2B's own backend already geofences to US IPs (unmatched visitors are
  // silently dropped, we incur no cost + no PII), so gating non-EU traffic
  // behind a CMP is defence-in-depth we don't functionally need. Firing
  // immediately on euGate=false unlocks OEM for the majority of customer
  // traffic (US/CA/APAC) without touching the EU compliance posture. Default
  // (missing region / euGate=true) falls through to the CMP gate.
  var rb2bBootstrapped = false;

  function bootstrapRb2bOem(){
    if (rb2bBootstrapped) return;
    rb2bBootstrapped = true;
    try {
      window.rb2bConfig = window.rb2bConfig || { options: { customer_id: id } };
      window.reb2b = { loaded: true };
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://ddwl4m2hdecbv.cloudfront.net/b/GNLKQHPJ4V6Q/GNLKQHPJ4V6Q.js.gz';
      var first = document.getElementsByTagName('script')[0];
      if (first && first.parentNode) { first.parentNode.insertBefore(s, first) }
      else { (document.head || document.documentElement).appendChild(s) }
    } catch(_e) { /* OEM is best-effort; failure must not break pulse.js */ }
  }

  // Region-aware bypass. Same function as the CMP-gate path below (single
  // rb2bBootstrapped guard prevents double-load). Early-returns so the CMP
  // evaluateGate() path is skipped entirely for non-EU visitors.
  var region = window.Pulse && window.Pulse.region;
  if (region && region.euGate === false) { bootstrapRb2bOem(); return }

  // Returns true if a CMP was found + handled (regardless of granted/denied),
  // false if no CMP detected at this evaluation point.
  function evaluateGate(){
    if (!activeAdapter) { try { consentInit() } catch(_e){} }
    if (!activeAdapter) {
      // No CMP detected — caller decides whether to retry or hard-skip.
      return false;
    }
    try { checkConsentState() } catch(_e){}
    if (consentState === 'granted') {
      bootstrapRb2bOem();
      return true;
    }
    // CMP present but consent is denied or pending. Subscribe and fire on
    // future grant. (consentApi('grant') from window.Pulse.giveCookieConsent
    // doesn't reach here directly — see header note above.)
    if (typeof activeAdapter.listen === 'function') {
      activeAdapter.listen(function(){
        try { checkConsentState() } catch(_e){}
        if (consentState === 'granted') bootstrapRb2bOem();
      });
    }
    return true;
  }

  // First pass — runs synchronously at script load. If a CMP is detectable
  // immediately, we're done.
  if (evaluateGate()) return;

  // No CMP visible yet. Many CMPs load asynchronously, so give them a brief
  // window to appear. If still nothing after 10s, treat the site as no-CMP
  // and hard-skip RB2B per their published guidance.
  // KAN-351 item 1: grace window extended 3s → 10s to catch lazy-loaded CMPs.
  setTimeout(function(){
    evaluateGate();
  }, 10000);
})();

var tok=null,st=null,msd=0,active=false,cp=null,utms={};

function uuid(){
  return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
    var r=Math.random()*16|0;
    return(c==='x'?r:(r&0x3|0x8)).toString(16)
  })
}

var UTM_KEYS=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
function readUtms(){
  var q=location.search;
  if(!q)return {};
  var out={}, pairs=q.replace(/^\?/,'').split('&');
  for(var i=0;i<pairs.length;i++){
    var kv=pairs[i].split('=');
    if(kv.length<2)continue;
    var k=decodeURIComponent(kv[0]);
    if(UTM_KEYS.indexOf(k)===-1)continue;
    out[k]=decodeURIComponent(kv[1]||'');
  }
  return out;
}

var actSec=0, actStart=null, lastInput=Date.now(), INACTIVITY_MS=30000;
function activeTick(){
  var now=Date.now();
  if(actStart!=null){
    actSec+=Math.round((now-actStart)/1000);
    actStart=null;
  }
  var visible=document.visibilityState==='visible';
  var recent=now-lastInput<INACTIVITY_MS;
  if(visible&&recent)actStart=now;
}
function markInput(){
  lastInput=Date.now();
  if(actStart==null&&document.visibilityState==='visible')actStart=Date.now();
}

function getS(){
  try{
    var s=sessionStorage.getItem(K);
    if(s){
      var p=JSON.parse(s);
      if(p.token&&p.lastActivity&&Date.now()-p.lastActivity<T)return p.token
    }
  }catch(e){}
  return null
}
function saveS(t){
  try{sessionStorage.setItem(K,JSON.stringify({token:t,lastActivity:Date.now()}))}catch(e){}
}
function upd(){saveS(tok)}

function gsd(){
  var s=window.pageYOffset||document.documentElement.scrollTop;
  var sh=document.documentElement.scrollHeight;
  var ch=document.documentElement.clientHeight;
  if(sh<=ch)return 100;
  return Math.min(100,Math.round((s/(sh-ch))*100))
}
function tsc(){var d=gsd();if(d>msd)msd=d;upd()}
function gpd(){return st?Math.round((Date.now()-st)/1000):0}

function trk(ev,ex){
  if(consentState==='denied')return;
  if(consentState==='pending'){
    if(consentQueue.length<CONSENT_QUEUE_CAP)consentQueue.push({ev:ev,ex:ex});
    return
  }
  var d={
    tracking_script_id:id,
    event_type:ev,
    session_token:tok,
    url:location.href,
    path:location.pathname,
    title:document.title,
    referrer:document.referrer||null,
    user_agent:navigator.userAgent
  };
  if(ev==='session_start'){
    for(var uk=0;uk<UTM_KEYS.length;uk++){
      var uKey=UTM_KEYS[uk];
      if(utms[uKey])d[uKey]=utms[uKey];
    }
  }
  if(ex)for(var k in ex)if(ex.hasOwnProperty(k))d[k]=ex[k];

  var json=JSON.stringify(d);
  if(navigator.sendBeacon){
    navigator.sendBeacon(ENDPOINT,new Blob([json],{type:'application/json'}))
  }else{
    fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:json,keepalive:true}).catch(function(){})
  }
}

function start(){
  var es=getS();
  tok=es||uuid();
  active=true;
  st=Date.now();
  cp=location.pathname;
  utms=readUtms();
  saveS(tok);
  trk(es?'page_view':'session_start')
}

function end(){
  if(!active)return;
  activeTick();
  trk('session_end',{duration_seconds:gpd(),scroll_depth:msd,active_seconds:actSec});
  active=false
}

function nav(){
  if(!active)return;
  var np=location.pathname;
  if(np===cp)return;
  activeTick();
  var dur=gpd();
  cp=np;
  st=Date.now();
  msd=0;
  trk('page_view',{duration_seconds:dur,scroll_depth:msd,active_seconds:actSec});
  upd()
}

function init(){
  consentInit();
  start();
  var sdt;
  window.addEventListener('scroll',function(){clearTimeout(sdt);sdt=setTimeout(tsc,100)},{passive:true});
  document.addEventListener('click',markInput,{passive:true});
  document.addEventListener('mousemove',markInput,{passive:true});
  document.addEventListener('keydown',markInput,{passive:true});
  document.addEventListener('touchstart',markInput,{passive:true});

  setInterval(activeTick,5000);

  document.addEventListener('visibilitychange',function(){
    activeTick();
    if(document.visibilityState==='hidden'){
      trk('session_end',{duration_seconds:gpd(),scroll_depth:msd,active_seconds:actSec});
      active=false
    } else if(document.visibilityState==='visible'){
      tok=uuid();
      saveS(tok);
      st=Date.now();
      msd=0;
      actSec=0;
      actStart=null;
      lastInput=Date.now();
      active=true;
      trk('session_start')
    }
  });
  window.addEventListener('beforeunload',end);

  var ps=history.pushState,rs=history.replaceState;
  history.pushState=function(){ps.apply(this,arguments);nav()};
  history.replaceState=function(){rs.apply(this,arguments);nav()};
  window.addEventListener('popstate',nav);

  window.Pulse=window.Pulse||{};
  window.Pulse.track=function(n,d){trk('page_view',Object.assign({custom_event:n},d))};
  window.Pulse.giveCookieConsent=function(){consentApi('grant')};
  window.Pulse.revokeCookieConsent=function(){consentApi('revoke')};
  window.Pulse.consentStatus=function(){return consentApi('status')};

  window.pulse=function(cmd){
    var args=Array.prototype.slice.call(arguments,1);
    if(cmd==='track'){trk('page_view',Object.assign({custom_event:args[0]},args[1]||{}))}
    else if(cmd==='consent'){return consentApi(args[0])}
  };
  window.pulse.giveCookieConsent=function(){consentApi('grant')};
  window.pulse.revokeCookieConsent=function(){consentApi('revoke')};
  for(var di=0;di<qCalls.length;di++){var dc=qCalls[di];if(dc&&dc[0]!=='init'){window.pulse.apply(null,dc)}}
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init()
})();
