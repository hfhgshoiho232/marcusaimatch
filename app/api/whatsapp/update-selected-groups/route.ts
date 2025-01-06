import { NextResponse } from 'next/server'
import { updateSelectedGroups } from '../../../../lib/whatsapp'

export async function POST(request: Request) {
  const { selectedGroups } = await request.json()
  
  try {
    await updateSelectedGroups(selectedGroups)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update selected groups:', error)
    return NextResponse.json({ error: 'Failed to update selected groups' }, { status: 500 })
  }
}

