/**
 * Integration tests for /api/diamonds route
 * Uses Next.js route handler testing pattern
 */

import { NextRequest } from 'next/server'

// Mock Prisma before importing the route
jest.mock('@/lib/db', () => ({
  prisma: {
    diamond: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}))

import { GET } from '@/app/api/diamonds/route'
import { prisma } from '@/lib/db'

const mockPrisma = prisma as jest.Mocked<typeof prisma>

const mockDiamonds = [
  {
    id: 'cldiamondo1',
    sku: 'D-001',
    cut: 'Round Brilliant',
    carat: 1.5,
    color: 'E',
    clarity: 'VS1',
    certification: 'IGI',
    certificateNumber: '12345',
    certificateUrl: null,
    price: 3500,
    images: '[]',
    videoUrl: null,
    inStock: true,
    featured: true,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'cldiamondo2',
    sku: 'D-002',
    cut: 'Oval',
    carat: 1.2,
    color: 'F',
    clarity: 'VS2',
    certification: 'GIA',
    certificateNumber: '67890',
    certificateUrl: null,
    price: 2800,
    images: '[]',
    videoUrl: null,
    inStock: true,
    featured: false,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

describe('GET /api/diamonds', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(mockPrisma.diamond.findMany as jest.Mock).mockResolvedValue(mockDiamonds)
    ;(mockPrisma.diamond.count as jest.Mock).mockResolvedValue(2)
  })

  it('returns diamonds with default params', async () => {
    const req = new NextRequest('http://localhost/api/diamonds')
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.diamonds).toHaveLength(2)
    expect(data.total).toBe(2)
    expect(data.limit).toBe(50)
    expect(data.offset).toBe(0)
  })

  it('filters by cut parameter', async () => {
    ;(mockPrisma.diamond.findMany as jest.Mock).mockResolvedValue([mockDiamonds[0]])
    ;(mockPrisma.diamond.count as jest.Mock).mockResolvedValue(1)

    const req = new NextRequest('http://localhost/api/diamonds?cut=round')
    const res = await GET(req)
    const data = await res.json()

    expect(data.diamonds).toHaveLength(1)
    expect(mockPrisma.diamond.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          cut: expect.objectContaining({ contains: 'round' }),
        }),
      })
    )
  })

  it('filters by price range', async () => {
    const req = new NextRequest('http://localhost/api/diamonds?minPrice=2000&maxPrice=4000')
    const res = await GET(req)

    expect(mockPrisma.diamond.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          price: expect.objectContaining({ gte: 2000, lte: 4000 }),
        }),
      })
    )
  })

  it('filters by multiple colors', async () => {
    const req = new NextRequest('http://localhost/api/diamonds?color=D,E,F')
    await GET(req)

    expect(mockPrisma.diamond.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          color: { in: ['D', 'E', 'F'] },
        }),
      })
    )
  })

  it('respects pagination params', async () => {
    const req = new NextRequest('http://localhost/api/diamonds?limit=10&offset=20')
    await GET(req)

    expect(mockPrisma.diamond.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 10,
        skip: 20,
      })
    )
  })

  it('caps limit at 100', async () => {
    const req = new NextRequest('http://localhost/api/diamonds?limit=999')
    await GET(req)

    expect(mockPrisma.diamond.findMany).toHaveBeenCalledWith(expect.objectContaining({ take: 100 }))
  })

  it('returns 500 on database error', async () => {
    ;(mockPrisma.diamond.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'))

    const req = new NextRequest('http://localhost/api/diamonds')
    const res = await GET(req)

    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.error).toBe('Failed to fetch diamonds')
  })

  it('includes cache headers', async () => {
    const req = new NextRequest('http://localhost/api/diamonds')
    const res = await GET(req)

    expect(res.headers.get('Cache-Control')).toContain('s-maxage=60')
  })
})
