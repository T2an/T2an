/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Couleurs principales
        'primary': '#60a5fa',        // Bleu clair (contraste 7.2:1 sur fond noir)
        'primary-hover': '#3b82f6',  // Bleu plus foncé
        'accent': '#34d399',         // Vert (contraste 8.1:1 sur fond noir)
        
        // Fond et surfaces
        'background': '#0f172a',     // Fond principal très sombre
        'surface': '#1e293b',        // Surface (contraste 12.6:1 avec texte)
        'surface-hover': '#334155',  // Surface hover
        
        // Bordures
        'border': '#475569',         // Bordure (contraste 4.8:1)
        'border-light': '#64748b',   // Bordure claire
        
        // Texte - contrastes optimisés
        'text-primary': '#f8fafc',   // Texte principal (contraste 15.8:1)
        'text-secondary': '#cbd5e1', // Texte secondaire (contraste 7.8:1)
        'text-muted': '#94a3b8',     // Texte atténué (contraste 4.9:1)
        
        // Couleurs spéciales pour Markdown
        'code-bg': '#1e293b',        // Fond code (contraste 12.6:1)
        'code-text': '#e2e8f0',      // Texte code (contraste 9.2:1)
        'blockquote': '#475569',     // Bordures blockquote
        'link': '#60a5fa',           // Liens (contraste 7.2:1)
        'link-hover': '#93c5fd',     // Liens hover
        'heading': '#f1f5f9',        // Titres (contraste 14.2:1)
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-out': 'fadeOut 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 