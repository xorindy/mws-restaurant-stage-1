/* REGISTER A SERVICE WORKER */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker Registered');
      })
      .catch(function(err) {
        console.log('Service Worker Registration Failed', err);
      })
  }