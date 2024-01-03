'use server'
import options from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/utils/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function formAction(data: FormData) {
  const userId = data.get('userId')
  const bio = data.get('bio')?.toString()
  const costPerHourString = data.get('costPerHour')

  const costPerHour = costPerHourString ? +costPerHourString : undefined

  const session = await getServerSession(options)

  if (!userId) {
    return { error: 'no user id', status: 400 }
  }

  if (session?.user.id !== userId) {
    return { error: 'not authorized', status: 400 }
  }

  if (!costPerHour || !bio) {
    return { error: 'missing fields', status: 400 }
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      costPerHour,
      bio,
    },
  })

  if (!result) {
    return { error: 'update failed', status: 500 }
  }
  return { error: null, status: 200 }
}
