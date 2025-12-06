import { NextResponse } from 'next/server'
import { createSupabaseServiceRoleClient } from '../../../../../lib/supabaseClient'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const payload = await request.json()
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase
    .from('task_templates')
    .update(payload)
    .eq('id', params.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ template: data })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServiceRoleClient()
  await supabase.from('task_templates').delete().eq('id', params.id)
  return NextResponse.json({ success: true })
}
