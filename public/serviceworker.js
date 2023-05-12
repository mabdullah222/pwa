const CACHE_NAME="version-1"
urls_to_cache=['index.html','offline.html']
const self=this;
// install sw 
// self represents the serviceworker itself
self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache=>{
            console.log("Cache Opened");
            return cache.addAll(urls_to_cache);
        })
    )
})

// listen for the requests
self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).then(()=>{
            return fetch(event.request).catch(()=>{caches.match('offline.html')})
        })
    )
})

// Activate the Sw
self.addEventListener('activate',(event)=>{
    const cacheWhiteList=[]
    cacheWhiteList.push(CACHE_NAME)
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            cacheNames.map((cacheName)=>{
                if (!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        })
    )
})
