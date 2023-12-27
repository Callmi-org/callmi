import { UserAvailability } from '@prisma/client'
import BookingForm from './booking-form'

type Props = {
  profile: UserAPIResponse
  selectedDate: Date | undefined
  setSelectedDate: (date: Date | undefined) => void
  availability: UserAvailability[]
}

export default function BookingSidebar({
  profile,
  selectedDate,
  setSelectedDate,
  availability,
}: Props) {
  return (
    <aside className='relative col-span-3 row-span-3 hidden h-full sm:block xl:col-span-1 '>
      <div className='sticky left-0 top-4  rounded-3xl  border bg-white p-10 shadow-2xl'>
        <BookingForm
          availability={availability}
          profile={profile}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </aside>
  )
}
