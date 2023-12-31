export const expertiseTypeData = [
  'B2B Sales',
  'B2C Sales',
  'Bootstrapping',
  'Branding',
  'Financial Planning',
  'Fundraising',
  'Growth Marketing',
  'Manufacturing',
  'People & Hiring',
  'Product & Engineering',
  'Product Marketing',
  'Public Relations',
  'SEM & SEO',
  'Social Media',
  'Strategy & Operations',
  'Coaching',
] as const
export const industryTypeData = [
  'Artificial Intelligence',
  'B2B Services',
  'B2B Software',
  'Consumer Hardware',
  'Consumer Software',
  'Ecommerce & CPG',
  'Education',
  'Fashion & Apparel',
  'Fintech',
  'Food & Beverage',
  'Gaming',
  'Healthcare',
  'Insurance',
  'Media & Entertainment',
  'Real Estate',
  'Venture Capital',
  'Career Expert',
] as const

export const expertiseData: Expertise[] = [
  'B2B Sales',
  'B2C Sales',
  'Bootstrapping',
  'Branding',
  'Financial Planning',
  'Fundraising',
  'Growth Marketing',
  'Manufacturing',
  'People & Hiring',
  'Product & Engineering',
  'Product Marketing',
  'Public Relations',
  'SEM & SEO',
  'Social Media',
  'Strategy & Operations',
  'Coaching',
]

export const industryData: Industry[] = [
  'Artificial Intelligence',
  'B2B Services',
  'B2B Software',
  'Consumer Hardware',
  'Consumer Software',
  'Ecommerce & CPG',
  'Education',
  'Fashion & Apparel',
  'Fintech',
  'Food & Beverage',
  'Gaming',
  'Healthcare',
  'Insurance',
  'Media & Entertainment',
  'Real Estate',
  'Venture Capital',
  'Career Expert',
]

export const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

export const profile: User = {
  name: 'Michael Candor',
  username: 'johndoe',
  email: 'john@doe.co',
  timezone: 'Canada/EST',
  image: 'https://i.pravatar.cc/240',
  onboarded: true,
  expertise: ['Product & Engineering', 'Coaching'],
  industry: ['Artificial Intelligence', 'B2B Software'],
  bio: `I am a software engineer with 10+ years of experience, currently working at Google. 
  I have a passion for helping others and have been mentoring students for the past 5 years, many of whom have gone on to work at Google, Facebook, and other top tech companies.
  Ask me anything about software engineering, career advice, and more!
  
  I am a software engineer with 10+ years of experience, currently working at Google. 
  I have a passion for helping others and have been mentoring students for the past 5 years, many of whom have gone on to work at Google, Facebook, and other top tech companies.
  Ask me anything about software engineering, career advice, and more!`,
  position: 'Software Engineer',
  company: 'Google',
  charityName: 'Charity',
  charityUrl: 'https://www.charity.com',
  id: '123',
  costPerHour: 100,
  // time zones ??
  // https://github.com/calcom/cal.com/blob/main/packages/types/Calendar.d.ts
  availability: [
    {
      dayOfWeek: 0,
      enabled: true,
      startTime: {
        hour: 9,
        minute: 0,
      },
      endTime: {
        hour: 17,
        minute: 0,
      },
    },
  ],
}

export const defaultAvailabilities: Availability[] = daysOfWeek.map(
  (_, idx) => ({
    dayOfWeek: idx,
    enabled: false,
    startTime: {
      hour: 9,
      minute: 0,
    },
    endTime: {
      hour: 17,
      minute: 0,
    },
  })
)
