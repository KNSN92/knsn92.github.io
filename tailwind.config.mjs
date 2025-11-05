/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        short: { raw: '(height >= 400px)' },
        tall: { raw: '(height >= 600px)' },
        grande: { raw: '(height >= 800px)' },
      }
    }
  }
}