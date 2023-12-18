type HandleSubmitProps = {
  id: string
  charityName: string
  charityUrl: string
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  push: (path: string) => void
  username:string
}

export default async function handleSubmit({
  id,
  username,
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
  
  return push(`/expert/${username}`)
}
