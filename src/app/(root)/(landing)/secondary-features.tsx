import { CreditCard, Globe2, Clock, CalendarRange } from 'lucide-react'

const iconProps = {
  size: 40,
  className: 'text-white',
}

export default function SecondaryFeatures() {
  return (
    <section className='w-full bg-[#080808] px-4 py-10 md:bg-white'>
      <div className='mx-auto w-full max-w-9xl rounded-[3.5rem] bg-[#080808] md:p-16'>
        <h1 className='text-center text-3xl text-white'>You also get</h1>
        <div className='mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <Card
            icon={<CreditCard {...iconProps} />}
            title='Integrated Payments'
            description='Long gone are the days of awkwardly asking your customers for money. We take care of the billing for you via Stripe.'
          />
          <Card
            icon={<Globe2 {...iconProps} />}
            title='Time Zone Support'
            description='Our platform automatically adjusts for different time zones, ensuring hassle-free scheduling for global consultations and meetings.'
          />
          <Card
            icon={<Clock {...iconProps} />}
            title='Flexible Availability'
            description='Customize your available hours with ease. Our system adapts to your lifestyle, allowing you to set and update your schedule as needed.'
          />

          <Card
            icon={<CalendarRange {...iconProps} />}
            title='Calendar Sync'
            description='Callmi syncs around your existing appointments, helping to manage your time efficiently and avoid double bookings.'
          />
        </div>
      </div>
    </section>
  )
}

type CardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

function Card({ icon, title, description }: CardProps) {
  return (
    <div className='flex flex-col items-start justify-start gap-4 p-4'>
      {icon}
      <span className='text-xl font-semibold text-white'>{title}</span>
      <span className='font-extralight text-gray-400'>{description}</span>
    </div>
  )
}
