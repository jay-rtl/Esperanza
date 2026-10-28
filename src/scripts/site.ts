import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Keep content and anchor offsets in step with the real fixed-header height,
// including resized text and viewport changes. CSS supplies the no-JS fallback.
const header = document.querySelector<HTMLElement>('.site-header');
const headerObserver = header ? new ResizeObserver(() => {
 document.documentElement.style.setProperty('--header-height',`${header.getBoundingClientRect().height}px`);
}) : undefined;
if(header)headerObserver?.observe(header);

// The native dialog supplies focus containment and makes the page behind it inert.
const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const dialog = document.querySelector<HTMLDialogElement>('#navigation-dialog');
const closeButton = document.querySelector<HTMLButtonElement>('.menu-close');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileMenu = window.matchMedia('(max-width: 760px)');
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let openingFrame = 0;
let closing = false;

function finishMenuClose() {
 if (!dialog || !menu) return;
 clearTimeout(closeTimer);
 dialog.classList.remove('is-open');
 if (dialog.open) dialog.close();
 document.documentElement.classList.remove('menu-open');
 menu.setAttribute('aria-expanded', 'false');
 closing = false;
 const returnFocus=mobileMenu.matches?menu:document.querySelector<HTMLElement>('.desktop-nav a[aria-current="page"]')||document.querySelector<HTMLElement>('.desktop-nav a');
 returnFocus?.focus({preventScroll:true});
}

function closeMenu() {
 if (!dialog?.open || closing) return;
 closing = true;
 cancelAnimationFrame(openingFrame);
 dialog.classList.remove('is-open');
 menu?.setAttribute('aria-expanded', 'false');
 if (reducedMotion.matches) finishMenuClose();
 else closeTimer = setTimeout(finishMenuClose, 440);
}

if (menu && dialog && closeButton) {
 menu.hidden = false;
 menu.addEventListener('click', () => {
  if(!mobileMenu.matches)return;
  if (dialog.open) {closeMenu();return;}
  clearTimeout(closeTimer);
  closing = false;
  dialog.showModal();
  document.documentElement.classList.add('menu-open');
  menu.setAttribute('aria-expanded','true');
  // A synchronous layout establishes the transition's starting frame.
  void dialog.offsetHeight;
  openingFrame = requestAnimationFrame(() => dialog.classList.add('is-open'));
  closeButton.focus({preventScroll:true});
 });
 closeButton.addEventListener('click',closeMenu);
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeMenu();});
 dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const controls=[...dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex="0"]')].filter(el=>el.getClientRects().length>0);
  const first=controls[0];
  const last=controls[controls.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
 });
 dialog.addEventListener('click',event=>{if(event.target===dialog)closeMenu();});
 dialog.addEventListener('close',()=>{
  clearTimeout(closeTimer);
  dialog.classList.remove('is-open');
  document.documentElement.classList.remove('menu-open');
  menu.setAttribute('aria-expanded','false');
  closing=false;
 });
 reducedMotion.addEventListener('change',()=>{if(closing&&reducedMotion.matches)finishMenuClose();});
 mobileMenu.addEventListener('change',()=>{
  if(!mobileMenu.matches&&dialog.open){cancelAnimationFrame(openingFrame);finishMenuClose();}
 });
}

gsap.registerPlugin(ScrollTrigger);
const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)',()=>{
 const hero=document.querySelector('.hero-title');
 if(hero)gsap.from(hero,{y:18,duration:.75,ease:'power2.out',clearProps:'all'});
 gsap.utils.toArray<HTMLElement>('.section h2').forEach(heading=>{
  gsap.from(heading,{y:20,duration:.8,ease:'power2.out',clearProps:'all',scrollTrigger:{trigger:heading,start:'top 95%',once:true}});
 });
 gsap.utils.toArray<SVGPathElement>('.botanical path').forEach(path=>{
  const length=path.getTotalLength();
  gsap.fromTo(path,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:1.5,ease:'power2.inOut',clearProps:'strokeDasharray,strokeDashoffset',scrollTrigger:{trigger:path,start:'top 95%',once:true}});
 });
});

window.addEventListener('pagehide',()=>{
 headerObserver?.disconnect();
 motion.revert();
 clearTimeout(closeTimer);
 cancelAnimationFrame(openingFrame);
 if(dialog?.open)dialog.close();
 document.documentElement.classList.remove('menu-open');
},{once:true});

// Submission remains independent: never fall back to the original WordPress site.
for(const form of document.querySelectorAll<HTMLFormElement>('form[data-endpoint]')) {
 form.querySelector<HTMLButtonElement>('[data-submit]')!.type='submit';
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const status=form.querySelector<HTMLElement>('.form-status')!;
  status.textContent='';
  let firstInvalid:HTMLInputElement|undefined;
  for(const field of form.querySelectorAll<HTMLInputElement>('input[required]')) {
   const error=document.getElementById(field.getAttribute('aria-describedby')||'');
   const invalid=!field.checkValidity()||(field.type!=='checkbox'&&!field.value.trim());
   field.setAttribute('aria-invalid',String(invalid));
   if(error)error.textContent=invalid?(field.type==='email'?'Please enter a valid email address.':field.type==='checkbox'?'Please confirm your consent.':'Please enter your first name.'):'';
   if(invalid&&!firstInvalid)firstInvalid=field;
  }
  if(firstInvalid){firstInvalid.focus();status.textContent='Please check the highlighted fields.';return;}
  const endpoint=form.dataset.endpoint;
  if(!endpoint){
   status.textContent=form.dataset.kind==='guide'?'The guide request service is not connected yet. No information has been sent or saved.':'Online inquiries are not connected yet. Please email or call Michelle. No information has been sent or saved.';
   return;
  }
  const data=Object.fromEntries(new FormData(form));
  if(data.website){status.textContent='This request could not be submitted.';return;}
  const button=form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  button.disabled=true;
  form.setAttribute('aria-busy','true');
  status.textContent='Sending your request…';
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,kind:form.dataset.kind}),credentials:'omit',signal:AbortSignal.timeout(15000)});
   const result=await response.json();
   if(!response.ok||result.accepted!==true)throw new Error('Not accepted');
   status.textContent='Your request has been accepted. Thank you for getting in touch.';
   form.reset();
  }catch{
   status.textContent='Your request could not be confirmed. Please try again or contact Michelle directly.';
  }finally{
   button.disabled=false;
   form.removeAttribute('aria-busy');
  }
 });
}
