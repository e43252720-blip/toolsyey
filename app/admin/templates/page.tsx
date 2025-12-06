'use client'

import { useEffect, useState } from 'react'

type Template = {
  id: string
  mata_kuliah: string
  jenis_tugas: string
  judul_template: string
  isi_panduan: string
}

const jenisTugas = ['Makalah', 'Laporan', 'Presentasi', 'Studi Kasus', 'Proyek']

export default function TemplateAdminPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [editing, setEditing] = useState<Template | null>(null)

  const fetchTemplates = async () => {
    const res = await fetch('/api/helper')
    const data = await res.json()
    setTemplates(data.templates || [])
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/helper/${editing.id}` : '/api/helper'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing)
    })
    setEditing(null)
    fetchTemplates()
  }

  const startNew = () =>
    setEditing({ id: '', mata_kuliah: '', jenis_tugas: 'Makalah', judul_template: '', isi_panduan: '' })

  const handleDelete = async (id: string) => {
    await fetch(`/api/helper/${id}`, { method: 'DELETE' })
    fetchTemplates()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">Kelola template panduan tugas</p>
          <h1 className="text-3xl font-bold text-slate-900">Admin Template Helper</h1>
        </div>
        <button className="btn-primary" onClick={startNew}>
          Template Baru
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="card p-6 space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="label">Mata Kuliah</label>
              <input
                className="input"
                value={editing.mata_kuliah}
                onChange={(e) => setEditing((t) => t && { ...t, mata_kuliah: e.target.value } as Template)}
                required
              />
            </div>
            <div>
              <label className="label">Jenis Tugas</label>
              <select
                className="input"
                value={editing.jenis_tugas}
                onChange={(e) => setEditing((t) => t && { ...t, jenis_tugas: e.target.value } as Template)}
              >
                {jenisTugas.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Judul Template</label>
            <input
              className="input"
              value={editing.judul_template}
              onChange={(e) => setEditing((t) => t && { ...t, judul_template: e.target.value } as Template)}
              required
            />
          </div>
          <div>
            <label className="label">Isi Panduan</label>
            <textarea
              className="input min-h-[200px]"
              value={editing.isi_panduan}
              onChange={(e) => setEditing((t) => t && { ...t, isi_panduan: e.target.value } as Template)}
              placeholder={"Struktur: Pendahuluan, Landasan Teori, Metode, Pembahasan, Penutup"}
              required
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary">Simpan</button>
            <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>
              Batal
            </button>
          </div>
        </form>
      )}

      <section className="card p-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Daftar Template</h2>
        {templates.length ? (
          <div className="space-y-3">
            {templates.map((t) => (
              <div key={t.id} className="rounded-lg border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{t.judul_template}</p>
                    <p className="text-sm text-slate-600">{t.mata_kuliah} · {t.jenis_tugas}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <button className="btn-ghost" onClick={() => setEditing(t)}>
                      Edit
                    </button>
                    <button className="btn-ghost text-red-600" onClick={() => handleDelete(t.id)}>
                      Hapus
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-700">{t.isi_panduan}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">Belum ada template.</p>
        )}
      </section>
    </div>
  )
}
