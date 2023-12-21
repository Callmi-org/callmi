import * as brevo from '@getbrevo/brevo'

export async function createBrevoContact({ name, email }: SendEmailArgs) {
  const apiInstance = new brevo.ContactsApi()

  apiInstance.setApiKey(
    brevo.ContactsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
  )

  const contact = new brevo.CreateContact()

  const fullName = name.split(' ')

  contact.email = email
  contact.attributes = {
    FIRSTNAME: fullName[0],
    LASTNAME: fullName[1],
  }

  try {
    const res = await apiInstance.createContact(contact)
    console.log('res', { res })
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

  console.log('res', { res })

  return res
}
