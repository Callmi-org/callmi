import prisma from '@/utils/prisma'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'

type HandleSubmitProps = {
  id: string
  charityName: string
  charityUrl: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  push: (path: string) => void
}

export default async function handleSubmit({
  id,
  charityName,
  charityUrl,
  setLoading,
  push,
}: HandleSubmitProps) {
  setLoading(true)
	const session = await getServerSession(options)
  // Validate data
  if (!id || !charityName || !charityUrl) {
    console.log('Missing data')
    console.log({ id, charityName, charityUrl })
    setLoading(false)
    return
  }

  const res = await fetch(`/api/onboarding/${id}/5`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      charityName,
      charityUrl,
    }),
  })

  if (!res.ok) {
    console.error(res)
    setLoading(false)
    return
  }
	if (!session) return null
  // go to dashboard
  return push(`/expert/${session.user.username}`)
}
