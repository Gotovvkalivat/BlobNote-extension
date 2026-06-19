import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync, statSync } from 'fs'
import { build as esbuild, type Plugin } from 'esbuild'

const contentAliasPlugin: Plugin = {
  name: 'content-alias',
  setup(build) {
    build.onResolve({ filter: /^@\// }, (args) => {
      const basePath = resolve(__dirname, 'src', args.path.slice(2))
      const candidates = [
        basePath,
        `${basePath}.ts`,
        `${basePath}.tsx`,
        `${basePath}.js`,
        `${basePath}.jsx`,
        resolve(basePath, 'index.ts'),
        resolve(basePath, 'index.tsx'),
      ]

      const path = candidates.find((candidate) => {
        if (!existsSync(candidate)) return false
        return statSync(candidate).isFile()
      })
      return path ? { path } : undefined
    })
  },
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest',
      async closeBundle() {
        const distDir = 'dist'
        if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })
        copyFileSync('manifest.json', `${distDir}/manifest.json`)
        await esbuild({
          entryPoints: ['src/content/index.tsx'],
          outfile: 'dist/src/content/index.js',
          bundle: true,
          format: 'iife',
          target: 'chrome110',
          platform: 'browser',
          jsx: 'automatic',
          define: {
            'process.env.NODE_ENV': '"production"',
          },
          plugins: [contentAliasPlugin],
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        base: resolve(__dirname, 'base.html'),
        templates: resolve(__dirname, 'templates.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        content: resolve(__dirname, 'src/content/index.tsx'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') return 'src/background/index.js'
          if (chunkInfo.name === 'content') return 'src/content/index.js'
          return 'assets/[name]-[hash].js'
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'assets/[name].[ext]'
          return 'assets/[name]-[hash].[ext]'
        },
      },
    },
  },
})

