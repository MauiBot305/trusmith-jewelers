/** @jest-environment node */
/**
 * Integration tests for /api/diamonds route
 * Uses Next.js route handler testing pattern
 */

// Mock Prisma client before importing the route
// Note: jest.mock is hoisted, so we can't reference external let/const variables here.
// Instead we use jest.fn() directly and retrieve mock via import.
jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: {
    diamond: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}));

import { NextRequest } from 'next/server';
import { GET } from '@/app/api/diamonds/route';
import prismaDb from '@/lib/db';

// Get references to the mock functions
const mockFindMany = (prismaDb as unknown as { diamond: { findMany: jest.Mock; count: jest.Mock } }).diamond.findMany;
const mockCount = (prismaDb as unknown as { diamond: { findMany: jest.Mock; count: jest.Mock } }).diamond.count;

const mockDiamonds = [
  {
    id: 'cldiamondo1',
    sku: 'D-001',
    cut: 'Round Brilliant',
    carat: 1.5,
    color: 'E',
    clarity: 'VS1',
    certification: 'IGI',
    certNumber: '12345',
    certificateUrl: null,
    price: 3500,
    images: '[]',
    videoUrl: null,
    available: true,
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
    certNumber: '67890',
    certificateUrl: null,
    price: 2800,
    images: '[]',
    videoUrl: null,
    available: true,
    featured: false,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('GET /api/diamonds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFindMany.mockResolvedValue(mockDiamonds);
    mockCount.mockResolvedValue(2);
  });

  it('returns diamonds with default params', async () => {
    const req = new NextRequest('http://localhost/api/diamonds');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.diamonds).toHaveLength(2);
    expect(data.total).toBe(2);
  });

  it('filters by cut parameter', async () => {
    mockFindMany.mockResolvedValue([mockDiamonds[0]]);
    mockCount.mockResolvedValue(1);

    const req = new NextRequest('http://localhost/api/diamonds?cut=Round+Brilliant');
    const res = await GET(req);
    const data = await res.json();

    expect(data.diamonds).toHaveLength(1);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          cut: expect.objectContaining({ in: ['Round Brilliant'] }),
        }),
      })
    );
  });

  it('filters by price range', async () => {
    const req = new NextRequest('http://localhost/api/diamonds?priceMin=2000&priceMax=4000');
    await GET(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          price: expect.objectContaining({ gte: 2000, lte: 4000 }),
        }),
      })
    );
  });

  it('filters by multiple colors', async () => {
    const req = new NextRequest('http://localhost/api/diamonds?color=D&color=E&color=F');
    await GET(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          color: { in: ['D', 'E', 'F'] },
        }),
      })
    );
  });

  it('respects pagination params', async () => {
    const req = new NextRequest('http://localhost/api/diamonds?page=3&limit=10');
    await GET(req);

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 10,
        skip: 20, // (page 3 - 1) * 10
      })
    );
  });

  it('returns 500 on database error', async () => {
    mockFindMany.mockRejectedValue(new Error('DB Error'));

    const req = new NextRequest('http://localhost/api/diamonds');
    const res = await GET(req);

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Failed to fetch diamonds');
  });

  it('normalizes certNumber to certificateNumber', async () => {
    const req = new NextRequest('http://localhost/api/diamonds');
    const res = await GET(req);
    const data = await res.json();

    // normalized diamonds should have certificateNumber
    expect(data.diamonds[0]).toHaveProperty('certificateNumber');
  });
});
