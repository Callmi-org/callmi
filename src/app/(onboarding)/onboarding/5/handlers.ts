import prisma from '@/utils/prisma'

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
  // Validate data
  if (!id || !charityName || !charityUrl) {
    console.log('Missing data')
    console.log({ id, charityName, charityUrl })
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

  const data = await res.json()

  console.log({ data })

  if (!res.ok) {
    console.error(res)
    setLoading(false)
    return
  }

  // go to dashboard
  return push(`/expert/${data.username}`)
}
