export function route(){return location.hash.slice(1)||'/dashboard'}
export function onRoute(fn){addEventListener('hashchange',()=>fn(route()));fn(route())}
