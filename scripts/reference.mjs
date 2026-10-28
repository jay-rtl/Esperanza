import {mkdir,writeFile} from 'node:fs/promises';
const base='https://esperanzacoachingcollective.com';
await mkdir('reference',{recursive:true});
for(const [name,path] of [['home','/'],['pages','/wp-json/wp/v2/pages?per_page=100'],['media','/wp-json/wp/v2/media?per_page=100'],['sitemap','/wp-sitemap.xml']]){
 const res=await fetch(base+path);const body=await res.text();await writeFile(`reference/${name}.${name==='pages'||name==='media'?'json':'html'}`,body);console.log(name,res.status,body.length);
}
