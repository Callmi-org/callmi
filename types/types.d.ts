type UserAvailability = import('@prisma/client').UserAvailability
type UserMeeting = import('@prisma/client').Meeting
type ExpertiseEnum = import('@prisma/client').$Enums.Expertise
type IndustryEnum = import('@prisma/client').$Enums.Industry
type Expertise = (typeof import('@/data/general').expertiseTypeData)[number]
type Industry = (typeof import('@/data/general').industryTypeData)[number]
type DayOfWeek = (typeof import('@/data/general').daysOfWeek)[number]

type User = {
  id?: string
  name: string
  email: string
  image: string
  timezone: string
  onboarded: boolean
  costPerHour: number
  username?: string
  expertise: Expertise[]
  industry: Industry[]
  bio: string
  position: string
  company?: string
  charityName?: string
  charityUrl?: string
  availability: Availability[]
  meetings?: Meeting[]
}

type UserAPIResponse = {
  id: string
  name: string
  email: string
  image: string
  timezone: string
  onboarded: boolean
  costPerHour: number
  username: string
  expertise: ExpertiseEnum[]
  industry: IndustryEnum[]
  bio: string
  position: string
  company: string
  charityName: string
  charityUrl: string
  availability: UserAvailability[]
  meetings?: UserMeeting[]
}
type Availability = {
  dayOfWeek: number
  enabled: boolean
  startTime: Time
  endTime: Time
}

type Time = {
  // hour is 0-23
  hour: number
  minute: 0 | 15 | 30 | 45
}

type Meeting = {
  id: string
  durationInMinutes: number
  meetingDate: Date
  clientName: string
  clientEmail: string
  clientTimezone: string
  costToClient: number
  expert: User
  expertId: string
  createdAt: Date
}
