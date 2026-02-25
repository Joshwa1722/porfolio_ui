import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: isSsrBuild ? 'dist/server' : 'dist/client',
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: isSsrBuild
      ? { 'framer-motion': path.resolve(__dirname, 'src/ssr/framer-motion-shim.js') }
      : {},
  },
  ssr: {
    noExternal: isSsrBuild ? true : undefined,
  },
}))
