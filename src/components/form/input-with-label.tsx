import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = React.InputHTMLAttributes<'number' | 'string'> & {
  label: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isCurrency?: boolean
  labelAlt?: string
}

export default function InputWithLabel({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  isCurrency,
  min,
  max,
  title,
  labelAlt,
}: Props) {
  return (
    <div className='relative flex w-full flex-col gap-1'>
      <Label htmlFor={name}>{label}</Label>
      {labelAlt && (
        <span className='absolute right-1 top-0.5 text-[0.7rem] font-light text-gray-400'>
          {labelAlt}
        </span>
      )}
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value}
        disabled={disabled}
        required={required}
        isCurrency={isCurrency}
        min={min}
        max={max}
        title={title}
      />
    </div>
  )
}
