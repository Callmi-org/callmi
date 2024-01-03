import { formatCurrency } from '@/utils/utils'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import InputWithLabel from '../onboarding-form/input-with-label'
import { Calendar } from '../ui/calendar'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { UserAvailability } from '@prisma/client'
import SelectDuration from './select-duration'
import { useState } from 'react'
import SelectTimeAndTimezone from './select-time-and-timezone'
import formAction from '@/app/(root)/(users)/expert/[username]/book/action'
import { useToast } from '../ui/use-toast'
import { redirect } from 'next/navigation'
import {
  constructUTCDateFromDateAndTime,
  getAvailableTimes,
} from '@/utils/booking'

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
  profile: UserAPIResponse
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  availability: UserAvailability[]
}

export type SelectedTime = {
  utc: string
  expert: string
  client: string
}

export default function BookingForm({
  profile,
  selectedDate,
  setSelectedDate,
  availability,
}: Props) {
  dayjs.tz.setDefault(profile.timezone)

  const clientCostPerHour = profile.costPerHour * 1.2
  const [selectedDuration, setSelectedDuration] = useState<[string, string]>([
    '60',
    `60 minutes - $${clientCostPerHour}`,
  ])
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    utc: '',
    expert: '',
    client: '',
  })

  console.log({ selectedTime })

  const { toast } = useToast()

  const disabledDays = (function () {
    const allDays = [0, 1, 2, 3, 4, 5, 6]
    const availableDays = availability.map(a => a.dayOfWeek)
    return allDays.filter(d => !availableDays.includes(d))
  })()

  const selectedDateAvailability = availability.find(
    a => a.dayOfWeek === selectedDate?.getDay()
  )

  const clientAvailablesTimes = getAvailableTimes({
    selectedDateAvailability,
    selectedDuration,
    selectedTimezone,
    profile,
  })

  function clientAction(formData: FormData) {
    try {
      if (!selectedDate) throw new Error('Please select a date')
      const res = formAction(formData, profile, selectedTime)
      console.log({ res })
    } catch (error) {
      const { message } = error as Error
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      })
      return
    }
    // redirect(`/expert/${profile.username}/book/success`)
  }
  return (
    <form
      action={clientAction}
      className='flex w-full flex-col gap-6'
    >
      <div className='flex justify-between gap-6'>
        <h1 className='text-2xl '>
          Book a call with{' '}
          <span className='whitespace-nowrap'>
            {profile.name.split(' ')[0]}
          </span>
        </h1>
        <h2 className='text-2xl font-semibold'>
          {formatCurrency(clientCostPerHour)}
          <span className='text-sm font-medium text-gray-600'>/60min</span>
        </h2>
      </div>
      <small className='text-gray-600'>
        Book a live 1:1 session and get personalized advice
      </small>
      <InputWithLabel
        label='Email'
        name='clientEmail'
        placeholder='Please enter your email here'
        type='email'
        required
        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      />
      <SelectDuration
        label='Call duration'
        name='callDuration'
        options={[
          ['30', `30 minutes - $${clientCostPerHour / 2}`],
          ['60', `60 minutes - $${clientCostPerHour}`],
        ]}
        required
        value={selectedDuration}
        onChange={(value: string) => {
          setSelectedDuration([value.split(' ')[0], value])
        }}
      />

      <Calendar
        fromDate={new Date()}
        disabled={{ dayOfWeek: disabledDays }}
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
      />

      {selectedDate && (
        <SelectTimeAndTimezone
          label='Meeting time'
          name='callTime'
          options={clientAvailablesTimes}
          required
          placeholder='Select a time'
          selectedTimezone={selectedTimezone}
          setSelectedTimezone={setSelectedTimezone}
          onChange={(value: string) => {
            const utcTime = constructUTCDateFromDateAndTime(selectedDate, value)
            setSelectedTime({
              utc: utcTime.toISOString(),
              expert: utcTime.tz(profile.timezone).format(),
              client: utcTime.tz(selectedTimezone).format(),
            })
          }}
        />
      )}
      <Button
        type='submit'
        className='relative flex w-full items-center justify-center gap-2 bg-brand'
      >
        Proceed to checkout (
        {formatCurrency((clientCostPerHour * +selectedDuration[0]) / 60)})
        <ArrowRight className='absolute right-4 hidden xl:block' />
      </Button>
    </form>
  )
}
