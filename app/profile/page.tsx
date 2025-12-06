import { createSupabaseServerClient } from '../../lib/supabaseClient'
import ProfileForm from './profile-form'

export default async function ProfilePage() {
  const supabase = createSupabaseServerClient()
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user?.id

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId ?? '')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-600">Lengkapi informasi dasar kamu</p>
        <h1 className="text-3xl font-bold text-slate-900">Profil Mahasiswa</h1>
      </div>
      <ProfileForm initialData={profile} />
    </div>
  )
}
