import Link from 'next/link'
import { createSupabaseServerClient } from '../../lib/supabaseClient'

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient()
  const { data: user } = await supabase.auth.getUser()

  const { data: assignments } = await supabase
    .from('assignments')
    .select('id, judul, status, deadline')
    .eq('user_id', user.user?.id ?? '')
    .order('deadline', { ascending: true })
    .limit(3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">Selamat datang kembali</p>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>
        <Link href="/assignments" className="btn-primary">
          Lihat Semua Tugas
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Tugas Terdekat</h2>
            <Link href="/assignments" className="text-sm">
              Kelola Tugas
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {assignments?.length ? (
              assignments.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{task.judul}</p>
                    <span className="text-xs rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                      {task.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Deadline: {task.deadline || 'Belum diatur'}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">Belum ada tugas. Tambahkan tugas pertamamu.</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Tools Ringkas</h2>
          <p className="mt-2 text-sm text-slate-600">
            Akses cepat ke Kalkulator IP, Planner SKS, simulasi keuangan, dan checklist maba.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/tools#ipk" className="btn-ghost">
              Kalkulator IP
            </Link>
            <Link href="/tools#planner" className="btn-ghost">
              Planner SKS
            </Link>
            <Link href="/tools#keuangan" className="btn-ghost">
              Simulasi Keuangan
            </Link>
            <Link href="/tools#checklist" className="btn-ghost">
              Checklist Maba
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
