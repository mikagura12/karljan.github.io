'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "009c9e65172e010890f7f65fde438006",
"index.html": "20d996817d46bfc43241a4e5557cd303",
"/": "20d996817d46bfc43241a4e5557cd303",
"main.dart.js": "92782332e73bc0d921771b254ae33990",
"favicon.png": "b5f82968338061b7d4ec749a2e27b325",
"icons/Icon-192.png": "7731d5d1b5fa99cd69920b271c4f5cbb",
"icons/Icon-512.png": "9927874f8d0adf17e7cb09034f99bea6",
"manifest.json": "a83bbbd9d23ea4d752fbcd44cdc544fa",
"assets/AssetManifest.json": "294410e7294be598c5ae71a2d4a5468c",
"assets/NOTICES": "f7bc9e1dc58ef80058f9d23fd474e7b8",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b14fcf3ee94e3ace300b192e9e7c8c5d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dffd9504fcb1894620fa41c700172994",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "4b6a9b7c20913279a3ad3dd9c96e155b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "00bb2b684be61e89d1bc7d75dee30b58",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/download.png": "238bbd1132e38a6e4a442044c9bf4ed7",
"assets/assets/python.png": "aa12d4ed8c4291f93b76c4a7abf87be7",
"assets/assets/reginaldo1.png": "1573f5776c4e9fcd1438742bf6f18718",
"assets/assets/flutter.png": "59be21f1c01993fafae1aaf7cfd9922f",
"assets/assets/intro_right_pic_2.png": "c65d0cc0ba0be70afb36b8e9129abf34",
"assets/assets/intro_right_pic.png": "34dbea8fc6653a2d235ed773155003f0",
"assets/assets/projects/safeguard.png": "93a044baf72b1cc97c9c19cdbbb14468",
"assets/assets/projects/storagex.png": "42f831d427681c9583fd81046c59ea78",
"assets/assets/projects/bmi_mockup.png": "13fb8cd045854754f8576eafdb4f0539",
"assets/assets/projects/cvsu_portal.png": "064565aa1eca74dbe4af7ac0120c3022",
"assets/assets/projects/century.png": "04d5b5266ee981d1d839df0ec08ea362",
"assets/assets/projects/curious_digit.png": "08e9c4daea1183cb92f78a21860b91e0",
"assets/assets/projects/the_movie.gif": "a4b2936530dfb22fd037b332ee8251ff",
"assets/assets/projects/todo_list.png": "344ee8ca296c9217e2a36bab7b3c786d",
"assets/assets/reso_coder.png": "23a3b07e7dd030831fe1cfd87709fc00",
"assets/assets/java.png": "746ad484ace42badc7d28502d527df46",
"assets/assets/intro_right_pic_1.png": "2084346bb36a1958fdcfae78a86df0cc",
"assets/assets/downloadios.png": "b8e4164dcd174098fa4c3ba48b5af4b9",
"assets/assets/intro_right_pic_w_text.png": "d9b831a6d5bce695a6ffc777b4b0e44c",
"assets/assets/reginaldo.JPG": "8ce813eb2f4a07d8f312e49d49b8f746",
"assets/assets/reginaldo.png": "dfb3ae917d8207f3d14435c6a649a228",
"assets/assets/reginaldo.JPG.png": "4b28f61c79a68919f8e6aa37f639db8d",
"assets/assets/udemy.png": "78c8f84ac83bb1e241df2df0de2515f7",
"assets/assets/flutter_ph.png": "21c4ae78093f42e3da9ac273fe611931",
"assets/assets/dart.png": "d8e0402a16720f0cc7c5be7964875e76",
"assets/assets/downloadandroid.png": "e2b12e10df97d6f1d1844d0bf6a14564",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
