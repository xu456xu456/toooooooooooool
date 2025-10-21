\
    /*! hreflang-canonical.js (GoToolOnline multi-language SEO helper)
     *  - Adds full hreflang alternates (x-default + 9 locales)
     *  - Adds self-referencing canonical (keeps ?lang= when present)
     *  - Normalizes path (strip index.html, ensure trailing slash)
     *  - Sets <html lang> and dir for ar
     *  - Rewrites internal links to carry current ?lang= (optional, enabled)
     */
    (function(){
      // --- Config ---
      var LANG_MAP = {
        "":    "x-default",
        "en":  "en",
        "zh":  "zh-CN",
        "ph":  "fil",
        "id":  "id",
        "vi":  "vi",
        "bn":  "bn",
        "ng":  "en-NG",
        "sw":  "sw",
        "ar":  "ar"
      };
      var REWRITE_INTERNAL_LINKS = true; // keep current ?lang= on internal links

      // Detect site origin. Prefer explicit global override if provided.
      var SITE = (typeof window.HRE_CAN_SITE_ORIGIN === "string" && window.HRE_CAN_SITE_ORIGIN)
        ? window.HRE_CAN_SITE_ORIGIN.replace(/\/+$/,'')
        : (location.origin || (location.protocol + '//' + location.host));

      // Normalize path: strip trailing 'index.html' and ensure leading and trailing '/'
      var path = location.pathname.replace(/index\.html?$/i,'');
      if (!path.endsWith('/')) path += '/';
      if (!path.startsWith('/')) path = '/' + path;

      var url = new URL(location.href);
      var curLang = url.searchParams.get('lang') || '';

      // Remove any pre-existing canonical/alternate(hreflang) to avoid duplicates
      try {
        document.querySelectorAll('link[rel="canonical"]').forEach(function(n){ n.parentNode.removeChild(n); });
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function(n){ n.parentNode.removeChild(n); });
      } catch(e){}

      var head = document.getElementsByTagName('head')[0] || document.documentElement;

      // Insert full hreflang set
      Object.keys(LANG_MAP).forEach(function(param){
        var l = document.createElement('link');
        l.setAttribute('rel','alternate');
        l.setAttribute('hreflang', LANG_MAP[param]);
        var href = SITE + path + (param ? ('?lang=' + encodeURIComponent(param)) : '');
        l.setAttribute('href', href);
        head.appendChild(l);
      });

      // Self-canonical (keep current lang param if present)
      var canonicalHref = SITE + path + (curLang ? ('?lang=' + encodeURIComponent(curLang)) : '');
      var can = document.createElement('link');
      can.setAttribute('rel','canonical');
      can.setAttribute('href', canonicalHref);
      head.appendChild(can);

      // Set <html lang> and dir
      try {
        var html = document.documentElement;
        html.setAttribute('lang', LANG_MAP[curLang] || 'en');
        html.setAttribute('dir', curLang === 'ar' ? 'rtl' : 'ltr');
      } catch(e){}

      // Rewrite internal links to carry current lang
      if (REWRITE_INTERNAL_LINKS && curLang) {
        try {
          var anchors = document.querySelectorAll('a[href]');
          anchors.forEach(function(a){
            // Only same-origin links (avoid external)
            var href = a.getAttribute('href');
            // Ignore hash-only links and javascript: links
            if (!href || href.startsWith('#') || /^javascript:/i.test(href)) return;

            var u;
            try { u = new URL(href, location.href); } catch(e) { return; }
            if (u.origin !== location.origin) return;

            // Only rewrite site-relative paths
            if (!u.pathname.startsWith('/')) return;

            // Respect existing lang parameter
            if (!u.searchParams.has('lang')) {
              u.searchParams.set('lang', curLang);
              // Normalize: ensure trailing slash on path for clean URLs
              u.pathname = u.pathname.replace(/index\.html?$/i,'');
              if (!u.pathname.endsWith('/')) u.pathname += '/';
              a.setAttribute('href', u.pathname + (u.search || '') + (u.hash || ''));
            }
          });
        } catch(e){}
      }
    })();
