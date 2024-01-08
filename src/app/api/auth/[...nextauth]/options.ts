import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { createBrevoContact, sendWelcomeEmail } from '@/utils/brevo'
// import { google } from 'googleapis'

const prisma = new PrismaClient()

const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  theme: {
    brandColor: '#fe494b',
    colorScheme: 'light',
    logo: '/logo.png',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      // authorization: {
      //   params: {
      //     scope:
      //       'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      //   },
      // },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  pages: {
    newUser: '/onboarding/1',
    signIn: '/auth/signin',
  },
  jwt: {
    maxAge: 5 * 24 * 60 * 60,
  },
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user, trigger }) {
      // @ts-ignore
      session.user = user
      return session
    },
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (!isNewUser) return
      try {
        const { email, name } = user
        if (!email || !name) throw new Error('Missing email or name')
        await createBrevoContact({
          name,
          email,
          contactType: 'expert',
        })
        await sendWelcomeEmail({ name: user.name!, email: user.email! })
      } catch (error) {
        console.error(error)
      }
    },
  },
}

export default options
