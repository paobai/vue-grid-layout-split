import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import external from '../plugins/vite-plugin-external';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";



const config: InlineConfig = {
  mode: 'production',
  publicDir: false,
  build: {
    cssCodeSplit: false,
    target: 'modules',
    outDir: 'lib',
    emptyOutDir: true,
    minify: false,
    brotliSize: false,
    rollupOptions: {
      input: ['src/components/index.ts'],
      // output: [
      //   {
      //     format: 'es',
      //     dir: 'es',
      //     entryFileNames: '[name].js',
      //     preserveModules: true,
      //     preserveModulesRoot: 'components',
      //   },
      //   {
      //     format: 'umd',
      //     dir: 'lib',
      //     entryFileNames: '[name].js',
      //     preserveModules: true,
      //     preserveModulesRoot: 'components',
      //   },
      // ],
    },
    // 开启lib模式，但不使用下面配置
    lib: {
      name: "vue-grid-layout-split",
      entry: 'src/components/index.ts',
      formats: ['cjs', 'umd', 'es'],
    },
  },
  // @ts-ignore vite内部类型错误
  plugins: [external(), vue(), vueJsx(), vueExportHelper(), cssInjectedByJsPlugin()],
};

export default config;
