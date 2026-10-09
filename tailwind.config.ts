import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { brand: '#16834a', pale: '#f2f7f2', ink: '#18231c' }, boxShadow: { soft: '0 8px 24px rgba(24,55,35,.06)' } } }, plugins: [] };
export default config;
