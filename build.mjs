// XNEIDER wealth - logo PNG transparente, papel timbrado e cartao de visitas (PDF).
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = path.resolve(here, '../../scratchpad_build/xneider/tmp');
fs.mkdirSync(tmp, { recursive: true });
const CHROME = 'C:/Users/ServerRG/.cache/puppeteer/chrome/win64-149.0.7827.22/chrome-win64/chrome.exe';
const BRAND = '#0d0d0d', EMBER = '#e8643a', GREY = '#6b6b6b';
const FONT = `<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700;800&display=swap" rel="stylesheet">`;
const banker = { slug: 'douglas-schneider', nome: 'Douglas Schneider', email: 'douglas@gruposchneider.com.br', tel: '+55 (21) 99322-9634' };

// icone: X de dois tracos; o traco ascendente em ember (crescimento)
const mark = (a = BRAND, b = EMBER) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="mark">
<path d="M14 14 L86 86" stroke="${a}" stroke-width="16" fill="none"/>
<path d="M14 86 L86 14" stroke="${b}" stroke-width="16" fill="none"/>
</svg>`;
const lockupCss = (ink, sub) => `.lockup{display:inline-flex;align-items:center;gap:.42em;font-family:'Manrope',sans-serif}
.lockup .mark{height:1em;width:1em;flex:none}.lockup .t{display:flex;flex-direction:column;line-height:1;align-items:flex-start}
.lockup .n{font-weight:800;letter-spacing:.12em;color:${ink};font-size:.52em;margin-right:-.12em}
.lockup .w{font-weight:400;color:${sub};font-size:.3em;letter-spacing:.62em;margin-top:.55em;text-transform:lowercase}`;
const lockup = (a, b) => `<div class="lockup">${mark(a, b)}<div class="t"><span class="n">XNEIDER</span><span class="w">wealth</span></div></div>`;

const browser = await puppeteer.launch({ headless: true, executablePath: CHROME });
const open = async (html, name, vp) => {
  const f = path.join(tmp, name); fs.writeFileSync(f, html);
  const p = await browser.newPage(); if (vp) await p.setViewport(vp);
  await p.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 300)); return p;
};
async function logoPng(file, a, b, ink, sub) {
  const html = `<!doctype html><meta charset="utf-8">${FONT}<style>html,body{margin:0;background:transparent}#stage{display:inline-block;padding:44px 56px 40px;font-size:300px}${lockupCss(ink, sub)}</style><div id="stage">${lockup(a, b)}</div>`;
  const p = await open(html, 'logo.html', { width: 2800, height: 1000, deviceScaleFactor: 2 });
  await (await p.$('#stage')).screenshot({ path: path.join(here, file), omitBackground: true }); await p.close();
}
await logoPng('xneider-wealth-logo.png', BRAND, EMBER, BRAND, GREY);
await logoPng('xneider-wealth-logo-branco.png', '#ffffff', EMBER, '#ffffff', '#b9b9b9');
{
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:transparent}#s{display:inline-block;width:512px;height:512px}.mark{width:100%;height:100%}</style><div id="s">${mark('#ffffff', EMBER)}</div>`;
  const p = await open(html, 'icon.html', { width: 600, height: 600 });
  await (await p.$('#s')).screenshot({ path: path.join(here, 'xneider-wealth-icone.png'), omitBackground: true }); await p.close();
}
const icoPhone = `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="12" fill="${BRAND}"/><path d="M8.2 6.6c.4-.4 1-.4 1.3.1l1 1.6c.2.4.2.8-.1 1.1l-.7.7c.6 1.2 1.6 2.2 2.8 2.8l.7-.7c.3-.3.8-.3 1.1-.1l1.6 1c.5.3.5.9.1 1.3l-.8.8c-.6.6-1.5.8-2.3.5-3-1.1-5.1-3.2-6.2-6.2-.3-.8-.1-1.7.5-2.3z" fill="#fff"/></svg>`;
const icoMail = `<svg viewBox="0 0 24 24" width="100%" height="100%"><rect x="1" y="5" width="22" height="14" rx="1.5" fill="${BRAND}"/><path d="M2 6.5l10 7 10-7" fill="none" stroke="#fff" stroke-width="1.6"/></svg>`;
{
  const b = banker;
  const html = `<!doctype html><meta charset="utf-8">${FONT}<style>@page{size:210mm 297mm;margin:0}*{box-sizing:border-box}html,body{margin:0}
.pg{position:relative;width:210mm;height:297mm;overflow:hidden;background:#fff;font-family:'Manrope',sans-serif}
.logo{position:absolute;left:16mm;top:11mm;font-size:24mm}${lockupCss(BRAND, GREY)}
svg.bg{position:absolute;inset:0;width:100%;height:100%}
.ct{position:absolute;left:17.5mm;bottom:15.8mm;color:#3a3a3a;font-size:4.1mm;font-weight:300;line-height:1}
.ct div{display:flex;align-items:center;gap:2.2mm;margin-top:2.4mm}.ct i{display:block;width:5.4mm;height:5.4mm}</style>
<div class="pg"><svg class="bg" viewBox="0 0 1414 2000" preserveAspectRatio="none">
<rect x="975" y="235" width="554" height="3.4" fill="${EMBER}"/>
<path d="M0 1917 H870 Q955 1917 955 1832 H1414 V2000 H0 Z" fill="${BRAND}"/>
<path d="M955 1832 H1414 V1850 H963 Q960 1840 955 1832 Z" fill="${EMBER}"/></svg>
<div class="logo">${lockup(BRAND, EMBER)}</div>
<div class="ct"><div><i>${icoPhone}</i>${b.tel}</div><div><i>${icoMail}</i>${b.email}</div></div></div>`;
  const p = await open(html, 'pt.html');
  await p.pdf({ path: path.join(here, `xneider-wealth-papel-timbrado-${b.slug}.pdf`), printBackground: true, preferCSSPageSize: true }); await p.close();
}
{
  const b = banker;
  const html = `<!doctype html><meta charset="utf-8">${FONT}<style>@page{size:90mm 50mm;margin:0}*{box-sizing:border-box}html,body{margin:0}
.c{position:relative;width:90mm;height:50mm;overflow:hidden;page-break-after:always;font-family:'Manrope',sans-serif}
.f{background:${BRAND};display:flex;align-items:center;justify-content:center}.f::before{content:'';position:absolute;inset:4.2mm;border:.3mm solid ${EMBER}}
.f .lockup{font-size:12.5mm}${lockupCss('#fff', '#b9b9b9')}
.v{background:#fff;color:${BRAND};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.v::before{content:'';position:absolute;inset:4.2mm;border:.3mm solid ${BRAND}}
.v .brand{font-weight:800;font-size:4.9mm;letter-spacing:.14em;margin-right:-.14em;line-height:1}
.v .brand2{font-weight:400;font-size:2.5mm;letter-spacing:.5em;margin:.9mm -.5em 0 0;color:${EMBER}}
.v .nome{font-weight:500;font-size:4.7mm;margin-top:3.4mm;line-height:1}
.v .cargo{font-weight:500;font-size:1.9mm;letter-spacing:.14em;text-transform:uppercase;color:${EMBER};margin-top:1.4mm}
.v .l{font-weight:300;font-size:2.9mm;margin-top:1.1mm;color:#3a3a3a}.v .l:first-of-type{margin-top:3mm}</style>
<div class="c f">${lockup('#ffffff', EMBER)}</div>
<div class="c v"><span class="brand">XNEIDER</span><span class="brand2">wealth</span><span class="nome">${b.nome}</span><span class="cargo">Planejamento patrimonial</span><span class="l">${b.tel}</span><span class="l">${b.email}</span></div>`;
  const p = await open(html, 'cv.html');
  await p.pdf({ path: path.join(here, `xneider-wealth-cartao-visita-${b.slug}.pdf`), printBackground: true, preferCSSPageSize: true }); await p.close();
}
await browser.close(); console.log('ok');
