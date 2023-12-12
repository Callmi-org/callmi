export default function HighlightSpan({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <span className='relative before:absolute  before:bottom-1/2 before:left-0  before:block before:h-[1.7ch] before:w-full before:translate-y-1/2  before:rounded before:bg-highlight'>
      <span className='relative'>{children}</span>
    </span>
  )
}
