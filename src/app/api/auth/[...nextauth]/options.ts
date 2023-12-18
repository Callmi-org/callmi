import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { google } from 'googleapis'

const prisma = new PrismaClient()

const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
        },
      },
    }),
  ],
  pages: {
    newUser: '/onboarding/1',
  },
  callbacks: {
    async session({  session, user }:any) {
      user.expertise= user.expertise===null? []:JSON.parse(user.expertise)
      user.industry= user.industry===null? []:JSON.parse(user.industry)
      // @ts-ignore
      session.user = user
      session.user.firstName = user.name.split(" ")[0]
      return session
    },
  },
}

export default options
