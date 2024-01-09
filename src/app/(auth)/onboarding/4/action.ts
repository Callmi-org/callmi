'use server'

import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import prisma, {
  convertTimeObjectToString,
  getTimeInMinutes,
} from '@/utils/prisma'

export const formAction = async (data: Availability[], id: string) => {
  const session = await getServerSession(options)
  if (!id || !data)
    return { error: "Missing 'id' or 'data' in request body", status: 400 }

  if (!session) return { error: 'Unauthorized', status: 403 }

  if (session?.user.id !== id) return { error: 'Unauthorized', status: 403 }

  if (!data.length)
    return { error: 'Please pick at least one availability slot', status: 400 }

  let allValid = true

  if (data.length) {
    allValid = data.every(day => {
      const startInMinutes = getTimeInMinutes(day.startTime)
      const endInMinutes = getTimeInMinutes(day.endTime)

      return startInMinutes < endInMinutes
    })
  }

  if (!allValid)
    return {
      error: 'Invalid time range. Ensure start time comes before end time.',
      status: 400,
    }
  // TODO
  const availability = data.map(day => {
    const { startTime: start, endTime: end } = day
    const startTime = convertTimeObjectToString(start)
    const endTime = convertTimeObjectToString(end)

    return {
      dayOfWeek: day.dayOfWeek,
      startTime,
      endTime,
      userId: session?.user.id!,
    }
  })

  try {
    const userAvailabilities = await prisma.userAvailability.findMany({
      where: { userId: session?.user.id },
    })

    if (userAvailabilities.length) {
      await prisma.userAvailability.deleteMany({
        where: { userId: session?.user.id },
      })
    }

    await prisma.userAvailability.createMany({
      data: availability,
    })

    await prisma.user.update({
      where: { id: session?.user.id },
      data: { onboarded: true },
    })

    return { status: 200 }
  } catch (error) {
    console.error(error)
    return { error: 'Something went wrong on our end', status: 500 }
  }
}
