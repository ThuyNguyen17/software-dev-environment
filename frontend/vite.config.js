<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/Update-UX/UI






<<<<<<< HEAD



=======
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
<<<<<<< HEAD
})
=======
>>>>>>> remotes/origin/Update-UX/UI
  server: {
    host: true,
    allowedHosts: [
      'unmilitarized-sylvester-workable.ngrok-free.dev' // Thay b?ng mã ngrok 5173 c?a b?n
      'unmilitarized-sylvester-workable.ngrok-free.dev'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
<<<<<<< HEAD
}) 
=======
}) 
>>>>>>> fix-final
>>>>>>> remotes/origin/Update-UX/UI
