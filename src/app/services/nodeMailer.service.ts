import * as nodemailer from 'nodemailer'

const MailService = {
  transporter: nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    debug: true,
  }),

  verifyConnection: function () {
    this.transporter.verify().then(console.log).catch(console.error)
  },

  sendMail: function (mailOptions: any) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    })
  },

  sendSignUpSuccessfullyMsg: async function (email: string) {
    try {
      const mailOptions: any = {
        from: process.env.SMTP_USERNAME,
        to: email,
        subject: 'SignUp',
        html: `<h2>Thank You For Signup<h2>`,
      }
      return await this.sendMail(mailOptions)
    } catch (error) {
      console.log('Error in Signup', error)
      return error
    }
  },
}

export default MailService
