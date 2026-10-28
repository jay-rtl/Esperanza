import type {APIRoute} from 'astro';
import {withBase} from '../utils/paths';
export const GET:APIRoute=()=>{const site=import.meta.env.SITE_URL;const ready=site&&import.meta.env.PUBLIC_LAUNCH_READY==='true';return new Response(ready?`User-agent: *\nAllow: /\nSitemap: ${new URL(withBase('/sitemap.xml'),site).href}\n`:'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain'}})};
