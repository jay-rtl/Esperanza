import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('public/fonts/licenses',{recursive:true});
for(const family of ['dmsans','dmserifdisplay']){const response=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);if(!response.ok)throw new Error('License unavailable');await writeFile(`public/fonts/licenses/${family}-OFL.txt`,await response.text());}
