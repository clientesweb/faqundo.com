document.addEventListener("DOMContentLoaded", () => {
  // Verificar si el navegador está online o offline
  function updateOnlineStatus() {
    const statusElement = document.getElementById("online-status")
    if (statusElement) {
      if (navigator.onLine) {
        statusElement.textContent = "Estás conectado"
        statusElement.classList.remove("bg-red-500")
        statusElement.classList.add("bg-green-500")
        setTimeout(() => {
          statusElement.style.display = "none"
        }, 3000)
      } else {
        statusElement.textContent = "Estás offline - Algunas funciones pueden no estar disponibles"
        statusElement.classList.remove("bg-green-500")
        statusElement.classList.add("bg-red-500")
        statusElement.style.display = "block"
      }
    }
  }

  // Crear el elemento de estado si no existe
  if (!document.getElementById("online-status")) {
    const statusElement = document.createElement("div")
    statusElement.id = "online-status"
    statusElement.style.display = "none"
    statusElement.className = "fixed top-0 left-0 right-0 p-2 text-white text-center z-50"
    document.body.prepend(statusElement)
  }

  // Escuchar eventos de conexión
  window.addEventListener("online", updateOnlineStatus)
  window.addEventListener("offline", updateOnlineStatus)

  // Verificar estado inicial
  updateOnlineStatus()
})

