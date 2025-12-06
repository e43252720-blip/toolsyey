import { NextResponse } from 'next/server'
import { createSupabaseServiceRoleClient } from '../../../lib/supabaseClient'

export async function GET(request: Request) {
  const supabase = createSupabaseServiceRoleClient()
  const { searchParams } = new URL(request.url)
  const mata_kuliah = searchParams.get('mata_kuliah')
  const jenis_tugas = searchParams.get('jenis_tugas')

  if (mata_kuliah && jenis_tugas) {
    const { data } = await supabase
      .from('task_templates')
      .select('*')
      .ilike('mata_kuliah', `%${mata_kuliah}%`)
      .ilike('jenis_tugas', `%${jenis_tugas}%`)
      .maybeSingle()
    return NextResponse.json({ template: data })
  }

  const { data: templates } = await supabase.from('task_templates').select('*').order('created_at', { ascending: false })
  return NextResponse.json({ templates })
}

export async function POST(request: Request) {
  const payload = await request.json()
  const supabase = createSupabaseServiceRoleClient()
  const { data, error } = await supabase.from('task_templates').insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ template: data })
}
