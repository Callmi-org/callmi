'use server'
import prisma from '@/utils/prisma'
import { redirect } from 'next/navigation'

export default async function formAction(data: FormData) {
  const id = data.get('userId')
  const name = data.get('name')
  const originalName = data.get('originalName')
  const company = data.get('company')
  const position = data.get('position')
  const timezone = data.get('timezone')

  console.log({ id, name, originalName, company, position, timezone })
  // Validate data
  if (!id || !name || !originalName) return redirect('/onboarding/1')

  // Create username based on fullname if not already used by another user
  let baseUsername = name.toString().replaceAll(' ', '').toLowerCase()
  let suffixedUsername = baseUsername
  // Check if username is already taken
  let usernameTaken = await prisma.user.findUnique({
    where: { username: baseUsername },
  })

  if (usernameTaken) {
    // If username is taken, add a one to the end of it, and check again. increment until we find a username that is not taken
    let i = 1
    while (usernameTaken) {
      suffixedUsername = baseUsername + i
      i++
      usernameTaken = await prisma.user.findUnique({
        where: { username: suffixedUsername },
      })
    }
  }

  // Update user
  await prisma.user.update({
    where: { id: id.toString() },
    data: {
      name: name.toString(),
      company: company?.toString(),
      position: position?.toString(),
      timezone: timezone?.toString(),
      username: suffixedUsername,
    },
  })

  // Redirect to next step
  redirect('/onboarding/2')
}
