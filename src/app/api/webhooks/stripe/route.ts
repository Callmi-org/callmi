import { NextRequest } from 'next/server'
import { stripe } from '@/utils/stripe'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { inspect } from 'util'

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
  } catch (err) {
    console.log(err)
    const { message } = err as Error
    return Response.json({ error: message }, { status: 400 })
  }

  console.log({ req })
  // res.json(result)
  return Response.json(
    { message: 'In POST /api/webhooks/route.ts' },
    { status: 200 }
  )
}
