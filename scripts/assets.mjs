import {readFile,mkdir,writeFile} from 'node:fs/promises';
const pages=JSON.parse(await readFile('reference/pages.json','utf8'));
for(const p of pages.filter(p=>[12,59,61,68].includes(p.id)))console.log(p.slug,[...new Set([...p.content.rendered.matchAll(/(?:href|src|poster)=["']([^"']+)/g)].map(m=>m[1]))]);
await mkdir('public/images',{recursive:true});
const media=JSON.parse(await readFile('reference/media.json','utf8'));
for(const m of media.filter(m=>[98,51,39,11,7,5].includes(m.id))){const res=await fetch(m.source_url); const name=m.id===98?'story.mp4':m.id===11?'logo.png':m.id===7?'michelle.png':m.id===5?'portrait.jpg':m.id===39?'wordmark.png':'botanical.png';await writeFile('public/images/'+name,Buffer.from(await res.arrayBuffer()));console.log(name);}
