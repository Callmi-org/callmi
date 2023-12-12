import { formatCurrency } from '@/utils/utils'
import { Calendar } from '../ui/calendar'
import InputWithLabel from '../form/input-with-label'
import SelectWithLabel from '../form/select-with-label'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import BookingForm from './booking-form'

type Props = {
  profile: User
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
}

export default function BookingSidebar({
  profile,
  selectedDate,
  setSelectedDate,
}: Props) {
  return (
    <aside className='col-span-3 row-span-3 hidden sm:block xl:col-span-1 '>
      <div className='left-0 top-24  rounded-3xl  border bg-white p-10 shadow-2xl'>
        <BookingForm
          profile={profile}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </aside>
  )
}
