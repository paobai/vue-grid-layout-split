import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: InlineConfig = {
  mode: 'production',
  build:{
    emptyOutDir: true,
    outDir: 'docs',
  },
  base: "./",
  plugins: [vue()]
};

export default config;
