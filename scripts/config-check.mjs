import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
const site='https://esperanza-review.example';
const sitemap=await readFile('dist/sitemap.xml','utf8');assert.equal((sitemap.match(/<url>/g)||[]).length,8);assert.match(sitemap,/https:\/\/esperanza-review\.example/);assert.doesNotMatch(sitemap,/about-me|\/service\//);
for(const [route,canonical] of [['about-me','about'],['service','services'],['contact','contact']]){const html=await readFile(`dist/${route}/index.html`,'utf8');assert.ok(html.includes(`rel="canonical" href="${site}/${canonical}/"`));assert.ok(html.includes('content="index, follow"'));assert.ok(html.includes('"@type":"Organization"'));}
console.log('PASS: configured canonical origin, source-route aliases, public robots metadata, eight canonical sitemap URLs, Organization schema.');
