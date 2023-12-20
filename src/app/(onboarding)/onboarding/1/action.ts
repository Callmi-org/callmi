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
  if (!id || !name || !originalName) return

  let baseUsername = name.toString().replaceAll(' ', '').toLowerCase()
  let suffixedUsername = baseUsername

  let usernameTaken = await prisma.user.findUnique({
    where: { username: baseUsername },
  })

  if (usernameTaken) {
    let i = 1
    while (usernameTaken) {
      suffixedUsername = baseUsername + i
      i++
      usernameTaken = await prisma.user.findUnique({
        where: { username: suffixedUsername },
      })
    }
  }

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

  redirect('/onboarding/2')
}
