if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/radio-dakwah/sw.js', { scope: '/radio-dakwah/' })})}