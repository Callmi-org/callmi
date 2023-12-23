'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { cn } from '@/utils/utils'
import { Switch } from '@/components/ui/switch'

type AvailabilityProps = {
  dayOfWeek: string
  availability: Availability
  setAvailabilities: Dispatch<SetStateAction<Availability[]>>
}

export default function Availability({
  dayOfWeek,
  availability,
  setAvailabilities,
}: AvailabilityProps) {
  dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
  const [startTime, setStartTime] = useState<Time>({
    hour: 9,
    minute: 0,
    ampm: 'am',
  })
  const [endTime, setEndTime] = useState<Time>({
    hour: 5,
    minute: 0,
    ampm: 'pm',
  })

  const handleEnableChange = (checked: boolean) => {
    setAvailabilities(prev => {
      const newAvailabilities = [...prev]
      newAvailabilities[availability.weekDay].enabled = checked
      return newAvailabilities
    })
  }

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    startOrEnd: 'startTime' | 'endTime'
  ) => {
    switch (e.target.name) {
      case 'hours':
        setAvailabilities(prev => {
          const newAvailabilities = [...prev]
          newAvailabilities[availability.weekDay][startOrEnd].hour =
            +e.target.value
          return newAvailabilities
        })
        break
      case 'minutes':
        setAvailabilities(prev => {
          const newAvailabilities = [...prev]
          newAvailabilities[availability.weekDay][startOrEnd].minute = +e.target
            .value as Time['minute']
          return newAvailabilities
        })
        break
      case 'ampm':
        setAvailabilities(prev => {
          const newAvailabilities = [...prev]
          newAvailabilities[availability.weekDay][startOrEnd].ampm = e.target
            .value as Time['ampm']
          return newAvailabilities
        })
        break
    }
  }

  return (
    <div className='flex justify-between gap-4 md:grid md:grid-cols-2'>
      <div className='flex items-center gap-4'>
        <Switch
          name={`available-${dayOfWeek}`}
          className='toggle'
          checked={availability.enabled}
          onCheckedChange={handleEnableChange}
        />
        <h3 className='font-semibold md:text-lg'>{dayOfWeek}</h3>
      </div>
      <div className='flex items-center gap-1 md:gap-4'>
        <TimePicker
          time={startTime}
          onChange={e => handleTimeChange(e, 'startTime')}
          name={dayOfWeek}
          isAvailable={availability.enabled}
        />
        <span
          className={cn(
            'h-[1px] w-2 bg-black',
            availability.enabled ? 'opacity-100' : 'opacity-50'
          )}
        ></span>
        <TimePicker
          time={endTime}
          onChange={e => handleTimeChange(e, 'endTime')}
          name={dayOfWeek}
          isAvailable={availability.enabled}
        />
      </div>
    </div>
  )
}

type TimePickerProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  name: string
  time: Time
  isAvailable: boolean
}

function TimePicker({ onChange, name, time, isAvailable }: TimePickerProps) {
  return (
    <div className={cn(isAvailable ? '' : 'opacity-50')}>
      <div className='flex items-center gap-0.5 rounded-full border bg-white px-2 py-2 text-sm md:px-4'>
        <select
          name='hours'
          className='appearance-none bg-transparent outline-none'
          onChange={onChange}
          value={time.hour}
          disabled={!isAvailable}
        >
          {Array.from(Array(12).keys()).map(i => (
            <option
              key={i}
              value={i + 1}
            >
              {i + 1}
            </option>
          ))}
        </select>
        <span>:</span>
        <select
          name='minutes'
          className='appearance-none bg-transparent outline-none'
          value={time.minute}
          onChange={onChange}
          disabled={!isAvailable}
        >
          <option
            selected
            value={0}
          >
            00
          </option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
        </select>
        <select
          name='ampm'
          className='appearance-none bg-transparent outline-none'
          value={time.ampm}
          onChange={onChange}
          disabled={!isAvailable}
        >
          <option value='am'>AM</option>
          <option value='pm'>PM</option>
        </select>
      </div>
    </div>
  )
}
