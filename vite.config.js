import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  publicPath: '',
  base: '',
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  plugins: [
    // mkcert(),
    vue({
      template: {
        compilerOptions: {
          // isCustomElement: (tag) => ['md-linedivider'].includes(tag),
        },
      },
    })
 
  ],
  // build:{
  //   lib:{
  //     entry: resolve(__dirname, 'src/editor.js'),
  //     name:'Editor',
  //     fileName:'editor',
  //     formats: ['cjs', 'es'],
  //   }
  // }
});
