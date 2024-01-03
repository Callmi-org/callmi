'use server'

import { createBrevoContact, sendEventEmails } from '@/utils/brevo'
import { SelectedTime } from '@/components/expert/booking-form'

export default async function formAction(
  formData: FormData,
  expert: UserAPIResponse,
  selectedTime: SelectedTime
) {
  const clientEmail = formData.get('clientEmail')?.toString()
  const callDuration = formData.get('callDuration')?.toString().split(' ')[0]
  const callTime = formData.get('callTime')?.toString()
  const clientTimezone = formData.get('clientTimezone')?.toString()
  if (!clientEmail || !callDuration || !callTime || !clientTimezone) {
    return { error: 'missing fields', status: 400 }
  }
  const costToClient =
    expert.costPerHour * ((parseInt(callDuration) / 60) * 1.2)

  const paidToExpert = expert.costPerHour * (parseInt(callDuration) / 60)

  try {
    const createContactsResponse = await Promise.all([
      createBrevoContact({
        name: expert.name,
        email: expert.email,
        contactType: 'expert',
      }),
      createBrevoContact({
        name: clientEmail,
        email: clientEmail,
        contactType: 'client',
      }),
    ])

    const sendEventEmailsResponse = await sendEventEmails({
      expert,
      client: {
        email: clientEmail,
        timezone: clientTimezone,
      },
      selectedTime,
      callDuration,
      costToClient,
    })

    return { error: null, status: 200 }
  } catch (error) {
    console.error(error)
    return { error, status: 500 }
  }
}
