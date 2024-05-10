// @ts-nocheck

// Service Worker 脚本
const CACHE_NAME = 'index-js-cache';
const urlsToCache = [
  'index.js'
];

self.addEventListener('install', event => {
  // 安装 Service Worker 时，将文件缓存起来
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 检查缓存中是否存在请求的资源
        if (response) {
          // 如果存在，直接返回缓存的资源
          return response;
        }

        // 如果缓存中不存在请求的资源，从网络中获取
        return fetch(event.request)
          .then(response => {
            // 将获取的资源添加到缓存中
            return caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, response.clone());
                return response;
              });
          });
      })
  );
});

// 注册
if ('serviceWorker' in navigator) {
  // 注册 Service Worker
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
} else {
  console.log('Service Worker is not supported');
}