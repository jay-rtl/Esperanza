import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch();const page=await browser.newPage();await mkdir('reference/screenshots',{recursive:true});
for(const route of ['', 'about-me/', 'service/', 'contact/']){await page.goto('https://esperanzacoachingcollective.com/'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(800);for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=600){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(150);}await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'reference/screenshots/'+(route.replace('/','')||'home')+'.png',fullPage:true});console.log(route||'home',await page.title());}
await page.setViewportSize({width:390,height:844});await page.goto('https://esperanzacoachingcollective.com/');await page.screenshot({path:'reference/screenshots/mobile.png',fullPage:true});
await browser.close();
