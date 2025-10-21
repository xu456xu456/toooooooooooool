export async function onRequest(context) {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // Only act on root path
  if (pathname !== "/") return await context.next();

  // Honor manual choice via cookie
  const cookie = context.request.headers.get("Cookie") || "";
  const m = cookie.match(/(?:^|;\s*)lang=([a-z-]+)(?:;|$)/i);
  if (m && m[1]) {
    url.pathname = m[1] === "en" ? "/" : `/${m[1]}/`;
    return Response.redirect(url.toString(), 302);
  }

  // Guess by country / Accept-Language
  const cf = context.request.cf || {};
  const country = (cf.country || "").toUpperCase();
  const accept = (context.request.headers.get("Accept-Language") || "").toLowerCase();

  const mapByCountry = {
    "PH": "ph",
    "ID": "id",
    "VN": "vi",
    "BD": "bn",
    "NG": "ng",
    "KE": "sw",
    "TZ": "sw",
    "SA": "ar","AE":"ar","EG":"ar","DZ":"ar","MA":"ar","QA":"ar","KW":"ar","BH":"ar","OM":"ar","JO":"ar","LB":"ar","LY":"ar","TN":"ar","YE":"ar","IQ":"ar"
  };

  let lang = mapByCountry[country];

  if (!lang) {
    if (accept.includes("ar")) lang = "ar";
    else if (accept.includes("sw")) lang = "sw";
    else if (accept.includes("en-ng")) lang = "ng";
    else if (accept.includes("bn")) lang = "bn";
    else if (accept.includes("vi")) lang = "vi";
    else if (accept.includes("id")) lang = "id";
    else if (accept.includes("tl") || accept.includes("fil")) lang = "ph";
  }

  if (!lang || lang === "en") return await context.next();

  url.pathname = `/${lang}/`;
  return Response.redirect(url.toString(), 302);
}
