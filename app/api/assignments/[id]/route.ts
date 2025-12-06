import { NextResponse } from 'next/server'
import { createSupabaseServiceRoleClient, createSupabaseServerClient } from '../../../../lib/supabaseClient'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.from('assignments').select('*').eq('id', params.id).single()
  return NextResponse.json({ assignment: data })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json()
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('assignments')
    .update(payload)
    .eq('id', params.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ assignment: data })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServiceRoleClient()
  await supabase.from('assignments').delete().eq('id', params.id)
  return NextResponse.json({ success: true })
}
