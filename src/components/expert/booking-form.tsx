'use client'
import { formatCurrency } from '@/utils/utils'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import InputWithLabel from '../form/input-with-label'
import { Calendar } from '../ui/calendar'
import Link from 'next/link'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { convertTimeStringToObject } from '@/utils/prisma'
import { UserAvailability } from '@prisma/client'
import SelectDuration from '../form/select-duration'
import { useState } from 'react'
import SelectTimeAndTimezone from '../form/select-time-and-timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
  profile: UserAPIResponse
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  availability: UserAvailability[]
}

export default function BookingForm({
  profile,
  selectedDate,
  setSelectedDate,
  availability,
}: Props) {
  dayjs.tz.setDefault(profile.timezone)
  const [selectedDuration, setSelectedDuration] = useState<[string, string]>([
    '60',
    `60 minutes - $${profile.costPerHour}`,
  ])
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )

  const disabledDays = (function () {
    const allDays = [0, 1, 2, 3, 4, 5, 6]
    const availableDays = availability.map(a => a.dayOfWeek)
    return allDays.filter(d => !availableDays.includes(d))
  })()

  const selectedDateAvailability = availability.find(
    a => a.dayOfWeek === selectedDate?.getDay()
  )

  function getAvailableTimes(date?: UserAvailability) {
    if (!date) return []
    let { dayOfWeek, startTime, endTime } = date
    const day = dayjs().day(dayOfWeek)

    const startTimeObject = convertTimeStringToObject(startTime)
    const endTimeObject = convertTimeStringToObject(endTime)

    if (profile.timezone !== selectedTimezone) {
      const timezoneDifference =
        dayjs().tz(selectedTimezone).utcOffset() -
        dayjs().tz(profile.timezone).utcOffset()

      startTimeObject.hour += timezoneDifference / 60
      // startTimeObject.minute += timezoneDifference % 60
      endTimeObject.hour += timezoneDifference / 60
      // endTimeObject.minute += timezoneDifference % 60

      console.log({ startTime, endTime, timezoneDifference })
    }
    // console.log({
    //   day,
    //   startTimeObject,
    //   endTimeObject,
    //   selectedTimezone,
    //   profile,
    // })

    const availableTimes = []

    if (selectedDuration[0] === '60') {
      for (let i = startTimeObject.hour; i < endTimeObject.hour; i++) {
        availableTimes.push(`${i}:00`)
      }
    }

    if (selectedDuration[0] === '30') {
      for (let i = startTimeObject.hour; i < endTimeObject.hour; i++) {
        availableTimes.push(`${i}:00`)
        availableTimes.push(`${i}:30`)
      }
    }

    // console.log({ day, startTimeObject, endTimeObject, availableTimes })

    return availableTimes.length ? availableTimes : []
  }

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex justify-between gap-6'>
        <h1 className='text-2xl '>
          Book a call with{' '}
          <span className='whitespace-nowrap'>
            {profile.name.split(' ')[0]}
          </span>
        </h1>
        <h2 className='text-2xl font-semibold'>
          {formatCurrency(profile.costPerHour)}
          <span className='text-sm font-medium text-gray-600'>/60min</span>
        </h2>
      </div>
      <small className='text-gray-600'>
        Book a live 1:1 session and get personalized advice
      </small>
      <InputWithLabel
        label='Email'
        placeholder='Please enter your email here'
        type='email'
        required
        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      />
      <SelectDuration
        label='Call duration'
        name='duration'
        options={[
          ['30', `30 minutes - $${profile.costPerHour / 2}`],
          ['60', `60 minutes - $${profile.costPerHour}`],
        ]}
        required
        value={selectedDuration}
        onChange={value => {
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
          name='time'
          options={getAvailableTimes(selectedDateAvailability)}
          required
          placeholder='Select a time'
          selectedTimezone={selectedTimezone}
          setSelectedTimezone={setSelectedTimezone}
        />
      )}
      <Link href={`/expert/${profile.id}/book/success`}>
        <Button className='relative flex w-full items-center justify-center gap-2 bg-brand'>
          Proceed to checkout ({formatCurrency(profile.costPerHour)})
          <ArrowRight className='absolute right-4 hidden xl:block' />
        </Button>
      </Link>
    </div>
  )
}
