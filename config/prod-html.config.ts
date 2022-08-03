import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: InlineConfig = {
  mode: 'production',
  outDir: 'dist',
  base: "./",
  emptyOutDir: true,
  plugins: [vue()]
};

export default config;
