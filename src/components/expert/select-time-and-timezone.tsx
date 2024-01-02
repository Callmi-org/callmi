import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type Props = {
  name: string
  label: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  options?: string[]
  selectedTimezone: string
  setSelectedTimezone: (value: string) => void
}

export default function SelectTimeAndTimezone({
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  options,
  selectedTimezone,
  setSelectedTimezone,
}: Props) {
  return (
    <div className='relative flex w-full flex-col gap-1'>
      <Label htmlFor={name}>{label}</Label>
      <div className='absolute -top-1 right-2 flex flex-nowrap gap-2 text-sm '>
        <span className='font-medium'>Time Zone:</span>
        <select
          className=' w-min max-w-[6rem] cursor-pointer truncate bg-transparent'
          name='clientTimezone'
          onChange={e => setSelectedTimezone(e.target.value)}
        >
          {Intl.supportedValuesOf('timeZone').map(timezone => (
            <option
              key={timezone}
              value={timezone}
              selected={timezone === selectedTimezone}
              className='truncate'
            >
              {timezone}
            </option>
          ))}
        </select>
      </div>
      <Select
        onValueChange={onChange}
        required={required}
        disabled={disabled}
        defaultValue={value}
        name={name}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={placeholder}
            className='w-full'
          />
        </SelectTrigger>
        <SelectContent>
          {options?.map(option => (
            <SelectItem
              className='text-gray-500'
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
