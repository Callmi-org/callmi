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
