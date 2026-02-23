import { build } from 'esbuild'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

// Read the HTML template and embed it in the worker
const htmlPath = path.resolve(root, 'dist/client/index.html')
const htmlTemplate = fs.readFileSync(htmlPath, 'utf-8')

await build({
  entryPoints: [path.resolve(root, 'src/worker/index.js')],
  bundle: true,
  format: 'esm',
  outfile: path.resolve(root, 'dist/worker/index.js'),
  platform: 'browser',
  target: 'es2022',
  conditions: ['worker', 'browser'],
  external: ['node:*', 'util', 'crypto', 'async_hooks', 'stream'],
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
    '__HTML_TEMPLATE__': JSON.stringify(htmlTemplate),
  },
  plugins: [
    {
      name: 'resolve-ssr',
      setup(b) {
        // Redirect entry-server import to Vite-built version (has framer-motion shim baked in)
        b.onResolve({ filter: /entry-server/ }, () => ({
          path: path.resolve(root, 'dist/server/entry-server.js'),
        }))
      },
    },
  ],
})

// Remove index.html from client assets so the worker handles document requests
fs.unlinkSync(htmlPath)

console.log('Worker bundle built → dist/worker/index.js')
