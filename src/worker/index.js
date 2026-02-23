import { render } from '../entry-server.jsx' // redirected to Vite-built version by esbuild
import { getMetaTags } from '../seo/metadata.js'

// Injected at build time by build-worker.js via esbuild define
/* global __HTML_TEMPLATE__ */
const HTML_TEMPLATE = __HTML_TEMPLATE__

const BOT_UA =
  /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|applebot|pinterestbot|redditbot|embedly|quora|showyoubot|outbrain|rogerbot|ia_archiver/i

function isBot(ua) {
  return BOT_UA.test(ua || '')
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Serve static assets directly (everything except document requests)
    if (url.pathname !== '/' && url.pathname !== '/index.html') {
      return env.ASSETS.fetch(request)
    }

    try {
      let html = HTML_TEMPLATE

      // Inject SEO meta tags for all users
      const seoTags = getMetaTags()
      html = html.replace('<!--seo-head-->', seoTags)

      const ua = request.headers.get('user-agent') || ''

      if (isBot(ua)) {
        // SSR for bots
        try {
          const appHtml = render()
          html = html.replace('<!--ssr-outlet-->', appHtml)
        } catch (e) {
          // SSR failed — serve SPA as fallback (bot sees empty div, better than 500)
          console.error('SSR render failed:', e)
        }
      }

      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      })
    } catch (e) {
      // Total failure — fall back to static asset serving
      console.error('Worker error:', e)
      return env.ASSETS.fetch(request)
    }
  },
}
