import { NextRequest } from 'next/server'
import { stripe } from '@/utils/stripe'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { inspect } from 'util'
import prisma from '@/utils/prisma'
import { createBrevoContact, sendEventEmails } from '@/utils/brevo'
import { SelectedTime } from '@/components/expert/booking-form'

export async function POST(req: NextRequest) {
  console.log('In POST /api/webhooks/route.ts')
  const { STRIPE_WEBHOOK_SECRET } = process.env

  if (!STRIPE_WEBHOOK_SECRET) {
    return Response.json({ message: 'no secret' }, { status: 500 })
  }

  const sig = headers().get('stripe-signature')

  if (!sig) return Response.json({ message: 'no signature' }, { status: 400 })

  let event: Stripe.Event

  try {
    const body = await req.text()

    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)

    if (event.type !== 'payment_intent.succeeded') {
      return Response.json(
        { message: 'not payment_intent.succeeded' },
        { status: 200 }
      )
    }

    console.log(inspect(event, true, 10, true))

    const paymentIntent = event.data.object as Stripe.PaymentIntent

    const { metadata } = paymentIntent
    const {
      duration,
      meetingDate,
      clientEmail,
      clientTimezone,
      costToClient,
      expertId,
      payableToExpert,
      expertTimezone,
      clientName,
      expertName,
      expertEmail,
    } = metadata

    const parsedDate: SelectedTime = JSON.parse(meetingDate)

    const prismaResult = await prisma.meeting.create({
      data: {
        durationInMinutes: parseInt(duration),
        meetingDateUTC: new Date(parsedDate.utc),
        clientEmail,
        clientTimezone,
        costToClient: parseFloat(costToClient),
        expertId: expertId,
        payableToExpert: parseFloat(payableToExpert),
        stripeSessionId: paymentIntent.id,
        clientName,
        expertTimezone,
      },
    })

    console.log({ prismaResult })

    if (!prismaResult) {
      return Response.json(
        { message: 'failed to create database entry' },
        { status: 500 }
      )
    }

    const createContactsResponse = await Promise.all([
      createBrevoContact({
        name: expertName,
        email: expertEmail,
        contactType: 'expert',
      }),
      createBrevoContact({
        name: clientEmail,
        email: clientEmail,
        contactType: 'client',
      }),
    ])

    const sendEventEmailsResponse = await sendEventEmails({
      expert: {
        name: expertName,
        email: expertEmail,
        timezone: expertTimezone,
      },
      client: {
        email: clientEmail,
        timezone: clientTimezone,
      },
      selectedTime: JSON.parse(meetingDate),
      duration,
      costToClient: +costToClient,
    })

    if (sendEventEmailsResponse.error) {
      console.error(sendEventEmailsResponse.error)
      return Response.json(
        { error: sendEventEmailsResponse.error },
        { status: 500 }
      )
    }

    return Response.json({ error: null }, { status: 200 })
  } catch (err) {
    console.log(err)
    const { message } = err as Error
    return Response.json({ error: message }, { status: 400 })
  }
}
