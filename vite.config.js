import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Permite que la web funcione en GitHub Pages y cualquier servidor sin pantalla en blanco
  envPrefix: ['VITE_', 'SUPABASE_', 'NEXT_PUBLIC_'], // Soporta prefijos de Vite, Supabase y Next.js
})
