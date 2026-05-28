/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0A0A0B',
          2: '#111113',
          3: '#18181B',
        },
        edge: '#27272A',
        muted: '#71717A',
        dim: '#52525B',
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          soft: '#60A5FA',
          ghost: 'rgba(59,130,246,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#FAFAFA',
          },
        },
      },
    },
  },
  plugins: [],
};
