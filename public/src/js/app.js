var deferrtPrompt;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceworker.js")
  .then(function(){
      console.log("service worker registerd");
  })
}

window.addEventListener('beforeinstallprompt',function(event){
    event.preventDefault()
    deferrtPrompt=event
    return false
})