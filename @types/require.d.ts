/**
 * Type declaration for CommonJS require() used in legacy code.
 * This enables dynamic requires in files like intersection-observer.tsx
 * that need to conditionally load polyfills at runtime.
 */
declare function require(moduleId: string): any;
