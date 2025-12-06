'use client'

import { useState } from 'react'

const defaultState = {
  nama_lengkap: '',
  kampus: '',
  fakultas: 'Fakultas Ekonomi dan Bisnis',
  prodi: ''
}

export default function ProfileForm({ initialData }: { initialData: typeof defaultState | null }) {
  const [form, setForm] = useState(initialData ?? defaultState)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setMessage(res.ok ? 'Profil tersimpan.' : 'Gagal menyimpan profil.')
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4 max-w-2xl">
      <div>
        <label className="label">Nama Lengkap</label>
        <input
          className="input"
          value={form.nama_lengkap}
          onChange={(e) => setForm((f) => ({ ...f, nama_lengkap: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="label">Kampus</label>
        <input
          className="input"
          value={form.kampus}
          onChange={(e) => setForm((f) => ({ ...f, kampus: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="label">Fakultas</label>
        <input
          className="input"
          value={form.fakultas}
          onChange={(e) => setForm((f) => ({ ...f, fakultas: e.target.value }))}
        />
      </div>
      <div>
        <label className="label">Program Studi</label>
        <input
          className="input"
          value={form.prodi}
          onChange={(e) => setForm((f) => ({ ...f, prodi: e.target.value }))}
          placeholder="Manajemen, Akuntansi, dll"
        />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary">
          Simpan Profil
        </button>
        {message && <p className="text-sm text-slate-600">{message}</p>}
      </div>
    </form>
  )
}
