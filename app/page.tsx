import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="card p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Platform mahasiswa FEB</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Tools Mahasiswa FEB Indonesia</h1>
        <p className="mt-4 text-lg text-slate-600">
          Bantu kamu mengatur tugas, SKS, dan belajar dengan lebih terstruktur.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/dashboard" className="btn-primary">
            Masuk ke Dashboard
          </Link>
          <Link href="/tools" className="btn-ghost">
            Lihat Tools
          </Link>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Kelola Tugas',
            desc: 'Tambah, atur, dan tandai progres tugas kuliah dengan mudah.'
          },
          {
            title: 'Kumpulan Tools',
            desc: 'Kalkulator IP, Planner SKS, simulasi keuangan, dan checklist Maba.'
          },
          {
            title: 'Helper Tugas',
            desc: 'Panduan struktur dan tips penulisan berdasarkan template Supabase.'
          }
        ].map((item) => (
          <div key={item.title} className="card p-6 transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
