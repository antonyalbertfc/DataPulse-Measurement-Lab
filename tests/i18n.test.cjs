const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
const script=fs.readFileSync(path.join(root,'dist/i18n.js'),'utf8');
const prefix='window.DataPulseMessages = ';
const start=script.indexOf(prefix)+prefix.length;
const messages=JSON.parse(script.slice(start,script.indexOf(';',start)));
test('every translation has all three nonempty languages',()=>{
  for(const [source,values] of Object.entries(messages))
    for(const lang of ['pt-BR','en','es'])
      assert.ok(typeof values[lang]==='string'&&values[lang].trim(),source+' / '+lang);
});
test('all translatable HTML text and accessible attributes have catalog entries',()=>{
  const unchanged=new Set(['Data','Pulse','Marketing Analytics','Business Intelligence','DEMO','Português','English','Español']);
  const content=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'');
  const values=[...content.matchAll(/>([^<>]+)</g)].map(m=>m[1].trim());
  for(const m of content.matchAll(/(?:aria-label|placeholder|content)="([^"]+)"/g)) values.push(m[1]);
  const missing=values.filter(v=>/\p{L}/u.test(v)&&!unchanged.has(v)&&!messages[v]&&!v.startsWith('width=')&&v!=='#090c13');
  assert.deepEqual([...new Set(missing)],[]);
});
test('measurement selectors and consent loader remain independent of language',()=>{
  for(const token of ['id="lead-form"','id="success"','class="whatsapp-link"','value="measurement"','id="consent-analytics"'])
    assert.ok(html.includes(token),token);
  assert.ok(html.indexOf('src="i18n.js"')<html.indexOf('src="tracking.js"'));
  assert.ok(!script.includes('dataLayer.push'));
  assert.ok(!html.includes('googletagmanager.com/ns.html'));
});

