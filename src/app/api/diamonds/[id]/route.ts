import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const diamond = await prisma.diamond.findUnique({
      where: { id: params.id },
    })

    if (!diamond) {
      return NextResponse.json({ error: 'Diamond not found' }, { status: 404 })
    }

    // Fetch related diamonds (same cut, similar carat ±0.5)
    const related = await prisma.diamond.findMany({
      where: {
        id: { not: diamond.id },
        cut: diamond.cut,
        carat: { gte: diamond.carat - 0.5, lte: diamond.carat + 0.5 },
        available: true,
      },
      take: 4,
      orderBy: { carat: 'asc' },
    })

    return NextResponse.json({ diamond, related })
  } catch (error) {
    console.error('[API /diamonds/[id]]', error)
    return NextResponse.json({ error: 'Failed to fetch diamond' }, { status: 500 })
  }
}
