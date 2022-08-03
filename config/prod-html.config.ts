import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: InlineConfig = {
  mode: 'production',
  build:{
    outDir: 'docs',
  },
  base: "./",
  emptyOutDir: true,
  plugins: [vue()]
};

export default config;
