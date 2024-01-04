'use server'

import { createBrevoContact, sendEventEmails } from '@/utils/brevo'
import { SelectedTime } from '@/components/expert/booking-form'
import { stripe } from '@/utils/stripe'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

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

  if (!stripe) {
    return { error: 'stripe error', status: 500 }
  }

  const origin = headers().get('origin')

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    success_url: `${origin}/expert/${expert.username}/book/success`,
    cancel_url: `${origin}/expert/${expert.username}`,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${expert.name} - ${callDuration} minute call`,
            images: [expert.image],
          },
          unit_amount: Math.round(costToClient * 100),
        },
        quantity: 1,
      },
    ],
    customer_email: clientEmail,
  })

  redirect(checkoutSession.url as string)

  // try {
  //   const createContactsResponse = await Promise.all([
  //     createBrevoContact({
  //       name: expert.name,
  //       email: expert.email,
  //       contactType: 'expert',
  //     }),
  //     createBrevoContact({
  //       name: clientEmail,
  //       email: clientEmail,
  //       contactType: 'client',
  //     }),
  //   ])

  //   const sendEventEmailsResponse = await sendEventEmails({
  //     expert,
  //     client: {
  //       email: clientEmail,
  //       timezone: clientTimezone,
  //     },
  //     selectedTime,
  //     callDuration,
  //     costToClient,
  //   })

  //   return { error: null, status: 200 }
  // } catch (error) {
  //   console.error(error)
  //   return { error, status: 500 }
  // }
}
