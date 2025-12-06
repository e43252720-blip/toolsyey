import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '../../../lib/supabaseClient'
import UploadForm from './upload-form'

export default async function AssignmentDetail({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()
  const { data: assignment } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!assignment) return notFound()

  const { data: files } = await supabase
    .from('assignment_files')
    .select('*')
    .eq('assignment_id', params.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">Detail tugas dan lampiran</p>
          <h1 className="text-3xl font-bold text-slate-900">{assignment.judul}</h1>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Informasi Tugas</h2>
          <dl className="mt-4 space-y-2 text-sm text-slate-700">
            <div className="grid grid-cols-3 gap-2">
              <dt className="font-semibold">Mata Kuliah</dt>
              <dd className="col-span-2">{assignment.mata_kuliah}</dd>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <dt className="font-semibold">Jenis Tugas</dt>
              <dd className="col-span-2">{assignment.jenis_tugas}</dd>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <dt className="font-semibold">Deadline</dt>
              <dd className="col-span-2">{assignment.deadline || '-'}</dd>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <dt className="font-semibold">Status</dt>
              <dd className="col-span-2">{assignment.status}</dd>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <dt className="font-semibold">Deskripsi</dt>
              <dd className="col-span-2 whitespace-pre-wrap">{assignment.deskripsi}</dd>
            </div>
          </dl>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Upload File</h2>
          <p className="text-sm text-slate-600">PDF/DOCX/PPT/XLS dan format umum lain.</p>
          <UploadForm assignmentId={params.id} />
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900">Lampiran</h2>
        <div className="mt-4 space-y-3 text-sm">
          {files?.length ? (
            files.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">{file.file_name}</p>
                  <p className="text-xs text-slate-500">Diunggah: {new Date(file.created_at).toLocaleString('id-ID')}</p>
                </div>
                <a href={file.file_url} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
                  Lihat
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-600">Belum ada file.</p>
          )}
        </div>
      </section>
    </div>
  )
}
