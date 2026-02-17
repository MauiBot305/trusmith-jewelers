import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.inventoryProduct.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Related products in same category
    const related = await prisma.inventoryProduct.findMany({
      where: {
        id: { not: product.id },
        category: product.category,
        available: true,
      },
      take: 4,
      orderBy: { featured: 'desc' },
    })

    return NextResponse.json({ product, related })
  } catch (error) {
    console.error('[API /products/[id]]', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
