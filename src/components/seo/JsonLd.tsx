// JSON-LD structured data components for SEO
// Usage: <JsonLd data={schema} /> — renders as <script type="application/ld+json">

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

// ── Pre-built schemas ─────────────────────────────────────────────────────────

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': 'https://trusmithjewelers.com/#organization',
    name: 'True Smith Jewelers',
    url: 'https://trusmithjewelers.com',
    logo: 'https://trusmithjewelers.com/logo.png',
    image: 'https://trusmithjewelers.com/og-image.jpg',
    description:
      'Affordable luxury lab-grown diamond engagement rings, tennis bracelets, and fine jewelry. Ethically sourced, certified diamonds with lifetime warranty.',
    telephone: '+1-239-244-6446',
    email: 'info@truesmithjewelers.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      description: 'By appointment',
    },
    sameAs: ['https://instagram.com/TrueSmithJeweler', 'https://youtube.com/@TrueSmithJeweler'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Lab-Grown Diamond Jewelry',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Engagement Rings',
          url: 'https://trusmithjewelers.com/shop?category=rings',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Lab-Grown Diamonds',
          url: 'https://trusmithjewelers.com/diamonds',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Tennis Bracelets',
          url: 'https://trusmithjewelers.com/shop?category=bracelets',
        },
      ],
    },
  }

  return <JsonLd data={schema} />
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://trusmithjewelers.com/#website',
    url: 'https://trusmithjewelers.com',
    name: 'True Smith Jewelers',
    description: 'Lab-grown diamond jewelry crafted with precision.',
    publisher: {
      '@id': 'https://trusmithjewelers.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://trusmithjewelers.com/diamonds?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={schema} />
}

interface DiamondSchemaProps {
  diamond: {
    id: string
    carat: number
    cut: string
    color: string
    clarity: string
    certification: string
    price: number
    images?: string[]
    description?: string | null
  }
}

export function DiamondProductSchema({ diamond }: DiamondSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://trusmithjewelers.com/diamonds/${diamond.id}`,
    name: `${diamond.carat}ct ${diamond.cut} Lab-Grown Diamond`,
    description:
      diamond.description ??
      `${diamond.carat} carat ${diamond.cut} cut lab-grown diamond. Color: ${diamond.color}, Clarity: ${diamond.clarity}. Certified by ${diamond.certification}.`,
    image: diamond.images?.[0] ?? 'https://trusmithjewelers.com/og-image.jpg',
    brand: {
      '@type': 'Brand',
      name: 'True Smith Jewelers',
    },
    category: 'Lab-Grown Diamonds',
    material: 'Lab-Grown Diamond',
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Cut', value: diamond.cut },
      { '@type': 'PropertyValue', name: 'Carat', value: `${diamond.carat}ct` },
      { '@type': 'PropertyValue', name: 'Color', value: diamond.color },
      { '@type': 'PropertyValue', name: 'Clarity', value: diamond.clarity },
      { '@type': 'PropertyValue', name: 'Certification', value: diamond.certification },
    ],
    offers: {
      '@type': 'Offer',
      url: `https://trusmithjewelers.com/diamonds/${diamond.id}`,
      price: diamond.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': 'https://trusmithjewelers.com/#organization',
      },
    },
  }

  return <JsonLd data={schema} />
}

interface ProductSchemaProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    category: string
    images?: string[]
    metalType?: string
  }
}

export function InventoryProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://trusmithjewelers.com/shop/${product.id}`,
    name: product.name,
    description: product.description,
    image: product.images?.[0] ?? 'https://trusmithjewelers.com/og-image.jpg',
    brand: {
      '@type': 'Brand',
      name: 'True Smith Jewelers',
    },
    category: product.category,
    material: product.metalType,
    offers: {
      '@type': 'Offer',
      url: `https://trusmithjewelers.com/shop/${product.id}`,
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': 'https://trusmithjewelers.com/#organization',
      },
    },
  }

  return <JsonLd data={schema} />
}

export function BreadcrumbSchema({ items }: { items: { name: string; href: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://trusmithjewelers.com${item.href}`,
    })),
  }

  return <JsonLd data={schema} />
}
