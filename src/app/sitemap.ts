import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'

const BASE_URL = 'https://trusmithjewelers.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Fetch dynamic content
  let diamonds: { id: string; createdAt: Date }[] = []
  let products: { id: string; createdAt: Date }[] = []

  try {
    ;[diamonds, products] = await Promise.all([
      db.diamond.findMany({
        where: { available: true },
        select: { id: true, createdAt: true },
      }),
      db.inventoryProduct.findMany({
        where: { available: true },
        select: { id: true, createdAt: true },
      }),
    ])
  } catch {
    // Database may not be seeded — return static pages only
    console.warn('[sitemap] Could not fetch dynamic content, returning static routes only')
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/education`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/diamonds`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/build`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sell-gold`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/appointments`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const diamondRoutes: MetadataRoute.Sitemap = diamonds.map((d) => ({
    url: `${BASE_URL}/diamonds/${d.id}`,
    lastModified: d.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/shop/${p.id}`,
    lastModified: p.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...diamondRoutes, ...productRoutes]
}
