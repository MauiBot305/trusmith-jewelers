import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const cuts = searchParams.getAll('cut')
    const caratMin = parseFloat(searchParams.get('caratMin') || '0')
    const caratMax = parseFloat(searchParams.get('caratMax') || '999')
    const colors = searchParams.getAll('color')
    const clarities = searchParams.getAll('clarity')
    const priceMin = parseFloat(searchParams.get('priceMin') || '0')
    const priceMax = parseFloat(searchParams.get('priceMax') || '9999999')
    const certification = searchParams.get('certification') || 'Both'
    const search = searchParams.get('search') || ''
    const sort = searchParams.get('sort') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '24')
    const skip = (page - 1) * limit

    const where: Prisma.DiamondWhereInput = {
      available: true,
      carat: { gte: caratMin, lte: caratMax },
      price: { gte: priceMin, lte: priceMax },
    }

    if (cuts.length > 0) where.cut = { in: cuts }
    if (colors.length > 0) where.color = { in: colors }
    if (clarities.length > 0) where.clarity = { in: clarities }
    if (certification !== 'Both') where.certification = certification

    if (search) {
      where.OR = [
        { cut: { contains: search, mode: 'insensitive' } },
        { certification: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ]
    }

    let orderBy: Prisma.DiamondOrderByWithRelationInput = { createdAt: 'desc' }
    switch (sort) {
      case 'price_asc':  orderBy = { price: 'asc' };    break
      case 'price_desc': orderBy = { price: 'desc' };   break
      case 'carat_desc': orderBy = { carat: 'desc' };   break
      default:           orderBy = { createdAt: 'desc' }
    }

    const [diamonds, total] = await Promise.all([
      prisma.diamond.findMany({ where, orderBy, skip, take: limit }),
      prisma.diamond.count({ where }),
    ])

    // Normalize field names for the frontend
    const normalized = diamonds.map(d => ({
      ...d,
      certificateNumber: d.certNumber,
      inStock: d.available,
    }))

    return NextResponse.json({
      diamonds: normalized,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('[API /diamonds]', error)
    return NextResponse.json({ error: 'Failed to fetch diamonds' }, { status: 500 })
  }
}
