// Simple language switch helper. Add data-lang attr to links.
(function(){
  function rememberLang(e){
    var el = e.target.closest('[data-lang]');
    if(!el) return;
    var lang = el.getAttribute('data-lang');
    if(!lang) return;
    document.cookie = "lang="+lang+"; Max-Age="+(60*60*24*180)+"; Path=/; SameSite=Lax";
  }
  document.addEventListener('click', rememberLang, false);
})();
