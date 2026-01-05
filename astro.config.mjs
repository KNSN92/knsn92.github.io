// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  base: "/",
  site: "https://knsn92.github.io",
  image: {

  },
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
    },
    syntaxHighlight: "shiki",
  },
  vite: {
    plugins: [tailwindcss()]
  },
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "NerdSymbols",
        cssVariable: "--font-nerdsymbols",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/SymbolsNerdFont-Regular.ttf"]
          }
        ]
      }
    ]
  }
});
