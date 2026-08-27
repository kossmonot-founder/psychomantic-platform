import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      // Vendoring : le build du package UI est copié dans vendor/ui-react
      // (scripts/sync-ui.sh). Remplacé par le package npm quand publié.
      '@psychomantic/ui-react/styles.css': path.resolve(__dirname, 'vendor/ui-react/ui-react.css'),
      '@psychomantic/ui-react': path.resolve(__dirname, 'vendor/ui-react/index.js'),
    },
  },
});
