import { NextResponse } from 'next/server'
import { createSupabaseServiceRoleClient, createSupabaseServerClient } from '../../../lib/supabaseClient'

export async function GET() {
  const supabase = createSupabaseServerClient()
  const { data: user } = await supabase.auth.getUser()
  const userId = user.user?.id
  if (!userId) return NextResponse.json({ assignments: [] })

  const { data } = await supabase
    .from('assignments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return NextResponse.json({ assignments: data ?? [] })
}

export async function POST(request: Request) {
  const payload = await request.json()
  const supabaseAuth = createSupabaseServerClient()
  const { data: user } = await supabaseAuth.auth.getUser()
  const userId = user.user?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase.from('assignments').insert({ ...payload, user_id: userId }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ assignment: data })
}
