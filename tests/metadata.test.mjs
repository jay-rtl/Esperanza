import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('canonical pages retain unique metadata and public content',async()=>{
 const routes=['','about','services','why-us','reviews','contact','free-guide','privacy'];
 const titles=new Set(),descriptions=new Set();
 for(const route of routes){
  const html=await readFile(`dist/${route?route+'/':''}index.html`,'utf8');
  const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title);assert.ok(description);assert.equal(titles.has(title),false);assert.equal(descriptions.has(description),false);
  titles.add(title);descriptions.add(description);
  assert.equal((html.match(/<h1[\s>]/g)||[]).length,1);
  assert.ok(html.includes('id="navigation-dialog"'));
  assert.ok(html.includes('class="nojs-navigation"'));
 }
});
