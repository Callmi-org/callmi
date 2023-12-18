'use server'

import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import {
  convertFormData,
} from '../../../../utils/utils'
import prisma from '@/utils/prisma'

export const formAction = async (data: FormData) => {
  'use server'
  const session = await getServerSession(options)
  // Validate data
  const convertData = convertFormData(data, session?.user.id as string)
  // if (!id || !availability) return redirect('/onboarding/4')

  // TODO
  // const availabilityObj: Record<string, boolean> = {}
  // Update user
  const createAvailability = await prisma.availability.createMany({
    data: convertData,
  })

  // Redirect to next step
  redirect('/onboarding/5')
}
