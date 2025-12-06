import { NextResponse } from 'next/server'
import { createSupabaseServiceRoleClient } from '../../../lib/supabaseClient'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const supabase = createSupabaseServiceRoleClient()
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const assignmentId = formData.get('assignmentId') as string | null

  if (!file || !assignmentId) {
    return NextResponse.json({ error: 'File atau assignmentId tidak ada' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filePath = `${assignmentId}/${randomUUID()}-${file.name}`

  const { data: storageData, error: storageError } = await supabase.storage
    .from('assignment-files')
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false
    })

  if (storageError) return NextResponse.json({ error: storageError.message }, { status: 400 })

  const { data: publicUrl } = supabase.storage.from('assignment-files').getPublicUrl(storageData.path)

  const { error: insertError } = await supabase.from('assignment_files').insert({
    assignment_id: assignmentId,
    file_name: file.name,
    file_url: publicUrl.publicUrl
  })

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 400 })

  return NextResponse.json({ success: true, url: publicUrl.publicUrl })
}
