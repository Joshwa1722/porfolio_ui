const SITE = {
  title: 'Joshwa | Full Stack Developer',
  description:
    'Full Stack Developer specializing in React.js, JavaScript, API integration, and AI-powered applications. Building modern web experiences with clean code and intuitive design.',
  url: 'https://joshwa.in',
  image: 'https://joshwa.in/profile.jpg',
  author: 'Joshwa',
  keywords:
    'Joshwa, Full Stack Developer, React Developer, JavaScript, API Integration, AI, NLQ, Web Developer, Frontend Developer, Portfolio',
  github: 'https://github.com/Joshwa1722',
  linkedin: 'https://www.linkedin.com/in/joshwa-m',
}

export function getMetaTags() {
  return `
    <meta name="description" content="${SITE.description}" />
    <meta name="keywords" content="${SITE.keywords}" />
    <meta name="author" content="${SITE.author}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${SITE.url}/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE.url}/" />
    <meta property="og:title" content="${SITE.title}" />
    <meta property="og:description" content="${SITE.description}" />
    <meta property="og:image" content="${SITE.image}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${SITE.url}/" />
    <meta name="twitter:title" content="${SITE.title}" />
    <meta name="twitter:description" content="${SITE.description}" />
    <meta name="twitter:image" content="${SITE.image}" />

    <!-- JSON-LD -->
    <script type="application/ld+json">
    ${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Joshwa',
      url: SITE.url,
      image: SITE.image,
      jobTitle: 'Full Stack Developer',
      knowsAbout: [
        'React.js',
        'JavaScript',
        'API Integration',
        'AI & NLQ',
        'CRM Development',
        'Web Development',
      ],
      sameAs: [SITE.github, SITE.linkedin],
    })}
    </script>
  `
}
