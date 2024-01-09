import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'

export default async function Dashboard() {
  const session = await getServerSession(options)
  if (!session) return redirect('/auth/signin')
  if (!session.user.onboarded) return redirect('/onboarding/1')

  redirect(`/expert/${session.user.username}`)
}
