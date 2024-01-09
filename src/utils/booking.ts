import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import dayjsTimezone from 'dayjs/plugin/timezone'
import { convertTimeStringToObject } from './prisma'
dayjs.extend(utc)
dayjs.extend(dayjsTimezone)

export function constructUTCDateFromDateAndTime(date: Date, time: string) {
  const timeObject = convertTimeStringToObject(time)
  const utcDate = dayjs(date)
    .hour(timeObject.hour)
    .minute(timeObject.minute)
    .utc()
  return utcDate
}

export function convertUTCDateToTimezone(
  utcDate: dayjs.Dayjs,
  timezone: string
) {
  return utcDate.tz(timezone)
}

export function getLocalDateAndTimeFromUTCString(
  utcString: string,
  timezone: string
) {
  const utcDate = dayjs(utcString)
  const date = convertUTCDateToTimezone(utcDate, timezone)
  return {
    date: date.format('DD/MM/YYYY'),
    time: date.format('h:mm A'),
  }
}

type GetAvailableTimesArgs = {
  selectedDateAvailability?: UserAvailability
  selectedTimezone: string
  selectedDuration: string[]
  profile: UserAPIResponse
}

export function getAvailableTimes({
  selectedDateAvailability,
  selectedTimezone,
  selectedDuration,
  profile,
}: GetAvailableTimesArgs) {
  if (!selectedDateAvailability) return []
  let { startTime, endTime } = selectedDateAvailability

  const startTimeObject = convertTimeStringToObject(startTime)
  const endTimeObject = convertTimeStringToObject(endTime)

  const isSameTimezone = profile.timezone === selectedTimezone

  if (!isSameTimezone) {
    const timezoneDifference =
      dayjs().tz(selectedTimezone).utcOffset() -
      dayjs().tz(profile.timezone).utcOffset()

    startTimeObject.hour += timezoneDifference / 60
    // startTimeObject.minute += timezoneDifference % 60
    endTimeObject.hour += timezoneDifference / 60
    // endTimeObject.minute += timezoneDifference % 60

    console.log({ startTime, endTime, timezoneDifference })
  }

  const clientAvailableTimes = []

  if (selectedDuration[0] === '60') {
    for (let i = startTimeObject.hour; i < endTimeObject.hour; i++) {
      clientAvailableTimes.push(`${i}:00`)
    }
  }

  if (selectedDuration[0] === '30') {
    for (let i = startTimeObject.hour; i < endTimeObject.hour; i++) {
      clientAvailableTimes.push(`${i}:00`)
      clientAvailableTimes.push(`${i}:30`)
    }
  }

  // TODO: Remove times that are already booked, or conditionally add them to the list above

  return clientAvailableTimes
}
