'use server'

import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import util from 'util'
import dayjs from 'dayjs'
import prisma from '@/utils/prisma'
import { UserAvailability } from '@prisma/client'

export const formAction = async (data: Availability[]) => {
  // Validate data

  const inspect = util.inspect(data)
  console.log(inspect)
  // if (!id || !availability) return redirect('/onboarding/4')

  const session = await getServerSession(options)

  // TODO
  const availability = data
    .filter(day => day.enabled)
    .map(day => {
      const { startTime: start, endTime: end } = day
      const startTime = dayjs()
        .hour(start.hour)
        .minute(start.minute)
        .format('HH:mm')
      const endTime = dayjs().hour(end.hour).minute(end.minute).format('HH:mm')

      return {
        dayOfWeek: day.dayOfWeek,
        startTime,
        endTime,
        userId: session?.user.id,
      }
    })

  // Update user
  try {
    // await prisma.userAvailability.createMany({
    //   data: availability as any,
    // })

    // If user availabilities exist, update them, otherwise create them

    const userAvailabilities = await prisma.userAvailability.findMany({
      where: { userId: session?.user.id },
    })

    console.log({ userAvailabilities })

    if (userAvailabilities.length) {
      await prisma.userAvailability.deleteMany({
        where: { userId: session?.user.id },
      })
    }

    await prisma.userAvailability.createMany({
      data: availability as any,
    })
  } catch (error) {
    console.error(error)
  }

  return
  // Redirect to next step
  // redirect('/onboarding/5')
}
