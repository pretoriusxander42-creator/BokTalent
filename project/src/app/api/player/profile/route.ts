import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../lib/supabase/server'
import { ProfileSchema } from '../../../../lib/schemas/player'

// GET: fetch profile for currently 'signed-in' user. We rely on a header X-User-Id for demo.
export async function GET(req: Request) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // If supabase is not configured, return a placeholder
    if (!supabaseServer) {
      return NextResponse.json({ data: null })
    }

    const { data, error } = await supabaseServer.from('players').select('*').eq('id', userId).limit(1).single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'unknown' }, { status: 500 })
  }
}

// PUT: update profile for current user
export async function PUT(req: Request) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const parsed = ProfileSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    if (!supabaseServer) {
      // In dev without supabase, echo back the parsed body
      return NextResponse.json({ data: { id: userId, ...parsed.data } })
    }

    const { data, error } = await supabaseServer.from('players').upsert({ id: userId, ...parsed.data }).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'unknown' }, { status: 500 })
  }
}
