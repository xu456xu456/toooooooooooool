
  (function(){
    const onReady = (fn)=>{ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded', fn, {once:true});} else {fn();} };
    onReady(function init(){
      const LANGS = ['en','ph','id','vi','bn','ng','sw','ar','zh'];
      const NAMES = {en:'English', ph:'Tagalog', id:'Bahasa Indonesia', vi:'Tiếng Việt', bn:'বাংলা', ng:'English (NG)', sw:'Kiswahili', ar:'العربية', zh:'简体中文'};
      const MAP_BROWSER = {en:'en', tl:'ph', fil:'ph', id:'id', vi:'vi', bn:'bn', sw:'sw', ar:'ar', zh:'zh', 'zh-cn':'zh', 'zh-hans':'zh'};

      function getCookie(name){ return ('; '+document.cookie).split('; '+name+'=').pop().split(';')[0] || ''; }
      function pickLang(){
        const url = new URL(location.href);
        const qLang = (url.searchParams.get('lang') || '').toLowerCase();
        const hLang = ((location.hash.match(/(?:^|[?#&])lang=([a-z-]+)/i)||[])[1]||'').toLowerCase();
        const urlLang = qLang || hLang;

        const cookieLang = getCookie('lang');
        const nav = (navigator.language||'en').toLowerCase();

        let lang = 'en';
        if (urlLang && LANGS.includes(urlLang)) {
          lang = urlLang;
          document.cookie = `lang=${lang};path=/;max-age=31536000`;
        } else if (cookieLang && LANGS.includes(cookieLang)) {
          lang = cookieLang;
        } else {
          lang = MAP_BROWSER[nav] || MAP_BROWSER[nav.split('-')[0]] || 'en';
        }
        return lang;
      }

      const lang = pickLang();

      if (lang==='ar') document.documentElement.dir='rtl'; else document.documentElement.dir='ltr';
      document.documentElement.lang =
        (lang==='ph' ? 'fil' :
         lang==='zh' ? 'zh-CN' :
         lang==='ng' ? 'en-NG' :
         lang);

      // ===== 语言面板 =====
      const bar = document.getElementById('langbar');
      const btn = document.getElementById('langBtn');
      const panel = document.getElementById('langPanel');
      const title = document.getElementById('langTitle');
      const LABELS = {en:'Language', ph:'Wika', id:'Bahasa', vi:'Ngôn ngữ', bn:'ভাষা', ng:'Language', sw:'Lugha', ar:'اللغة', zh:'语言'};

      if (bar) {
        const makeHref = (code)=>{
          const url = new URL(location.href);
          url.searchParams.set('lang', code);  // 以 URL 参数为准
          return url.toString();
        };

        LANGS.forEach(code=>{
          const a=document.createElement('a');
          a.textContent=NAMES[code];
          a.href = makeHref(code);             // 渐进增强：即使 JS 失效也能切换
          if(code===lang) a.className='active';
          a.addEventListener('click', (e)=>{
            e.preventDefault();                // 避免拉长历史
            document.cookie = `lang=${code};path=/;max-age=31536000`;
            location.href = a.href;            // 直接跳转到 ?lang=code，100% 生效
          });
          bar.appendChild(a);
        });
      }

      function openLang(open){
        if(!panel||!btn) return;
        if(open && typeof hideEgg === 'function') hideEgg(); // 打开面板时顺手关彩蛋
        panel.classList.toggle('open', !!open);
        btn.setAttribute('aria-expanded', !!open);
      }
      function setBtnLabel(){ if(!btn||!title) return; btn.textContent = '🌐 ' + (NAMES[lang]||'Language'); btn.setAttribute('aria-label', LABELS[lang]||'Language'); title.textContent = (LABELS[lang]||'Language'); }
      setBtnLabel();
      if (btn) btn.addEventListener('click', (e)=>{ e.stopPropagation(); openLang(!panel.classList.contains('open')); });
      document.addEventListener('click', (e)=>{ if(panel && panel.classList.contains('open')){ const within = panel.contains(e.target) || (btn && btn.contains(e.target)); if(!within) openLang(false); } });
      document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') openLang(false); });

      // ================= I18N =================
      const I18N = {};

      I18N.en = { title:"GoToolOnline — 30+ Free Online Tools (All-in-One)",
        desc:"All tools on one page: calculators, converters, time, calendars, writing and developer utilities. Fast, free, no login.",
        hero:"All Tools — One Page (30+)",
        tip:"Tip: type to filter instantly. Click a chip to filter by category.",
        chips:{all:"All", cal:"Calculators", conv:"Converters", time:"Time", calend:"Calendars", utils:"Utilities", write:"Writing", dev:"Dev"},
        h:{cal:"Calculators", conv:"Converters", time:"Time", calend:"Calendars", utils:"Utilities", write:"Writing", dev:"Developer"},
        quick_label:"Quick links:",
        tools:{
          basic:["🧮 Basic Calculator","Four functions, percent, memory"],
          sci:["🧪 Scientific Calculator","Functions, DEG/RAD, history"],
          mort:["🏠 Mortgage Calculator","Payment & amortization"],
          tip:["🍽️ Tip & Split Bill","Per-person share"],
          age:["🧮 Age Calculator","Exact age in years, months, days"],
          bmi:["⚖️ BMI Calculator","Body Mass Index"],
          pct:["➗ Percentage Calculator","Percent of / change"],
          date:["📅 Date Difference","Days between dates"],
          unit:["🔁 Unit Converter","18 categories · 300+ units"],
          fx:["💱 Currency Converter","Live FX + manual rate"],
          world:["🌍🕒 World Time (by Country)","See local time across countries"],
          unix:["🕰️ Unix Timestamp Converter","Epoch ↔ Local/UTC"],
          ctd:["⏳ Countdown Timer","Simple countdown"],
          sw:["⏱️ Stopwatch","Online stopwatch"],
          week:["📅# Week Number Finder","ISO week from date"],
          printcal:["🖨️📅 Printable Calendar","PDF-ready monthly pages"],
          pass:["🔐 Password Generator","Strong random passwords"],
          ip:["🌐 IP Address Lookup","Your public IP"],
          rng:["🎲 Random Number Generator","Secure RNG when available"],
          qr:["🔳 QR Code Generator","Create QR codes"],
          color:["🎨 Color Picker","Pick & copy hex"],
          scan:["📷 QR Code Scanner","Camera or image"],
          pal:["🎨 Palette from Image","Extract colors"],
          lotto:["🎟️ Lottery Number Generator","For entertainment only"],
          word:["📝 Word Counter","Words & chars"],
          char:["🔡 Character Counter","Counts all chars"],
          tcase:["🔠 Text Case Converter","UPPER / lower / Title"],
          url:["🔗 URL Encoder / Decoder","Encode or decode URLs"],
          json:["🧩 JSON Formatter / Validator","Validate & pretty-print"],
          htmlmin:["🧹 HTML Minifier (Basic)","Collapse whitespace"],
          b64:["📦 Base64 Encoder / Decoder","Text ⇄ Base64"],
          hash:["🔒 SHA-256 Hash Generator","WebCrypto hashing"],
          jwt:["🔑 JWT Decoder","Local decode"]
        },
        faq_title:"FAQ",
        faq:{
          q1:"Are these tools free to use?", a1:"Yes. GoToolOnline tools are free to use with no sign-up required.",
          q2:"Do they work offline?", a2:"Most tools run locally in your browser. The currency converter supports manual rates for offline use, and can fetch live rates when online.",
          q3:"How is my privacy protected?", a3:'Most tools process your input only in the browser and do not upload data to servers. See our Privacy Policy for details.',
          q4:"Can I bookmark tools I use often?", a4:"Absolutely. Bookmark any tool page to open it instantly next time."
        },
        foot:"Free online tools for everyone",
        links_quick:["Online Unit Converter","Free Currency Converter","World Time by Country/City","Countdown Timer","Stopwatch","JSON Formatter"],
        site_desc:"All tools together: calculators, unit & currency converters, world time, countdowns/stopwatches, printable calendars, writing & developer utilities. Privacy-friendly; many work offline.",
        footer_links:{about:"About", privacy:"Privacy", terms:"Terms", contact:"Contact"}
      };

      I18N.zh = { title:"GoToolOnline · 30+ 免费在线工具（汇总页）",
        desc:"把常用工具放到一页：计算器、单位/货币换算、世界时区、倒计时/秒表、可打印日历、写作与开发小工具。免费、无登录、加载后离线可用。",
        hero:"全部工具 — 一页搞定（30+）",
        tip:"提示：输入即可实时筛选；点击上方芯片按分类过滤。",
        chips:{all:"全部", cal:"计算器", conv:"换算", time:"时间", calend:"日历", utils:"常用工具", write:"写作", dev:"开发"},
        h:{cal:"计算器", conv:"换算", time:"时间", calend:"日历", utils:"常用工具", write:"写作", dev:"开发者"},
        quick_label:"快捷入口：",
        tools:{
          basic:["🧮 标准计算器","加减乘除、百分比、存储"],
          sci:["🧪 科学计算器","函数、角度/弧度、历史"],
          mort:["🏠 房贷计算器","月供与摊还表"],
          tip:["🍽️ 小费/拼单","按人均分"],
          age:["🧮 年龄计算器","精确到年/月/日"],
          bmi:["⚖️ BMI 计算器","身体质量指数"],
          pct:["➗ 百分比计算器","占比/涨跌幅"],
          date:["📅 日期差","两日期间天数"],
          unit:["🔁 单位换算器","18 类 · 300+ 单位"],
          fx:["💱 货币换算","实时汇率 + 手动"],
          world:["🌍🕒 世界时间（按国家）","快速查看各国当地时间"],
          unix:["🕰️ Unix 时间戳转换","Epoch ↔ 本地/UTC"],
          ctd:["⏳ 倒计时","简单好用"],
          sw:["⏱️ 秒表","网页端秒表"],
          week:["📅# 周数查询","ISO 周序号"],
          printcal:["🖨️📅 可打印日历","PDF 友好"],
          pass:["🔐 密码生成器","强随机密码"],
          ip:["🌐 IP 查询","你的公网 IP"],
          rng:["🎲 随机数生成器","有安全 RNG 时启用"],
          qr:["🔳 二维码生成","文本/链接转二维码"],
          color:["🎨 取色器","选色并复制 HEX"],
          scan:["📷 二维码识别","摄像头/图片"],
          pal:["🎨 图片取色板","提取主色"],
          lotto:["🎟️ 乐透号码生成","仅供娱乐"],
          word:["📝 字数统计","词数与字符数"],
          char:["🔡 字符统计","统计所有字符"],
          tcase:["🔠 大小写转换","UPPER / lower / Title"],
          url:["🔗 URL 编解码","Encode/Decode"],
          json:["🧩 JSON 格式化/校验","校验并美化"],
          htmlmin:["🧹 HTML 压缩","折叠空白"],
          b64:["📦 Base64 编解码","文本 ⇄ Base64"],
          hash:["🔒 SHA-256 摘要","WebCrypto"],
          jwt:["🔑 JWT 解析","本地解析"]
        },
        faq_title:"常见问题",
        faq:{
          q1:"这些工具免费吗？", a1:"免费，无需登录，绝大多数在浏览器本地运行。",
          q2:"离线可用吗？", a2:"页面加载后，多数工具可离线使用；货币换算可手动填汇率。",
          q3:"隐私如何保障？", a3:'通常不上传你的数据，详见 <a href="/privacy/">隐私政策</a>。',
          q4:"能收藏常用工具吗？", a4:"可以，把工具页加入浏览器书签即可。"
        },
        foot:"免费、实用、对隐私友好",
        links_quick:["单位换算","货币换算","世界时间","倒计时","秒表","JSON 格式化"],
        site_desc:"把 30+ 常用工具放到一页：计算器、单位/货币换算、世界时间、倒计时/秒表、可打印日历，以及写作与开发小工具。注重隐私，很多工具离线可用。",
        footer_links:{about:"关于", privacy:"隐私", terms:"条款", contact:"联系"}
      };

      I18N.ph = { title:"GoToolOnline · Mga Libreng Online na Tool",
        desc:"Lahat ng tool sa iisang pahina: kalkulador, converter, oras, kalendaryo, pagsusulat at developer utilities. Mabilis, libre, walang login.",
        hero:"Lahat ng Tool — Isang Pahina",
        tip:"Mag-type para agad ma-filter. I-click ang chip para sa kategorya.",
        chips:{all:"Lahat", cal:"Kalkulador", conv:"Converter", time:"Oras", calend:"Kalendaryo", utils:"Mga Utility", write:"Pagsusulat", dev:"Dev"},
        h:{cal:"Kalkulador", conv:"Converter", time:"Oras", calend:"Kalendaryo", utils:"Mga Utility", write:"Pagsusulat", dev:"Developer"},
        quick_label:"Mabilis na link:",
        tools:{
          basic:["🧮 Pangunahing Kalkulador","Aritmetika, porsyento, memorya"],
          sci:["🧪 Siyentipikong Kalkulador","Mga function, DEG/RAD, history"],
          mort:["🏠 Kalkulador ng Mortgage","Bayad at amortisasyon"],
          tip:["🍽️ Tip at Hati ng Bill","Bahagi kada tao"],
          age:["🧮 Tagabilang ng Edad","Eksaktong edad (taon/buwan/araw)"],
          bmi:["⚖️ Kalkulador ng BMI","Body Mass Index"],
          pct:["➗ Kalkulador ng Porsyento","Bahagi o pagbabago"],
          date:["📅 Pagkakaiba ng Petsa","Mga araw sa pagitan ng petsa"],
          unit:["🔁 Tagapagpalit ng Yunit","18 kategorya · 300+ yunit"],
          fx:["💱 Tagapagpalit ng Salapi","Live FX + manual"],
          world:["🌍🕒 Oras ng Mundo (bawat Bansa)","Tingnan ang lokal na oras sa mga bansa"],
          unix:["🕰️ Konbertor ng Unix Timestamp","Epoch ↔ Lokal/UTC"],
          ctd:["⏳ Oras ng Pagbilang Pabalik","Simpleng countdown"],
          sw:["⏱️ Pansukat ng Oras","Stopwatch sa web"],
          week:["📅# Bilang ng Linggo","ISO week mula sa petsa"],
          printcal:["🖨️📅 Naipapring na Kalendaryo","Handa sa PDF"],
          pass:["🔐 Tagagawa ng Password","Malalakas na random password"],
          ip:["🌐 Paghahanap ng IP","Iyong public IP"],
          rng:["🎲 Tagagawa ng Numerong Random","Gamitin ang Secure RNG kung mayroon"],
          qr:["🔳 Gumawa ng QR Code","Lumikha ng QR code"],
          color:["🎨 Tagapili ng Kulay","Kopyahin ang HEX"],
          scan:["📷 Tagasuri ng QR Code","Kamera o larawan"],
          pal:["🎨 Paleta mula sa Larawan","Kunin ang mga kulay"],
          lotto:["🎟️ Tagagawa ng Numero sa Lotto","Para sa libangan lang"],
          word:["📝 Bilang ng Salita","Mga salita at karakter"],
          char:["🔡 Bilang ng Karakter","Bilangin lahat ng karakter"],
          tcase:["🔠 Palit-anyo ng Teksto","UPPER / lower / Title"],
          url:["🔗 URL Encoder / Decoder","Encode/Decode ng URL"],
          json:["🧩 JSON Formatter / Validator","I-validate at pagandahin"],
          htmlmin:["🧹 HTML Minifier (Basic)","I-kollapse ang whitespace"],
          b64:["📦 Base64 Encoder / Decoder","Teksto ⇄ Base64"],
          hash:["🔒 SHA-256 Hash Generator","WebCrypto hashing"],
          jwt:["🔑 JWT Decoder","Lokal na decode"]
        },
        faq_title:"Mga Madalas Itanong",
        faq:{
          q1:"Libre ba ang mga tool na ito?", a1:"Oo. GoToolOnline at walang kailangang sign-up.",
          q2:"Gumagana ba offline?", a2:"Karamihan ay tumatakbo sa browser mo. May manual rate ang currency converter, at puwedeng kumuha ng live rate kapag online.",
          q3:"Paano pinoprotektahan ang privacy ko?", a3:"Hindi ina-upload ang input; sa browser ito pinoproseso. Tingnan ang aming Privacy Policy para sa detalye.",
          q4:"Puwede bang i-bookmark ang madalas kong gamitin?", a4:"Oo. I-bookmark ang pahina ng tool para sa mabilis na pagbukas."
        },
        foot:"Libreng online na mga tool para sa lahat",
        links_quick:["Konverter ng Yunit","Libreng Currency Converter","Oras sa Mundo","Countdown Timer","Pansukat ng Oras","JSON Formatter"],
        site_desc:"Lahat ng tool sa iisang pahina; maraming tool ang gumagana offline.",
        footer_links:{about:"Tungkol", privacy:"Privacy", terms:"Mga Tuntunin", contact:"Contact"}
      };

      I18N.id = { title:"GoToolOnline · Alat Online Gratis",
        desc:"Semua alat di satu halaman: kalkulator, konverter, waktu, kalender, tulis & utilitas developer. Cepat, gratis, tanpa login.",
        hero:"Semua Alat — Satu Halaman",
        tip:"Ketik untuk memfilter. Klik chip untuk kategori.",
        chips:{all:"Semua", cal:"Kalkulator", conv:"Konverter", time:"Waktu", calend:"Kalender", utils:"Utilitas", write:"Penulisan", dev:"Dev"},
        h:{cal:"Kalkulator", conv:"Konverter", time:"Waktu", calend:"Kalender", utils:"Utilitas", write:"Penulisan", dev:"Pengembang"},
        quick_label:"Tautan cepat:",
        tools:{
          basic:["🧮 Kalkulator Dasar","Tambah/kurang/kali/bagi, %, memori"],
          sci:["🧪 Kalkulator Ilmiah","Fungsi, DEG/RAD, riwayat"],
          mort:["🏠 Kalkulator KPR","Angsuran & amortisasi"],
          tip:["🍽️ Tip & Bagi Tagihan","Bagian per orang"],
          age:["🧮 Penghitung Umur","Umur tepat (tahun/bulan/hari)"],
          bmi:["⚖️ Kalkulator BMI","Body Mass Index"],
          pct:["➗ Kalkulator Persentase","Persen dari / perubahan"],
          date:["📅 Selisih Tanggal","Hari di antara tanggal"],
          unit:["🔁 Konverter Satuan","18 kategori · 300+ satuan"],
          fx:["💱 Konverter Mata Uang","Kurs live + manual"],
          world:["🌍🕒 Waktu Dunia (per Negara)","Lihat waktu lokal lintas negara"],
          unix:["🕰️ Konverter Unix Timestamp","Epoch ↔ Lokal/UTC"],
          ctd:["⏳ Timer Hitung Mundur","Hitung mundur sederhana"],
          sw:["⏱️ Jam Stopwatch","Stopwatch online"],
          week:["📅# Nomor Minggu","ISO week dari tanggal"],
          printcal:["🖨️📅 Kalender Cetak","Siap PDF"],
          pass:["🔐 Generator Kata Sandi","Sandi acak kuat"],
          ip:["🌐 Pencarian IP","IP publik Anda"],
          rng:["🎲 Generator Angka Acak","Gunakan Secure RNG bila ada"],
          qr:["🔳 Pembuat Kode QR","Buat kode QR"],
          color:["🎨 Pemilih Warna","Salin HEX"],
          scan:["📷 Pemindai Kode QR","Kamera atau gambar"],
          pal:["🎨 Palet dari Gambar","Ekstrak warna"],
          lotto:["🎟️ Generator Nomor Lotre","Hanya untuk hiburan"],
          word:["📝 Penghitung Kata","Kata & karakter"],
          char:["🔡 Penghitung Karakter","Hitung semua karakter"],
          tcase:["🔠 Pengubah Huruf Teks","UPPER / lower / Title"],
          url:["🔗 Encoder/Decoder URL","Encode/Decode URL"],
          json:["🧩 Pemformat/Pemeriksa JSON","Validasi & rapikan"],
          htmlmin:["🧹 Peringkas HTML (Dasar)","Ringkas whitespace"],
          b64:["📦 Base64 Encoder/Decoder","Teks ⇄ Base64"],
          hash:["🔒 Pembuat Hash SHA-256","WebCrypto hashing"],
          jwt:["🔑 Decoder JWT","Decode lokal"]
        },
        faq_title:"Pertanyaan Umum",
        faq:{
          q1:"Apakah alat ini gratis?", a1:"Ya. GoToolOnline gratis dan tidak perlu mendaftar.",
          q2:"Apakah bisa offline?", a2:"Kebanyakan berjalan lokal di browser. Konverter mata uang bisa pakai kurs manual atau ambil kurs live saat online.",
          q3:"Bagaimana privasi saya dilindungi?", a3:"Input diproses di browser; data tidak diunggah. Lihat Kebijakan Privasi kami.",
          q4:"Bisa bookmark alat favorit?", a4:"Bisa. Tandai halaman alat untuk akses cepat."
        },
        foot:"Alat online gratis untuk semua",
        links_quick:["Konverter Satuan","Konverter Mata Uang","Waktu Dunia","Hitung Mundur","Stopwatch","Formatter JSON"],
        site_desc:"Semua alat di satu halaman. Ramah privasi; banyak alat bisa offline.",
        footer_links:{about:"Tentang", privacy:"Privasi", terms:"Ketentuan", contact:"Kontak"}
      };

      I18N.vi = { title:"GoToolOnline · Công cụ trực tuyến miễn phí",
        desc:"Tất cả công cụ trên một trang: máy tính, chuyển đổi, thời gian, lịch, viết và tiện ích cho lập trình. Nhanh, miễn phí, không cần đăng nhập.",
        hero:"Tất cả công cụ — Một trang",
        tip:"Gõ để lọc ngay. Bấm chip để lọc theo nhóm.",
        chips:{all:"Tất cả", cal:"Máy tính", conv:"Chuyển đổi", time:"Thời gian", calend:"Lịch", utils:"Tiện ích", write:"Viết", dev:"Dev"},
        h:{cal:"Máy tính", conv:"Chuyển đổi", time:"Thời gian", calend:"Lịch", utils:"Tiện ích", write:"Viết", dev:"Lập trình"},
        quick_label:"Liên kết nhanh:",
        tools:{
          basic:["🧮 Máy tính cơ bản","Cộng/trừ/nhân/chia, %, bộ nhớ"],
          sci:["🧪 Máy tính khoa học","Hàm số, DEG/RAD, lịch sử"],
          mort:["🏠 Tính tiền thế chấp","Khoản trả & khấu hao"],
          tip:["🍽️ Tiền tip & chia hoá đơn","Chia theo đầu người"],
          age:["🧮 Tính tuổi","Chính xác theo năm/tháng/ngày"],
          bmi:["⚖️ Máy tính BMI","Chỉ số khối cơ thể"],
          pct:["➗ Máy tính phần trăm","Tỷ lệ / thay đổi"],
          date:["📅 Chênh lệch ngày","Số ngày giữa hai mốc"],
          unit:["🔁 Đổi đơn vị","18 nhóm · 300+ đơn vị"],
          fx:["💱 Đổi tiền tệ","Tỷ giá trực tiếp + thủ công"],
          world:["🌍🕒 Giờ thế giới (theo quốc gia)","Xem giờ địa phương các nước"],
          unix:["🕰️ Đổi Unix Timestamp","Epoch ↔ Local/UTC"],
          ctd:["⏳ Đồng hồ đếm ngược","Đếm ngược đơn giản"],
          sw:["⏱️ Bấm giờ","Stopwatch trực tuyến"],
          week:["📅# Số tuần","ISO week từ ngày"],
          printcal:["🖨️📅 Lịch in","Tương thích PDF"],
          pass:["🔐 Tạo mật khẩu","Mật khẩu ngẫu nhiên mạnh"],
          ip:["🌐 Tra IP","IP công khai của bạn"],
          rng:["🎲 Tạo số ngẫu nhiên","Dùng Secure RNG khi có"],
          qr:["🔳 Tạo mã QR","Tạo mã QR"],
          color:["🎨 Bảng chọn màu","Sao chép mã HEX"],
          scan:["📷 Quét mã QR","Camera hoặc ảnh"],
          pal:["🎨 Bảng màu từ ảnh","Trích xuất màu"],
          lotto:["🎟️ Tạo số xổ số","Chỉ để giải trí"],
          word:["📝 Đếm từ","Số từ & ký tự"],
          char:["🔡 Đếm ký tự","Đếm tất cả ký tự"],
          tcase:["🔠 Đổi kiểu chữ","UPPER / lower / Title"],
          url:["🔗 Mã hoá/Giải mã URL","Encode/Decode URL"],
          json:["🧩 Định dạng/kiểm tra JSON","Kiểm tra & làm đẹp"],
          htmlmin:["🧹 Rút gọn HTML (Cơ bản)","Thu gọn khoảng trắng"],
          b64:["📦 Base64 Mã hoá/Giải mã","Văn bản ⇄ Base64"],
          hash:["🔒 Băm SHA-256","WebCrypto hashing"],
          jwt:["🔑 Giải mã JWT","Giải mã cục bộ"]
        },
        faq_title:"Câu hỏi thường gặp",
        faq:{
          q1:"Các công cụ này có miễn phí không?", a1:"Có. GoToolOnline miễn phí, không cần đăng ký.",
          q2:"Có dùng offline được không?", a2:"Hầu hết chạy ngay trong trình duyệt. Bộ đổi tiền tệ có thể nhập tỷ giá thủ công hoặc lấy tỷ giá trực tuyến khi có mạng.",
          q3:"Bảo vệ quyền riêng tư như thế nào?", a3:"Dữ liệu được xử lý trong trình duyệt; không tải lên máy chủ. Xem Chính sách quyền riêng tư.",
          q4:"Tôi có thể đánh dấu công cụ hay dùng không?", a4:"Có. Hãy đánh dấu trang công cụ để mở nhanh lần sau."
        },
        foot:"Công cụ miễn phí cho mọi người",
        links_quick:["Đổi đơn vị","Đổi tiền tệ","Giờ thế giới","Đếm ngược","Bấm giờ","Định dạng JSON"],
        site_desc:"Gom tất cả công cụ vào một trang; nhiều công cụ hoạt động offline.",
        footer_links:{about:"Giới thiệu", privacy:"Quyền riêng tư", terms:"Điều khoản", contact:"Liên hệ"}
      };

      I18N.bn = { title:"GoToolOnline · ফ্রি অনলাইন টুলস",
        desc:"সব টুল এক পাতায়: ক্যালকুলেটর, কনভার্টার, সময়, ক্যালেন্ডার, রাইটিং ও ডেভেলপার ইউটিলিটি। দ্রুত, ফ্রি, লগইন ছাড়া।",
        hero:"সব টুল — এক পাতা",
        tip:"টাইপ করলেই ফিল্টার হবে। চিপে ক্লিক করে ক্যাটেগরি অনুযায়ী ফিল্টার করুন।",
        chips:{all:"সব", cal:"ক্যালকুলেটর", conv:"কনভার্টার", time:"সময়", calend:"ক্যালেন্ডার", utils:"ইউটিলিটি", write:"রাইটিং", dev:"ডেভ"},
        h:{cal:"ক্যালকুলেটর", conv:"কনভার্টার", time:"সময়", calend:"ক্যালেন্ডার", utils:"ইউটিলিটি", write:"রাইটিং", dev:"ডেভেলপার"},
        quick_label:"দ্রুত লিঙ্ক:",
        tools:{
          basic:["🧮 বেসিক ক্যালকুলেটর","চার গণিত, %, মেমরি"],
          sci:["🧪 বৈজ্ঞানিক ক্যালকুলেটর","ফাংশন, DEG/RAD, ইতিহাস"],
          mort:["🏠 মর্টগেজ ক্যালকুলেটর","পেমেন্ট ও অ্যামর্টাইজেশন"],
          tip:["🍽️ টিপ/বিল ভাগ","প্রতি-ব্যক্তি শেয়ার"],
          age:["🧮 বয়স ক্যালকুলেটর","বছর/মাস/দিন অনুযায়ী"],
          bmi:["⚖️ BMI ক্যালকুলেটর","বডি মাস ইনডেক্স"],
          pct:["➗ শতাংশ ক্যালকুলেটর","অংশ/পরিবর্তন"],
          date:["📅 তারিখের পার্থক্য","দুই তারিখের মাঝে দিন"],
          unit:["🔁 ইউনিট কনভার্টার","১৮ বিভাগ · ৩০০+ ইউনিট"],
          fx:["💱 কারেন্সি কনভার্টার","লাইভ রেট + ম্যানুয়াল"],
          world:["🌍🕒 বিশ্ব সময় (দেশভিত্তিক)","দেশভেদে লোকাল টাইম"],
          unix:["🕰️ Unix সময়চিহ্ন কনভার্টার","Epoch ↔ লোকাল/UTC"],
          ctd:["⏳ কাউন্টডাউন টাইমার","সহজ কাউন্টডাউন"],
          sw:["⏱️ স্টপওয়াচ","ওয়েবে স্টপওয়াচ"],
          week:["📅# সপ্তাহ নম্বর","তারিখ থেকে ISO সপ্তাহ"],
          printcal:["🖨️📅 প্রিন্টযোগ্য ক্যালেন্ডার","PDF-সহায়ক"],
          pass:["🔐 পাসওয়ার্ড জেনারেটর","শক্তিশালী র‌্যান্ডম পাসওয়ার্ড"],
          ip:["🌐 IP অনুসন্ধান","আপনার পাবলিক IP"],
          rng:["🎲 র‌্যান্ডম নাম্বার জেনারেটর","Secure RNG থাকলে"],
          qr:["🔳 QR কোড জেনারেটর","QR কোড তৈরি করুন"],
          color:["🎨 কালার পিকার","HEX কপি করুন"],
          scan:["📷 QR কোড স্ক্যানার","ক্যামেরা বা ছবি"],
          pal:["🎨 ছবির থেকে প্যালেট","রং এক্সট্র্যাক্ট করুন"],
          lotto:["🎟️ লটারি নাম্বার জেনারেটর","শুধু বিনোদনের জন্য"],
          word:["📝 শব্দ গণক","শব্দ ও অক্ষর"],
          char:["🔡 অক্ষর গণক","সব অক্ষর গণনা"],
          tcase:["🔠 টেক্সট কেস কনভার্টার","UPPER / lower / Title"],
          url:["🔗 URL এনকোডার/ডিকোডার","URL Encode/Decode"],
          json:["🧩 JSON ফরম্যাটার/ভ্যালিডেটর","ভ্যালিডেট ও সুন্দর করুন"],
          htmlmin:["🧹 HTML মিনিফায়ার (বেসিক)","ফাঁকা স্থান কমান"],
          b64:["📦 Base64 এনকোডার/ডিকোডার","টেক্সট ⇄ Base64"],
          hash:["🔒 SHA-256 হ্যাশ জেনারেটর","WebCrypto hashing"],
          jwt:["🔑 JWT ডিকোডার","লোকাল ডিকোড"]
        },
        faq_title:"প্রায়শই জিজ্ঞাসিত প্রশ্ন",
        faq:{
          q1:"এই টুলগুলো কি ফ্রি?", a1:"হ্যাঁ। GoToolOnline ফ্রি এবং সাইন-আপ লাগে না।",
          q2:"অফলাইনে কাজ করে?", a2:"বেশিরভাগ টুল ব্রাউজারেই চলে। কারেন্সি কনভার্টারে ম্যানুয়াল রেট আছে, অনলাইনে থাকলে লাইভ রেটও নেওয়া যায়।",
          q3:"গোপনীয়তা কীভাবে রক্ষা করা হয়?", a3:"ইনপুট সাধারণত ব্রাউজারেই প্রসেস হয়; সার্ভারে আপলোড হয় না। বিস্তারিত প্রাইভেসি পলিসিতে।",
          q4:"প্রিয় টুল বুকমার্ক করা যাবে?", a4:"হ্যাঁ। যে কোনো টুল পেজ বুকমার্ক করে রাখুন।"
        },
        foot:"সবার জন্য বিনামূল্যের অনলাইন টুল",
        links_quick:["ইউনিট কনভার্টার","কারেন্সি কনভার্টার","বিশ্ব সময়","কাউন্টডাউন","স্টপওয়াচ","JSON ফরম্যাটার"],
        site_desc:"সব টুল একত্রে; অনেকগুলো অফলাইনে কাজ করে।",
        footer_links:{about:"সম্পর্কে", privacy:"গোপনীয়তা", terms:"শর্তাবলি", contact:"যোগাযোগ"}
      };

      I18N.ng = { title:"GoToolOnline — Free Online Tools (Nigeria)",
        desc:"Fast, free tools for Nigeria & beyond: calculators, converters, time, calendars, writing and dev utilities.",
        hero:"All Tools — One Page",
        tip:"Type to filter instantly. Click a chip to filter by category.",
        chips:{all:"All", cal:"Calculators", conv:"Converters", time:"Time", calend:"Calendars", utils:"Utilities", write:"Writing", dev:"Dev"},
        h:{cal:"Calculators", conv:"Converters", time:"Time", calend:"Calendars", utils:"Utilities", write:"Writing", dev:"Developer"},
        quick_label:"Quick links:",
        tools:null,
        faq_title:"FAQ",
        faq:null,
        links_quick:["Online Unit Converter","Free Currency Converter","World Time","Countdown Timer","Stopwatch","JSON Formatter"],
        foot:"Fast, free tools for everyone",
        site_desc:"Fast, free tools for Nigeria & beyond.",
        footer_links:{about:"About", privacy:"Privacy", terms:"Terms", contact:"Contact"}
      };

      I18N.sw = { title:"GoToolOnline · Zana Mtandaoni Bure",
        desc:"Zana zote kwenye ukurasa mmoja: kalkuleta, vigeuzi, muda, kalenda, uandishi na zana za msanidi. Haraka, bure, bila kuingia.",
        hero:"Zana Zote — Ukurasa Mmoja",
        tip:"Andika kutafuta mara moja. Bofya chip kuchuja kwa kundi.",
        chips:{all:"Zote", cal:"Kalkuleta", conv:"Vigeuzi", time:"Muda", calend:"Kalenda", utils:"Zana", write:"Uandishi", dev:"Dev"},
        h:{cal:"Kalkuleta", conv:"Vigeuzi", time:"Muda", calend:"Kalenda", utils:"Zana", write:"Uandishi", dev:"Msanidi"},
        quick_label:"Viungo vya haraka:",
        tools:{
          basic:["🧮 Kikokotoo cha Msingi","Jumlisha/toa/za/kata, %, kumbukumbu"],
          sci:["🧪 Kikokotoo cha Kisayansi","Kazi, DEG/RAD, historia"],
          mort:["🏠 Kikokotoo cha Rehani","Malipo na upunguzaji"],
          tip:["🍽️ Bakshishi & Gawa Bili","Sehemu kwa kila mtu"],
          age:["🧮 Kikokotoo cha Umri","Umri sahihi (miaka/miezi/siku)"],
          bmi:["⚖️ Kikokotoo cha BMI","Body Mass Index"],
          pct:["➗ Kikokotoo cha Asilimia","Sehemu au mabadiliko"],
          date:["📅 Tofauti ya Tarehe","Siku kati ya tarehe"],
          unit:["🔁 Kigeuzi cha Vitengo","Vikundi 18 · vitengo 300+"],
          fx:["💱 Kigeuzi cha Sarafu","Viwango live + mwongozo"],
          world:["🌍🕒 Saa za Dunia (Nchi)","Tazama saa za nchi mbalimbali"],
          unix:["🕰️ Kigeuzi cha Muda wa Unix","Epoch ↔ Lokal/UTC"],
          ctd:["⏳ Kipima Muda wa Kurudi Nyuma","Kipima muda rahisi"],
          sw:["⏱️ Kipima Sekunde","Stopwatch mtandaoni"],
          week:["📅# Namba ya Wiki","Wiki ya ISO kutoka tarehe"],
          printcal:["🖨️📅 Kalenda ya Kuchapisha","Tayari kwa PDF"],
          pass:["🔐 Mtengeneza Nenosiri","Nenosiri nasibu imara"],
          ip:["🌐 Utafutaji wa IP","IP yako ya umma"],
          rng:["🎲 Mtengenezaji Namba Nasibu","Tumia Secure RNG iwapo ipo"],
          qr:["🔳 Mtengenezaji QR","Tengeneza misimbo ya QR"],
          color:["🎨 Kichagulio cha Rangi","Nakili HEX"],
          scan:["📷 Kichanganuzi cha QR","Kamera au picha"],
          pal:["🎨 Paleti kutoka Picha","Dondoa rangi"],
          lotto:["🎟️ Namba za Bahati","Kwa burudani pekee"],
          word:["📝 Kuhesabu Maneno","Maneno na herufi"],
          char:["🔡 Kuhesabu Herufi","Hesabu herufi zote"],
          tcase:["🔠 Kibadili Herufi za Maandishi","UPPER / lower / Title"],
          url:["🔗 Kificho/Kivunja URL","Encode/Decode URL"],
          json:["🧩 Mpangilia/Kihakiki JSON","Hakikisha & pendezesha"],
          htmlmin:["🧹 Kubana HTML (Msingi)","Punguza nafasi tupu"],
          b64:["📦 Kificho/Kivunja Base64","Maandishi ⇄ Base64"],
          hash:["🔒 Kizalishi cha Hash SHA-256","WebCrypto hashing"],
          jwt:["🔑 Kivunja JWT","Decode ya ndani"]
        },
        faq_title:"Maswali Yanayoulizwa Mara kwa Mara",
        faq:{
          q1:"Je, zana hizi ni bure?", a1:"Ndiyo. GoToolOnline ni bure bila kujisajili.",
          q2:"Je, hufanya kazi bila mtandao?", a2:"Nyingi hufanya kazi moja kwa moja kwenye kivinjari. Kigeuzi cha sarafu kina viwango vya mkono na kinaweza kupata viwango moja kwa moja ukiwa mtandaoni.",
          q3:"Faragha yangu inalindwaje?", a3:"Uingizaji huchakatwa kwenye kivinjari; hatutumi data kwenye seva. Tazama sera yetu ya faragha.",
          q4:"Naweza kuweka alamisho (bookmark)?", a4:"Ndiyo. Weka alamisho kwa ukurasa wa zana upendao ili kuufungua haraka."
        },
        foot:"Zana za bure kwa kila mtu",
        links_quick:["Kigeuzi cha Vitengo","Kigeuzi cha Sarafu","Saa za Dunia","Kipima Muda","Kipima Sekunde","Mpangilia JSON"],
        site_desc:"Zana zote kwa ukurasa mmoja; nyingi hufanya kazi nje ya mtandao.",
        footer_links:{about:"Kuhusu", privacy:"Faragha", terms:"Masharti", contact:"Wasiliana"}
      };

      I18N.ar = { title:"GoToolOnline · أدوات مجانية على الإنترنت",
        desc:"جميع الأدوات في صفحة واحدة: حاسبات، محولات، الوقت، التقويمات، أدوات الكتابة والمطور. سريع ومجاني وبدون تسجيل.",
        hero:"كل الأدوات — صفحة واحدة",
        tip:"اكتب للتصفية فورًا. انقر على الشارة للتصفية حسب الفئة.",
        chips:{all:"الكل", cal:"حاسبات", conv:"محولات", time:"الوقت", calend:"تقويمات", utils:"أدوات", write:"كتابة", dev:"Dev"},
        h:{cal:"حاسبات", conv:"محولات", time:"الوقت", calend:"تقويمات", utils:"أدوات", write:"كتابة", dev:"للمطور"},
        quick_label:"روابط سريعة:",
        tools:{
          basic:["🧮 آلة حاسبة أساسية","جمع/طرح/ضرب/قسمة، ٪، ذاكرة"],
          sci:["🧪 آلة حاسبة علمية","دوال، درجات/راديان، سجل"],
          mort:["🏠 حاسبة الرهن العقاري","الدفعات والإطفاء"],
          tip:["🍽️ إكرامية/تقسيم الفاتورة","حصة لكل شخص"],
          age:["🧮 حاسبة العمر","العمر بدقة (سنة/شهر/يوم)"],
          bmi:["⚖️ حاسبة مؤشر كتلة الجسم","BMI"],
          pct:["➗ حاسبة النسبة المئوية","نسبة أو تغيير"],
          date:["📅 فرق التاريخ","الأيام بين تاريخين"],
          unit:["🔁 محول الوحدات","18 فئة · 300+ وحدة"],
          fx:["💱 محول العملات","أسعار مباشرة + يدوي"],
          world:["🌍🕒 الوقت العالمي (حسب البلد)","عرض الوقت المحلي عبر البلدان"],
          unix:["🕰️ محول طابع Unix","Epoch ↔ Local/UTC"],
          ctd:["⏳ مؤقت العدّ التنازلي","عد تنازلي بسيط"],
          sw:["⏱️ ساعة توقيف","Stopwatch عبر الويب"],
          week:["📅# رقم الأسبوع","أسبوع ISO من التاريخ"],
          printcal:["🖨️📅 تقويم للطباعة","جاهز لـ PDF"],
          pass:["🔐 منشئ كلمات المرور","كلمات مرور عشوائية قوية"],
          ip:["🌐 البحث عن IP","عنوان IP العام"],
          rng:["🎲 مولد الأرقام العشوائية","يستخدم Secure RNG إن توفر"],
          qr:["🔳 مولد رمز QR","أنشئ رموز QR"],
          color:["🎨 منتقي الألوان","نسخ HEX"],
          scan:["📷 قارئ رمز QR","كاميرا أو صورة"],
          pal:["🎨 لوحة من صورة","استخراج الألوان"],
          lotto:["🎟️ مولد أرقام يانصيب","لأغراض ترفيهية فقط"],
          word:["📝 عداد الكلمات","كلمات وحروف"],
          char:["🔡 عداد الأحرف","يحصي كل الأحرف"],
          tcase:["🔠 محوّل حالة النص","UPPER / lower / Title"],
          url:["🔗 ترميز/فك ترميز URL","Encode/Decode URL"],
          json:["🧩 منسّق/مدقق JSON","تحقق وجمّل"],
          htmlmin:["🧹 ضغط HTML (أساسي)","طي المسافات البيضاء"],
          b64:["📦 Base64 ترميز/فك","نص ⇄ Base64"],
          hash:["🔒 مولد تجزئة SHA-256","WebCrypto hashing"],
          jwt:["🔑 فك JWT","فك محلي"]
        },
        faq_title:"الأسئلة الشائعة",
        faq:{
          q1:"هل هذه الأدوات مجانية؟", a1:"نعم. GoToolOnline مجاني ولا يحتاج إلى تسجيل.",
          q2:"هل تعمل بدون إنترنت؟", a2:"معظم الأدوات تعمل محليًا داخل المتصفح. محوّل العملات يدعم السعر اليدوي ويتصل بالإنترنت لجلب الأسعار الحية عند توفر الشبكة.",
          q3:"كيف تُحمى خصوصيتي؟", a3:"يُعالج الإدخال في المتصفح ولا نرفع بياناتك للخوادم. راجع سياسة الخصوصية.",
          q4:"هل يمكنني إضافة إشارة مرجعية؟", a4:"نعم. أضِف أي صفحة أداة إلى العلامات المرجعية للوصول السريع."
        },
        foot:"أدوات مجانية للجميع",
        links_quick:["محوّل الوحدات","محوّل العملات","وقت العالم","مؤقت عدّ تنازلي","ساعة توقيف","منسّق JSON"],
        site_desc:"كل الأدوات في صفحة واحدة؛ العديد تعمل دون اتصال.",
        footer_links:{about:"حول", privacy:"الخصوصية", terms:"الشروط", contact:"اتصال"}
      };

      // Nigeria 继承 EN（如未单独提供）
      if (!I18N.ng.tools) I18N.ng.tools = I18N.en.tools;
      if (!I18N.ng.faq) I18N.ng.faq = I18N.en.faq;

      // ----------- 安全赋值工具函数 -----------
      function setText(id, text){
        const el = document.getElementById(id);
        if (el && typeof text === 'string') el.textContent = text;
      }
      function setHTML(id, html){
        const el = document.getElementById(id);
        if (el && typeof html === 'string') el.innerHTML = html;
      }
      function merge(base, over){
        const out = Array.isArray(base)? base.slice() : {...base};
        if (!over) return out;
        for (const k of Object.keys(over)){
          if (over[k] && typeof over[k]==='object' && !Array.isArray(over[k]) && base && typeof base[k]==='object'){
            out[k] = merge(base[k], over[k]);
          } else {
            out[k] = over[k];
          }
        }
        return out;
      }

      // D：以 EN 为底，选中语言覆盖
      const D = merge(I18N.en, I18N[lang]||{});

      // meta
      (function meta(){
        document.title = D.title || document.title;
        function m(name, content){ if(!content) return; let x=document.querySelector(`meta[name="${name}"]`); if(!x){ x=document.createElement('meta'); x.setAttribute('name',name); document.head.appendChild(x);} x.setAttribute('content',content); }
        function og(p, content){ if(!content) return; let x=document.querySelector(`meta[property="og:${p}"]`); if(!x){ x=document.createElement('meta'); x.setAttribute('property',`og:${p}`); document.head.appendChild(x);} x.setAttribute('content',content); }
        m('description', D.desc); og('title', D.title); og('description', D.desc);
      })();

      // headings & chips
      setText('t-hero', D.hero);
      const tipP = document.getElementById('t-tip');
      if (tipP && D.tip){
        // 只替换开头文本，保留后面的 <strong>
        const strong = tipP.querySelector('strong');
        tipP.innerHTML = '';
        tipP.append(document.createTextNode(D.tip + ' '));
        if (strong) tipP.appendChild(strong);
      }

      const chipsTxt = D.chips || I18N.en.chips;
      setText('c-all', chipsTxt.all);
      setText('c-cal', chipsTxt.cal);
      setText('c-conv', chipsTxt.conv);
      setText('c-time', chipsTxt.time);
      setText('c-calend', chipsTxt.calend);
      setText('c-utils', chipsTxt.utils);
      setText('c-write', chipsTxt.write);
      setText('c-dev', chipsTxt.dev);

      const H = D.h || I18N.en.h;
      setText('h-cal', H.cal);
      setText('h-conv', H.conv);
      setText('h-time', H.time);
      setText('h-calend', H.calend);
      setText('h-utils', H.utils);
      setText('h-write', H.write);
      setText('h-dev', H.dev); // 若不存在该节点，setText 会直接忽略

      // tool titles
      const T = merge(I18N.en.tools||{}, D.tools||{});
      function setPair(id, key){
        const pair = T && T[key]; if(!pair) return;
        const [t,s]=pair; const el=document.getElementById(id);
        if(el) el.textContent=t;
        const sid='s-'+id.split('-')[1]; const se=document.getElementById(sid);
        if(se && s) se.textContent=s;
      }
      setPair('l-basic','basic'); setPair('l-sci','sci'); setPair('l-mort','mort'); setPair('l-tip','tip');
      setPair('l-age','age'); setPair('l-bmi','bmi'); setPair('l-pct','pct'); setPair('l-date','date');
      setPair('l-unit','unit'); setPair('l-fx','fx');
      setPair('l-world','world'); setPair('l-unix','unix'); setPair('l-ctd','ctd'); setPair('l-sw','sw'); setPair('l-week','week');
      setPair('l-printcal','printcal');
      setPair('l-pass','pass'); setPair('l-ip','ip'); setPair('l-rng','rng'); setPair('l-qr','qr'); setPair('l-color','color'); setPair('l-scan','scan'); setPair('l-pal','pal'); setPair('l-lotto','lotto');
      setPair('l-word','word'); setPair('l-char','char'); setPair('l-case','tcase');
      setPair('l-url','url'); setPair('l-json','json'); setPair('l-htmlmin','htmlmin'); setPair('l-b64','b64'); setPair('l-hash','hash'); setPair('l-jwt','jwt');

      // FAQ + footer
      if (D.faq){
        setText('faq-heading', D.faq_title || 'FAQ');
        setHTML('q1', D.faq.q1); setHTML('a1', D.faq.a1);
        setHTML('q2', D.faq.q2); setHTML('a2', D.faq.a2);
        setHTML('q3', D.faq.q3); setHTML('a3', D.faq.a3);
        setHTML('q4', D.faq.q4); setHTML('a4', D.faq.a4);
      }
      setText('t-foot', D.foot || I18N.en.foot);
      (function footerTexts(){
        if (D.footer_links){
          const m = D.footer_links;
          if (m.about) setText('f-about', m.about);
          if (m.privacy) setText('f-privacy', m.privacy);
          if (m.terms) setText('f-terms', m.terms);
          if (m.contact) setText('f-contact', m.contact);
        }
      })();

      // Quick links + search placeholders
      (function quickLinks(){
        const ql = document.getElementById('quick-links');
        if (ql){
          const anchors = ql.querySelectorAll('a');
          const txts = D.links_quick || I18N.en.links_quick;
          anchors.forEach((a,i)=>{ if(txts[i]) a.textContent = txts[i]; });
        }
        const label = document.getElementById('quick-label'); if(label && D.quick_label){ label.textContent = D.quick_label; }

        const search=document.getElementById('search'),
              clearBtn=document.getElementById('clear'),
              goBtn=document.getElementById('go');

        if (lang==='zh'){ if(search) search.placeholder='搜索工具…（如：日历、JSON、Base64、BMI）'; if(clearBtn) clearBtn.textContent='清空'; if(goBtn) goBtn.textContent='搜索'; }
        else if (lang==='vi'){ if(search) search.placeholder='Tìm công cụ… (vd: lịch, json, base64, bmi)'; if(clearBtn) clearBtn.textContent='Xóa'; if(goBtn) goBtn.textContent='Tìm'; }
        else if (lang==='id'){ if(search) search.placeholder='Cari alat… (mis: kalender, json, base64, bmi)'; if(clearBtn) clearBtn.textContent='Bersihkan'; if(goBtn) goBtn.textContent='Cari'; }
        else if (lang==='ph'){ if(search) search.placeholder='Hanapin ang tool… (hal. calendar, json, base64, bmi)'; if(clearBtn) clearBtn.textContent='Clear'; if(goBtn) goBtn.textContent='Hanap'; }
        else if (lang==='bn'){ if(search) search.placeholder='টুল খুঁজুন… (যেমন: calendar, json, base64, bmi)'; if(clearBtn) clearBtn.textContent='Clear'; if(goBtn) goBtn.textContent='খোঁজ'; }
        else if (lang==='sw'){ if(search) search.placeholder='Tafuta zana… (k.m. kalenda, json, base64, bmi)'; if(clearBtn) clearBtn.textContent='Futa'; if(goBtn) goBtn.textContent='Tafuta'; }
        else if (lang==='ar'){ if(search) search.placeholder='ابحث عن أداة… (مثل: calendar, json, base64, bmi)'; if(clearBtn) clearBtn.textContent='مسح'; if(goBtn) goBtn.textContent='بحث'; }
        else if (lang==='ng'){ /* 英文占位保持 */ }

        if (goBtn) goBtn.addEventListener('click', ()=>{ triggerEgg((search && search.value||'').trim()); applyFilter(); });
      })();

      // Year + search filter
      var y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();
      const searchEl = document.getElementById('search'), clearBtnEl=document.getElementById('clear'); let activeCat='all';
      function applyFilter(){
        const q=(searchEl && searchEl.value||'').toLowerCase().trim();
        document.querySelectorAll('.tool').forEach(el=>{
          const text=el.textContent.toLowerCase(); const inCat=(activeCat==='all')||el.classList.contains(activeCat); const match=!q||text.includes(q);
          el.classList.toggle('hide', !(inCat && match));
        });
        document.querySelectorAll('section.grid').forEach(group=>{
          const anyVisible = Array.from(group.querySelectorAll('.tool')).some(x=>!x.classList.contains('hide'));
          const header = group.previousElementSibling; if (header && header.matches('h2.group')) header.classList.toggle('hide',!anyVisible);
          group.classList.toggle('hide',!anyVisible);
        });
      }
      if (searchEl) searchEl.addEventListener('input', applyFilter);
      if (searchEl) searchEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ triggerEgg((searchEl.value||'').trim()); applyFilter(); } });
      if (clearBtnEl) clearBtnEl.addEventListener('click', ()=>{ if(searchEl){ searchEl.value=''; applyFilter(); } });

      document.querySelectorAll('#chips .chip').forEach(c=>{
        c.addEventListener('click', ()=>{
          document.querySelectorAll('#chips .chip').forEach(x=>x.classList.remove('active'));
          c.classList.add('active'); activeCat=c.dataset.cat; applyFilter();
          history.replaceState({},'', activeCat!=='all'?'#'+activeCat:location.pathname);
        });
      });
      (function(){ const hash=(location.hash||'').replace('#',''); const chip=document.querySelector(`#chips .chip[data-cat="${hash}"]`); if (chip){ document.querySelectorAll('#chips .chip').forEach(x=>x.classList.remove('active')); chip.classList.add('active'); activeCat=hash; } applyFilter(); })();

      /* === 游戏弹窗函数 === */
      function openGameModal(lang){
        try { if (typeof hideEgg === 'function') hideEgg(); } catch(e){}
        try { if (typeof openLang === 'function') openLang(false); } catch(e){}
        const modal = document.getElementById('game-modal');
        const frame = document.getElementById('game-frame');
        const title = document.getElementById('game-title');
        if (!modal || !frame) return;

        // 构造同源 URL，并保留 ?lang
        const cur = new URL(location.href);
        const url = new URL('game.html', cur);
        if (lang) url.searchParams.set('lang', lang);

        // 标题根据语言简单切换
        if (title) title.textContent = (lang === 'zh' ? '🎮 摸一会鱼' : '🎮 Mini Game');

        frame.src = url.toString();
        modal.classList.add('open');
        modal.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';

        const closer = document.getElementById('game-close');
        if (closer) closer.focus();

        // 事件只绑一次
        if (!modal._bound){
          modal._bound = true;
          // 点遮罩关闭
          modal.addEventListener('click', (e)=>{ if(e.target === modal) closeGameModal(); });
          // 关闭按钮
          const btn = document.getElementById('game-close');
          if (btn) btn.addEventListener('click', closeGameModal);
          // ESC 关闭
          document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('open')) closeGameModal(); });
        }
      }
      function closeGameModal(){
        const modal = document.getElementById('game-modal');
        const frame = document.getElementById('game-frame');
        if (modal){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
        if (frame){ frame.src = 'about:blank'; } // 停止音频/动画
        document.body.style.overflow = '';
      }

      // Eggs
      const EGGS = {'林小小':'欢迎林大小姐莅临指导工作','戴迎秀':'欢迎戴大小姐莅临指导工作','彭冬梅':'欢迎彭大小姐莅临指导工作','徐玉芳':'欢迎最好的老姐莅临指导工作'};
      let eggTimer = null;
      const eggEl = document.getElementById('egg-banner');
      function hideEgg(){ if(!eggEl) return; eggEl.style.display='none'; eggEl.innerHTML=''; if(eggTimer){ clearTimeout(eggTimer); eggTimer=null; } }
      function showEgg(msg){ if(!eggEl) return; eggEl.innerHTML = '<div class="inner">'+ msg +'<button class="close" aria-label="Close">×</button></div>'; eggEl.style.display='block'; const btn=eggEl.querySelector('.close'); if(btn) btn.onclick = hideEgg; if(eggTimer){ clearTimeout(eggTimer);} eggTimer = setTimeout(hideEgg, 8000); }

      // 只保留一个搜索彩蛋：精准匹配“摸一会鱼” -> 打开内嵌游戏
      function triggerEgg(q){
        if(!q) return;
        const raw = q.trim();
        if (raw === '摸一会鱼'){
          const cur = new URL(location.href);
          const lang = cur.searchParams.get('lang'); // 保留站点语言
          openGameModal(lang);
          return; // 不触发横幅
        }
        // 原有 4 个姓名彩蛋横幅保留（精确匹配）
        const msg = EGGS[raw];
        if (msg) { showEgg(msg); }
      }
    }); // init
  })();
  