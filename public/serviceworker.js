importScripts("/src/js/idb.js");

self.addEventListener("install", function (event) {
  console.log("[service Worker] installing service worker ...", event);
  event.waitUntil(
    caches.open("static-v2").then(function (cache) {
      console.log("[serviceWorker] prefeching app shell");
      cache.addAll([
        '/',
        '/index.html',
        "/offline.html",
        "/src/js/material.min.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/js/idb.js",
        // "/src/images/main-image.jpg",
        // "/src/images/artboard.png",
        // "https://httpbin.org/get",

        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/images/icons/app-icon-144x144.png",
        "/src/images/icons/apple-icon-144x144.png",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
        "/manifest.json",
        "https://fonts.gstatic.com/s/materialicons/v135/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
        
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[service Worker] activating service worker ...", event);
  event.waitUntil(
    caches.keys().then(keylist=>{
      return Promise.all(keylist.map((key)=>{
        if(key !=="static-v2" && key !=="daynamic"){
          console.log("removing old cache");
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim();
});

let dbPromise = idb.open('feed-store',1,function(db){
  if(!db,objectStoresNames.contains('posts')){
    db.createObjectStore('posts',{keypath:"id"})
  }
})
self.addEventListener("fetch", function (event) {
  // console.log("[service Worker] fetching something ...", event);
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
        .then(res => {
          return caches.open('dynamic').then(cache=>{
            cache.put(event.request.url,res.clone());
            return res
          })
        })
      }
    }).catch(error=>{
      return caches.open("static-v2")
      .then(response=>{
        return response.match("/offline.html")
      })
    })
  );
});
