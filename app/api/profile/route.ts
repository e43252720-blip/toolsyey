import { NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceRoleClient } from '../../../lib/supabaseClient'

export async function GET() {
  const supabase = createSupabaseServerClient()
  const { data: user } = await supabase.auth.getUser()
  const userId = user.user?.id
  if (!userId) return NextResponse.json({ profile: null })

  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
  return NextResponse.json({ profile: data })
}

export async function PUT(request: Request) {
  const payload = await request.json()
  const supabaseAuth = createSupabaseServerClient()
  const { data: user } = await supabaseAuth.auth.getUser()
  const userId = user.user?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...payload })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ profile: data })
}
