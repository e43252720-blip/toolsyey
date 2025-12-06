'use client'

import { useState } from 'react'

const jenisTugas = ['Makalah', 'Laporan', 'Presentasi', 'Studi Kasus', 'Proyek']

export default function HelperPage() {
  const [mataKuliah, setMataKuliah] = useState('Akuntansi')
  const [jenis, setJenis] = useState('Makalah')
  const [result, setResult] = useState<{ judul_template: string; isi_panduan: string } | null>(null)
  const [status, setStatus] = useState('')

  const search = async () => {
    setStatus('Mencari panduan...')
    const res = await fetch(`/api/helper?mata_kuliah=${encodeURIComponent(mataKuliah)}&jenis_tugas=${encodeURIComponent(jenis)}`)
    const data = await res.json()
    setResult(data.template ?? null)
    setStatus(data.template ? '' : 'Belum ada panduan untuk kombinasi ini. Coba jenis tugas lain atau mata kuliah lain.')
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-600">Cari panduan struktur dan tips penulisan</p>
        <h1 className="text-3xl font-bold text-slate-900">Helper Tugas</h1>
      </div>

      <section className="card p-6 space-y-4 max-w-3xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Mata Kuliah</label>
            <input className="input" value={mataKuliah} onChange={(e) => setMataKuliah(e.target.value)} />
          </div>
          <div>
            <label className="label">Jenis Tugas</label>
            <select className="input" value={jenis} onChange={(e) => setJenis(e.target.value)}>
              {jenisTugas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={search} className="btn-primary">
          Cari Panduan
        </button>
        {status && <p className="text-sm text-slate-600">{status}</p>}
        {result && (
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
            <h3 className="text-lg font-semibold text-slate-900">{result.judul_template}</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{result.isi_panduan}</p>
          </div>
        )}
      </section>
    </div>
  )
}
