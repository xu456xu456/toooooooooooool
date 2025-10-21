
(function(){
  function getCookie(name){ return ('; '+document.cookie).split('; '+name+'=').pop().split(';')[0] || ''; }
  function pickLang(){
    const url = new URL(location.href);
    const q = (url.searchParams.get('lang') || '').toLowerCase();
    const cookieLang = (getCookie('lang') || '').toLowerCase();
    const langs = ['zh','en','ph','id','vi','bn','ng','sw','ar'];
    if (q && langs.includes(q)) return q;
    if (cookieLang && langs.includes(cookieLang)) return cookieLang;
    return 'en';
  }
  const _lang = pickLang();
  const LMAP = {
    zh: { title:'🌐 网络工具', ip:'IP 查询（IP Lookup）', dns:'DNS 检测（DNS Check）', speed:'网速测试（Speed Test）',
          ipDesc:'显示 IPv4/IPv6 与地理归属', dnsDesc:'并行测试多家 DoH 解析速度', speedDesc:'M-Lab ndt7 下载/上传/延迟' },
    en: { title:'🌐 Internet Tools', ip:'IP Lookup', dns:'DNS Check', speed:'Speed Test',
          ipDesc:'Show IPv4/IPv6 and geolocation', dnsDesc:'Parallel DoH resolver latency', speedDesc:'M-Lab ndt7 down/up/latency' },
    ph: { title:'🌐 Mga Tool sa Internet', ip:'IP Lookup', dns:'DNS Check', speed:'Speed Test',
          ipDesc:'Ipakita ang IPv4/IPv6 at lokasyon', dnsDesc:'Sabay-sabay na DoH latency test', speedDesc:'M-Lab ndt7 bilis at latency' },
    id: { title:'🌐 Alat Internet', ip:'IP Lookup', dns:'Pemeriksaan DNS', speed:'Tes Kecepatan',
          ipDesc:'Tampilkan IPv4/IPv6 & lokasi', dnsDesc:'Uji kecepatan DoH paralel', speedDesc:'M-Lab ndt7 unduh/unggah/latensi' },
    vi: { title:'🌐 Công cụ Internet', ip:'IP Lookup', dns:'Kiểm tra DNS', speed:'Kiểm tra tốc độ',
          ipDesc:'Hiển thị IPv4/IPv6 & vị trí', dnsDesc:'Đo độ trễ DoH song song', speedDesc:'M-Lab ndt7 tải xuống/lên/độ trễ' },
    bn: { title:'🌐 ইন্টারনেট টুল', ip:'IP Lookup', dns:'DNS পরীক্ষা', speed:'স্পিড টেস্ট',
          ipDesc:'IPv4/IPv6 ও অবস্থান দেখুন', dnsDesc:'DoH ল্যাটেন্সি সমান্তরাল পরীক্ষা', speedDesc:'M-Lab ndt7 ডাউন/আপ/ল্যাটেন্সি' },
    ng: { title:'🌐 Internet Tools', ip:'IP Lookup', dns:'DNS Check', speed:'Speed Test',
          ipDesc:'Show IPv4/IPv6 & location', dnsDesc:'Parallel DoH latency test', speedDesc:'M-Lab ndt7 down/up/latency' },
    sw: { title:'🌐 Zana za Mtandao', ip:'IP Lookup', dns:'Ukaguzi wa DNS', speed:'Jaribio la Kasi',
          ipDesc:'Onyesha IPv4/IPv6 na eneo', dnsDesc:'Jaribio la ucheleweshaji wa DoH', speedDesc:'M-Lab ndt7 kasi na ucheleweshaji' },
    ar: { title:'🌐 أدوات الإنترنت', ip:'IP Lookup', dns:'فحص DNS', speed:'اختبار السرعة',
          ipDesc:'عرض IPv4/IPv6 والموقع', dnsDesc:'اختبار زمن DoH بالتوازي', speedDesc:'M-Lab ndt7 تنزيل/رفع/زمن' }
  };
  const L = LMAP[_lang] || LMAP.en;

  function makeBlock(){
    const h2 = document.createElement('h2');
    h2.className = 'group';
    h2.textContent = L.title;
    const sec = document.createElement('section');
    sec.className = 'grid';
    const items = [
      { href:'/updatetool/tools/ip-lookup/index.html',  title:L.ip,    desc:L.ipDesc,    icon:'🌐' },
      { href:'/updatetool/networkandAI/tools/dns-check/index.html', title:L.dns,   desc:L.dnsDesc,   icon:'🧭' },
      { href:'/updatetool/networkandAI/tools/speed-test/index.html', title:L.speed, desc:L.speedDesc, icon:'⚡' }
    ];
    items.forEach(it=>{
      const a = document.createElement('a');
      a.className = 'tool internet';
      a.href = it.href + (location.search ? location.search : '');
      a.innerHTML = '<div class="icon" aria-hidden="true" style="font-size:22px">'+it.icon+'</div>' +
                    '<div class="meta"><h3>'+it.title+'</h3><p>'+it.desc+'</p></div>';
      sec.appendChild(a);
    });
    return {h2, sec};
  }

  function insertInternetTools(){
    const {h2, sec} = makeBlock();
    const groups = Array.from(document.querySelectorAll('h2.group'));
    const findByText = (elms, words) => elms.find(g => words.some(w => (g.textContent||'').toLowerCase().includes(w)));
    const converterWords = ['converter','converters','转换','konversi','chuyển đổi','تحويل','conversor','প্র转换','kubadilisha'];
    const timeWords      = ['time','时间','waktu','thời gian','وقت','tiempo','সময়','muda'];
    const convH2 = findByText(groups, converterWords);
    const timeH2 = findByText(groups, timeWords);
    if (timeH2 && timeH2.parentNode) {
      timeH2.parentNode.insertBefore(h2, timeH2);
      timeH2.parentNode.insertBefore(sec, timeH2);
    } else if (convH2 && convH2.parentNode) {
      const after = convH2.nextElementSibling && convH2.nextElementSibling.matches('section.grid')
        ? convH2.nextElementSibling : convH2;
      after.parentNode.insertBefore(h2, after.nextSibling);
      h2.parentNode.insertBefore(sec, h2.nextSibling);
    } else {
      const container = document.querySelector('main') || document.body;
      container.appendChild(h2);
      container.appendChild(sec);
    }
  }

  function setupEasterEggs(){
    const form = document.querySelector('form[role="search"], form#search, form[action*="search"]') || document.querySelector('form');
    const input = document.querySelector('input[type="search"], input[name="q"], input#search, input.search') || document.querySelector('input[type="text"]');
    if (!input) return;
    function normalize(v){ return (v||'').trim().toLowerCase(); }
    function showModal(gamePath){
      let modal = document.getElementById('game-modal');
      if (!modal) {
        modal = document.createElement('div'); modal.id='game-modal';
        modal.innerHTML = '<div style="position:fixed;inset:10% 10%;background:#0c1426;border:1px solid #2a3c64;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.5);display:flex;flex-direction:column;z-index:9999">'+
                          '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #223357;color:#eaf3ff"><strong>🎮 Game</strong><button id="game-close" style="background:#12213c;border:1px solid #2a3c64;border-radius:8px;color:#eaf3ff;padding:4px 10px;cursor:pointer">×</button></div>'+
                          '<iframe id="game-frame" style="flex:1;border:0;border-radius:0 0 14px 14px;background:#000"></iframe>'+
                          '</div>';
        document.body.appendChild(modal);
        document.getElementById('game-close').addEventListener('click', ()=>{ modal.style.display='none'; document.getElementById('game-frame').src='about:blank'; });
      }
      document.getElementById('game-frame').src = gamePath;
      modal.style.display='block';
    }
    function greenTopTwoLines(){
      const bar = document.createElement('div');
      bar.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#0b7f3a;color:#eaffea;text-align:center;padding:18px 8px;z-index:10000;font-weight:800;font-size:28px;line-height:1.5;';
      bar.innerHTML = '我还没空做这个鱼<br/>欢迎下次莅临指导';
      document.body.appendChild(bar);
      setTimeout(()=>bar.remove(), 3800);
    }
    function handler(e){
      const v = normalize(input.value);
      if (!v) return;
      if (v === '摸两会鱼') { e && e.preventDefault(); showModal('/updatetool/game1.html'); return false; }
      if (v === '摸三会鱼') { e && e.preventDefault(); greenTopTwoLines(); return false; }
      return true;
    }
    input.addEventListener('keydown', (ev)=>{ if (ev.key === 'Enter') { const ok = handler(ev); if (ok === false) return; } });
    if (form) form.addEventListener('submit', (ev)=>{ const ok = handler(ev); if (ok === false) ev.preventDefault(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ insertInternetTools(); setupEasterEggs(); });
  } else { insertInternetTools(); setupEasterEggs(); }
})();
