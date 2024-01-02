'use server'
import * as brevo from '@getbrevo/brevo'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { SelectedTime } from '@/components/expert/booking-form'
import { formatCurrency } from './utils'

type SendEventEmailArgs = {
  expert: UserAPIResponse
  client: {
    email: string
    timezone: string
  }
  selectedTime: SelectedTime
  callDuration: string
  costToClient: number
}

export async function sendEventEmails({
  expert,
  client,
  selectedTime,
  callDuration,
  costToClient,
}: SendEventEmailArgs) {
  const transactionalEmailAPI = new brevo.TransactionalEmailsApi()
  transactionalEmailAPI.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
  )
  const emailToCallmi = new brevo.SendSmtpEmail()

  emailToCallmi.templateId = 4

  emailToCallmi.sender = {
    name: 'Callmi',
    email: 'w@callmi.co',
  }

  emailToCallmi.params = {
    DURATION: callDuration,
    EXPERT: expert.name,
    CLIENT_EMAIL: client.email,
    EXPERT_TIMEZONE: expert.timezone,
    SCHEDULED_DATE: dayjs(selectedTime.expert).format('DD/MM/YYYY'),
    SCHEDULED_TIME: dayjs(selectedTime.expert).format('HH:mm'),
  }

  emailToCallmi.to = [
    {
      email: 'w@callmi.co',
      name: 'Walid',
    },
    {
      email: 'mahmoud@shawa.dev',
      name: 'Mahmoud',
    },
  ]

  const callmiEmailRes =
    await transactionalEmailAPI.sendTransacEmail(emailToCallmi)

  // return callmiEmailRes.body

  const emailToExpert = new brevo.SendSmtpEmail()

  emailToExpert.templateId = 3

  emailToExpert.sender = {
    name: 'Callmi',
    email: 'w@callmi.co',
  }

  emailToExpert.params = {
    DURATION: callDuration,
    CLIENT_EMAIL: client.email,
    CLIENT_TIMEZONE: client.timezone,
    EXPERT_TIMEZONE: expert.timezone,
    SCHEDULED_DATE: dayjs(selectedTime.expert).format('DD/MM/YYYY'),
    SCHEDULED_TIME: dayjs(selectedTime.expert).format('HH:mm'),
  }

  emailToExpert.to = [
    {
      email: expert.email,
      name: expert.name,
    },
    {
      email: 'mahmoud@shawa.dev',
      name: 'Mahmoud',
    },
  ]

  const expertEmailRes =
    await transactionalEmailAPI.sendTransacEmail(emailToExpert)

  const emailToClient = new brevo.SendSmtpEmail()

  emailToClient.templateId = 2

  emailToClient.sender = {
    name: 'Callmi',
    email: 'w@callmi.co',
  }

  emailToClient.params = {
    DURATION: callDuration,
    EXPERT_NAME: expert.name,
    CLIENT_TIMEZONE: client.timezone,
    SCHEDULED_DATE: dayjs(selectedTime.client).format('DD/MM/YYYY'),
    SCHEDULED_TIME: dayjs(selectedTime.client).format('HH:mm'),
    COST_TO_CLIENT: formatCurrency(costToClient),
  }

  emailToClient.to = [
    {
      email: client.email,
      name: client.email,
    },
    {
      email: 'mahmoud@shawa.dev',
      name: 'Mahmoud',
    },
  ]

  const clientEmailRes =
    await transactionalEmailAPI.sendTransacEmail(emailToClient)

  return { callmiEmailRes, expertEmailRes, clientEmailRes }
}
type CreateContactArgs = SendEmailArgs & {
  contactType: 'client' | 'expert'
}

const contactTypeToListId = {
  client: 5,
  expert: 4,
} as const

export async function createBrevoContact({
  name,
  email,
  contactType,
}: CreateContactArgs) {
  const apiInstance = new brevo.ContactsApi()

  apiInstance.setApiKey(
    brevo.ContactsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
  )

  const contact = new brevo.CreateContact()

  const fullName = name.split(' ')

  contact.email = email
  contact.listIds = [contactTypeToListId[contactType]]

  if (contactType === 'expert') {
    contact.attributes = {
      FIRSTNAME: fullName[0],
      LASTNAME: fullName[1],
    }
  }

  try {
    const res = await apiInstance.createContact(contact)
    return res
  } catch (error) {
    console.error(error)
  }
}

type SendEmailArgs = {
  name: string
  email: string
}
export async function sendWelcomeEmail({ name, email }: SendEmailArgs) {
  try {
    const transactionalEmailAPI = new brevo.TransactionalEmailsApi()
    transactionalEmailAPI.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY as string
    )
    const sendSmtpEmail = new brevo.SendSmtpEmail()

    sendSmtpEmail.templateId = 1

    sendSmtpEmail.sender = {
      name: 'Walid',
      email: 'w@callmi.co',
    }

    sendSmtpEmail.params = {
      FIRSTNAME: name.split(' ')[0],
    }

    sendSmtpEmail.to = [{ email, name }]

    const res = await transactionalEmailAPI.sendTransacEmail(sendSmtpEmail)

    return res
  } catch (error) {
    console.error(error)
  }
}
