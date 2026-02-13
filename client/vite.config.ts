import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-core': ['@mui/material', '@mui/system'],
          'mui-icons': ['lucide-react'],
          // App chunks
          'auth': [
            './src/modules/auth/Login',
            './src/modules/auth/Register',
            './src/modules/auth/AuthGuard'
          ],
          'assets': [
            './src/modules/assets/AssetList',
            './src/modules/assets/AssetCreate'
          ],
          'requests': ['./src/modules/requests/RequestList'],
          'dashboard': ['./src/modules/dashboard/Dashboard'],
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
})
