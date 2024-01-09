import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

export function convertTextToEnum(text: string) {
  return text.replace(/\s/g, '_').replace(/&/g, 'And')
}

export function convertEnumToText(enumValue: string) {
  return enumValue.replace(/_/g, ' ').replace(/And/g, '&')
}

export function getTimeInMinutes(time: Time) {
  return time.hour * 60 + time.minute
}

export function convertTimeObjectToString(time: Time): string {
  return dayjs().hour(time.hour).minute(time.minute).format('HH:mm')
}

export function convertTimeStringToObject(time: string): Time {
  const [hour, minute] = time.split(':').map(Number)

  return { hour, minute: minute as 0 | 15 | 30 | 45 }
}
