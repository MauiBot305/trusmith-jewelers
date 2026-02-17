import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category') || 'All'
    const metalTypes = searchParams.getAll('metalType')
    const diamondType = searchParams.get('diamondType') || 'Both'
    const priceMin = parseFloat(searchParams.get('priceMin') || '0')
    const priceMax = parseFloat(searchParams.get('priceMax') || '9999999')
    const sort = searchParams.get('sort') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '24')
    const skip = (page - 1) * limit

    const where: Prisma.InventoryProductWhereInput = {
      available: true,
      price: { gte: priceMin, lte: priceMax },
    }

    if (category !== 'All') {
      where.category = category
    }

    if (metalTypes.length > 0) {
      where.metalType = { in: metalTypes }
    }

    if (diamondType !== 'Both') {
      where.diamondType = diamondType
    }

    let orderBy: Prisma.InventoryProductOrderByWithRelationInput = { createdAt: 'desc' }
    switch (sort) {
      case 'price_asc':
        orderBy = { price: 'asc' }
        break
      case 'price_desc':
        orderBy = { price: 'desc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
    }

    const [products, total] = await Promise.all([
      prisma.inventoryProduct.findMany({ where, orderBy, skip, take: limit }),
      prisma.inventoryProduct.count({ where }),
    ])

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('[API /products]', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
