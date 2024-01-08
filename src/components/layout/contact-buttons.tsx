import Image from 'next/image'
export function EmailButton() {
  return (
    <a
      className='font-semibold text-brand'
      href='mailto:w@callmi.co'
    >
      {' '}
      email (w@callmi.co)
    </a>
  )
}
export function WhatsappButton() {
  return (
    <a
      className='inline-flex items-center gap-1 font-semibold text-green-600'
      href='https://wa.me/971585985161'
    >
      {' '}
      WhatsApp
      <Image
        src='/svg/whatsapp.svg'
        width={20}
        height={20}
        alt='WhatsApp'
      />
    </a>
  )
}
