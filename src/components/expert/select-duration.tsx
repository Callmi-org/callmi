'use client'
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
  value: [string, string]
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  options?: [string, string][]
}

export default function SelectDuration({
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  options,
}: Props) {
  return (
    <div className='relative flex w-full flex-col gap-1'>
      <Label htmlFor={name}>{label}</Label>
      <Select
        onValueChange={onChange}
        required={required}
        disabled={disabled}
        name={name}
        value={value[1]}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={placeholder}
            className='w-full'
            defaultValue={value[0]}
          >
            {value[1]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options?.map(option => (
            <SelectItem
              className='text-gray-500'
              key={option[1]}
              value={option[1]}
            >
              {option[0]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
