import {defineConfig} from 'astro/config';
import {existsSync} from 'node:fs';
if(existsSync('.env'))process.loadEnvFile('.env');
if(process.env.SITE_URL){const url=new URL(process.env.SITE_URL);if(url.protocol!=='https:'||/(^|\.)esperanzacoachingcollective\.com$/i.test(url.hostname))throw new Error('SITE_URL must be an independent HTTPS deployment origin.');}
export default defineConfig({site:process.env.SITE_URL||undefined,base:process.env.BASE_PATH||'/',output:'static',trailingSlash:'always'});
