// Project-wide global declarations for asset imports
declare module '*.css';
declare module '*.module.css';
declare module '*.scss';
declare module '*.module.scss';
declare module '*.sass';
declare module '*.module.sass';

// Explicit fallbacks for side-effect global CSS imports used by Next.js app router
// Covers imports like `import './globals.css'` from `src/app/layout.tsx`
declare module './globals.css';
declare module '*/globals.css';
export { };
