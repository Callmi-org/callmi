import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function convertIntoAvailabilityObj(data: any, userId: string) {
  const outputArray = []
  for (let i = 0; i < data.length; i += 7) {
    let day = data[i].name
    if (day.startsWith('$ACTION_ID')) {
      i++
      day = data[i].name
    }
    const startTime = `${data[i + 1].value.padStart(2, '0')}:${data[
      i + 2
    ].value.padStart(2, '0')}:${data[i + 3].value}`
    const endTime = `${data[i + 4].value.padStart(2, '0')}:${data[
      i + 5
    ].value.padStart(2, '0')}:${data[i + 6].value}`

    outputArray.push({
      userId,
      sortIndex: i,
      day,
      startTime,
      endTime,
    })
  }
  return outputArray
}

export function revertIntoAvailabilityObj(data: any) {
  const outputArray: any = []

  data.forEach((item: any) => {
    outputArray.push({ name: item.day, value: 'on' })
    const [startHours, startMinutes, startAmPm] = item.startTime.split(/:/)
    outputArray.push({ name: 'hours', value: startHours })
    outputArray.push({ name: 'minutes', value: startMinutes })
    outputArray.push({ name: 'ampm', value: startAmPm })
    const [endHours, endMinutes, endAmPm] = item.endTime.split(/:/)
    outputArray.push({ name: 'hours', value: endHours })
    outputArray.push({ name: 'minutes', value: endMinutes })
    outputArray.push({ name: 'ampm', value: endAmPm })
  })

  return outputArray
}

export function convertFormData(formData: any, userId: string) {
  const getArray = []
  for (const entry of formData.entries()) {
    const [name, value] = entry
    const modifyName = name.replace('available-', '')
    getArray.push({ name: modifyName, value })
  }
  const outPut = convertIntoAvailabilityObj(getArray, userId)
  return outPut
}
