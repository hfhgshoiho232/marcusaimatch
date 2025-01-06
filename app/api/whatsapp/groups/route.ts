import { NextResponse } from 'next/server'
import { getWhatsAppGroups } from '../../../../lib/whatsapp'

export async function GET() {
  try {
    const groups = await getWhatsAppGroups()
    return NextResponse.json({ groups })
  } catch (error) {
    console.error('Failed to fetch WhatsApp groups:', error)
    return NextResponse.json({ error: 'Failed to fetch WhatsApp groups' }, { status: 500 })
  }
}

