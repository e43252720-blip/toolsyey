'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Assignment = {
  id: string
  judul: string
  mata_kuliah: string
  jenis_tugas: string
  deadline: string
  status: string
  deskripsi?: string
}

const jenisTugas = ['Makalah', 'Laporan', 'Presentasi', 'Studi Kasus', 'Proyek', 'Esai']

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    judul: '',
    mata_kuliah: '',
    jenis_tugas: 'Makalah',
    deadline: '',
    deskripsi: ''
  })

  const fetchAssignments = async () => {
    setLoading(true)
    const res = await fetch('/api/assignments')
    const data = await res.json()
    setAssignments(data.assignments || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchAssignments()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, status: 'belum dikerjakan' })
    })
    if (res.ok) {
      setForm({ judul: '', mata_kuliah: '', jenis_tugas: 'Makalah', deadline: '', deskripsi: '' })
      fetchAssignments()
    }
  }

  const toggleStatus = async (id: string, status: string) => {
    await fetch(`/api/assignments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    fetchAssignments()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/assignments/${id}`, { method: 'DELETE' })
    fetchAssignments()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">Catat semua tugas kuliahmu di sini</p>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Tugas</h1>
        </div>
        <Link href="/dashboard" className="btn-ghost">
          Kembali ke Dashboard
        </Link>
      </div>

      <section className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900">Tambah Tugas</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Judul</label>
            <input
              className="input"
              value={form.judul}
              onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="label">Mata Kuliah</label>
            <input
              className="input"
              value={form.mata_kuliah}
              onChange={(e) => setForm((f) => ({ ...f, mata_kuliah: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="label">Jenis Tugas</label>
            <select
              className="input"
              value={form.jenis_tugas}
              onChange={(e) => setForm((f) => ({ ...f, jenis_tugas: e.target.value }))}
            >
              {jenisTugas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Deadline</label>
            <input
              type="datetime-local"
              className="input"
              value={form.deadline}
              onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">Deskripsi</label>
            <textarea
              className="input min-h-[100px]"
              value={form.deskripsi}
              onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="btn-primary">
              Simpan Tugas
            </button>
          </div>
        </form>
      </section>

      <section className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Daftar Tugas</h2>
          <p className="text-sm text-slate-600">Total: {assignments.length}</p>
        </div>
        <div className="mt-4 space-y-4">
          {loading ? (
            <p>Memuat...</p>
          ) : assignments.length ? (
            assignments.map((task) => (
              <div key={task.id} className="rounded-lg border border-slate-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{task.judul}</p>
                    <p className="text-sm text-slate-600">{task.mata_kuliah}</p>
                    <p className="text-sm text-slate-600">Jenis: {task.jenis_tugas}</p>
                    <p className="text-sm text-slate-600">Deadline: {task.deadline || '-'}</p>
                    <p className="text-xs text-slate-500">{task.deskripsi}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">{task.status}</span>
                    <Link href={`/assignments/${task.id}`} className="btn-ghost text-sm">
                      Detail
                    </Link>
                    <button
                      className="btn-ghost text-sm"
                      onClick={() => toggleStatus(task.id, 'selesai')}
                    >
                      Tandai Selesai
                    </button>
                    <button
                      className="btn-ghost text-sm text-red-600"
                      onClick={() => handleDelete(task.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-600">Belum ada tugas.</p>
          )}
        </div>
      </section>
    </div>
  )
}
