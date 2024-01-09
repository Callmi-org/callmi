'use server'

import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import prisma from '@/utils/prisma'

export const formAction = async (data: FormData) => {
  const userId = data.get('userId')
  const charityName = data.get('charityName')?.toString()
  const charityUrl = data.get('charityUrl')?.toString()

  const session = await getServerSession(options)

  if (!session) return { error: 'Unauthorized', status: 403 }

  if (!userId || !charityName || !charityUrl) {
    return { error: 'Missing data in request body', status: 400 }
  }
  if (session?.user.id !== userId) return { error: 'Unauthorized', status: 403 }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      charityName,
      charityUrl,
    },
  })

  if (!result) {
    return { error: 'update failed', status: 500 }
  }

  return { error: null, status: 200 }
}
