import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Importa o plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Adiciona o plugin à lista
  ],
<<<<<<< Updated upstream
});
=======
})
>>>>>>> Stashed changes
