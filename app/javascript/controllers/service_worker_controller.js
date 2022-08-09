import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  connect() {
    if (navigator.serviceWorker) {
      if (navigator.serviceWorker.controller) {
        // If the service worker is already running, skip to state change
        this.stateChange();
      } else {
        // Register the service worker, and wait for it to become active
        navigator.serviceWorker
          .register("/service-worker.js", { scope: "./" })
          .then(function (reg) {
            console.log("[Companion]", "Service worker registered!");
            console.log(reg);
          });
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          this.controllerChange.bind(this)
        );
      }

      // navigator.serviceWorker.ready.then((registration) => {
      //   console.log('registered?', registration);
      //   registration.sync.register('sync-messages')
      // }).catch(() => console.log('background sync could not be registered!'))
    }
  }

  controllerChange(event) {
    navigator.serviceWorker.controller.addEventListener(
      "statechange",
      this.stateChange.bind(this)
    );
  }

  stateChange() {
    // perform any visual manipulations here
  }
}