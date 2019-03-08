/* eslint-disable no-undef */

if (typeof workbox === 'undefined') {
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
}

if (workbox) {
    workbox.loadModule('workbox-core');
    workbox.loadModule('workbox-routing');
    workbox.loadModule('workbox-strategies');
    workbox.loadModule('workbox-cache-expiration');

    console.log('Yay! Workbox is loaded 🎉');
} else {
    console.log('Boo! Workbox didn\'t load 😬');
}

export default workbox;
