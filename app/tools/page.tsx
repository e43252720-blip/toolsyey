'use client'

import { useMemo, useState } from 'react'

type NilaiHuruf = 'A' | 'A-' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'E'
const konversiNilai: Record<NilaiHuruf, number> = {
  A: 4,
  'A-': 3.7,
  'B+': 3.3,
  B: 3,
  'C+': 2.3,
  C: 2,
  D: 1,
  E: 0
}

export default function ToolsPage() {
  const [mataKuliah, setMataKuliah] = useState([
    { nama: 'Akuntansi Biaya', sks: 3, nilai: 'A' as NilaiHuruf }
  ])
  const [planner, setPlanner] = useState({ target_lulus_tahun: 4, total_sks_wajib: 144, sks_sudah_diambil: 60 })
  const [pinjaman, setPinjaman] = useState({ jumlah: 10000000, bunga: 10, lama: 2 })
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'Sudah aktivasi akun mahasiswa & email kampus': false,
    'Sudah kenal dengan dosen wali/pembimbing akademik': false,
    'Sudah join grup angkatan/jurusan': false,
    'Sudah baca panduan KRS kampus kamu': false,
    'Sudah survei organisasi/himpunan/UKM yang mau diikuti': false
  })

  const ipk = useMemo(() => {
    const totalBobot = mataKuliah.reduce((acc, mk) => acc + mk.sks * konversiNilai[mk.nilai], 0)
    const totalSks = mataKuliah.reduce((acc, mk) => acc + mk.sks, 0)
    return totalSks ? totalBobot / totalSks : 0
  }, [mataKuliah])

  const motivasi = ipk >= 3.5
    ? 'Keren! Pertahankan prestasimu 💪'
    : ipk >= 3
      ? 'Bagus! Masih bisa kamu tingkatkan 😄'
      : 'Jangan menyerah, evaluasi cara belajarmu ✨'

  const sisaSks = planner.total_sks_wajib - planner.sks_sudah_diambil
  const rataPerSemester = sisaSks / (planner.target_lulus_tahun * 2)

  const i = pinjaman.bunga / 100 / 12
  const n = pinjaman.lama * 12
  const angsuran = pinjaman.jumlah && pinjaman.bunga && pinjaman.lama
    ? (pinjaman.jumlah * i) / (1 - Math.pow(1 + i, -n))
    : 0

  const checklistItems = Object.keys(checklist)
  const doneCount = checklistItems.filter((key) => checklist[key]).length
  const progress = Math.round((doneCount / checklistItems.length) * 100)

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-600">Tools cepat untuk mahasiswa FEB</p>
        <h1 className="text-3xl font-bold text-slate-900">Tools Mahasiswa</h1>
      </div>

      <section id="ipk" className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Kalkulator IP</h2>
          <button
            className="btn-ghost text-sm"
            onClick={() => setMataKuliah((prev) => [...prev, { nama: '', sks: 2, nilai: 'B' }])}
          >
            Tambah Mata Kuliah
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {mataKuliah.map((mk, idx) => (
            <div key={idx} className="grid gap-2 rounded-lg border border-slate-100 p-3 md:grid-cols-3">
              <input
                className="input"
                placeholder="Nama Mata Kuliah"
                value={mk.nama}
                onChange={(e) => setMataKuliah((prev) => prev.map((item, i) => (i === idx ? { ...item, nama: e.target.value } : item)))}
              />
              <input
                className="input"
                type="number"
                min={1}
                value={mk.sks}
                onChange={(e) => setMataKuliah((prev) => prev.map((item, i) => (i === idx ? { ...item, sks: Number(e.target.value) } : item)))}
                placeholder="SKS"
              />
              <select
                className="input"
                value={mk.nilai}
                onChange={(e) => setMataKuliah((prev) => prev.map((item, i) => (i === idx ? { ...item, nilai: e.target.value as NilaiHuruf } : item)))}
              >
                {Object.keys(konversiNilai).map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-600">Hasil IP Kamu</p>
          <p className="text-3xl font-bold text-slate-900">{ipk.toFixed(2)}</p>
          <p className="text-sm text-slate-600">{motivasi}</p>
        </div>
      </section>

      <section id="planner" className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900">Planner SKS</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label className="label">Target Lulus (tahun)</label>
            <input
              className="input"
              type="number"
              min={1}
              value={planner.target_lulus_tahun}
              onChange={(e) => setPlanner((p) => ({ ...p, target_lulus_tahun: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="label">Total SKS Wajib</label>
            <input
              className="input"
              type="number"
              value={planner.total_sks_wajib}
              onChange={(e) => setPlanner((p) => ({ ...p, total_sks_wajib: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="label">SKS yang Sudah Diambil</label>
            <input
              className="input"
              type="number"
              value={planner.sks_sudah_diambil}
              onChange={(e) => setPlanner((p) => ({ ...p, sks_sudah_diambil: Number(e.target.value) }))}
            />
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <p className="font-semibold text-slate-900">Sisa SKS: {sisaSks}</p>
          <p className="text-sm text-slate-600">
            Rata-rata SKS per semester yang perlu kamu ambil: {rataPerSemester.toFixed(1)} (sesuaikan dengan aturan kampusmu ya).
          </p>
        </div>
      </section>

      <section id="keuangan" className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900">Simulasi Angsuran Pinjaman</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label className="label">Jumlah Pinjaman</label>
            <input
              className="input"
              type="number"
              value={pinjaman.jumlah}
              onChange={(e) => setPinjaman((p) => ({ ...p, jumlah: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="label">Bunga per Tahun (%)</label>
            <input
              className="input"
              type="number"
              value={pinjaman.bunga}
              onChange={(e) => setPinjaman((p) => ({ ...p, bunga: Number(e.target.value) }))}
            />
          </div>
          <div>
            <label className="label">Lama Pinjaman (tahun)</label>
            <input
              className="input"
              type="number"
              value={pinjaman.lama}
              onChange={(e) => setPinjaman((p) => ({ ...p, lama: Number(e.target.value) }))}
            />
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <p className="font-semibold text-slate-900">Angsuran per bulan</p>
          <p className="text-2xl font-bold text-blue-700">Rp {angsuran.toFixed(0)}</p>
        </div>
      </section>

      <section id="checklist" className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Checklist Maba</h2>
          <p className="text-sm text-slate-600">{doneCount} dari {checklistItems.length} checklist sudah kamu selesaikan.</p>
        </div>
        <div className="mt-4 space-y-2">
          {checklistItems.map((item) => (
            <label key={item} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
              <input
                type="checkbox"
                checked={checklist[item]}
                onChange={(e) => setChecklist((prev) => ({ ...prev, [item]: e.target.checked }))}
              />
              <span className="text-sm text-slate-700">{item}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 h-3 w-full rounded-full bg-slate-100">
          <div className="h-3 rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate-600">Progres: {progress}%</p>
      </section>
    </div>
  )
}
