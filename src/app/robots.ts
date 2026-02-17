import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/build/confirmation', '/admin/'],
      },
    ],
    sitemap: 'https://trusmithjewelers.com/sitemap.xml',
    host: 'https://trusmithjewelers.com',
  }
}
