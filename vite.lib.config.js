import { defineConfig } from 'vite'
import { resolve } from 'path'

// Configuration for building the library
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/editor.js'),
      name: 'LabelBakerEditor',
      fileName: (format) => `labelbaker-editor.${format}.js`,
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      external: [
        'konva',
        'qrcode',
        'jsbarcode'
      ],
      output: {
        globals: {
          konva: 'Konva',
          qrcode: 'QRCode',
          jsbarcode: 'JsBarcode'
        },
        exports: 'named',
        dir: 'dist/lib',
        entryFileNames: `[name].[format].js`,
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}) 