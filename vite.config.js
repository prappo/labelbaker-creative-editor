import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  base: '/labelbaker-creative-editor/',
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
        },
      },
    })
  ],
});
