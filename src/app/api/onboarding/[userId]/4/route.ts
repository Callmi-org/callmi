import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma, { convertTimeStringToObject } from '@/utils/prisma'
import options from '../../../auth/[...nextauth]/options'
import { UserAvailability } from '@prisma/client'
import { defaultAvailabilities } from '@/data/general'
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(options)

  const { userId } = params
  if (!userId) {
    return Response.json({ message: 'no user id' })
  }

  if (session?.user.id !== userId) {
    return Response.json({ message: 'not authorized' })
  }

  const result = await prisma.userAvailability.findMany({
    where: {
      userId: userId,
    },
  })

  const formattedData = result.map((availability: UserAvailability) => ({
    ...availability,
    enabled: true,
    startTime: convertTimeStringToObject(availability.startTime),
    endTime: convertTimeStringToObject(availability.endTime),
  }))

  const mergedData = defaultAvailabilities.map(availability => {
    const match = formattedData.find(
      (formattedAvailability: any) =>
        formattedAvailability.dayOfWeek === availability.dayOfWeek
    )
    if (match) return match
    return availability
  })

  return Response.json(mergedData)
}
