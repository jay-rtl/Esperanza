/** Works at a domain root or a GitHub Pages project subdirectory. */
export function withBase(path: string): string {
 const base=import.meta.env.BASE_URL.replace(/\/?$/, '/');
 return path.startsWith('/')&&!path.startsWith('//')?base+path.slice(1):path;
}
