// Registrar el Service Worker solo si es compatible con el navegador
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration.scope)
      })
      .catch((error) => {
        console.log("Error al registrar el Service Worker:", error)
      })
  })
}

