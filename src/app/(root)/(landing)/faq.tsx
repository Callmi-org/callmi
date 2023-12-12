import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqData } from '@/data/landing'

export default function FAQ() {
  return (
    <section
      id='faq'
      className='mx-auto w-full max-w-9xl px-4 pb-16 pt-8'
    >
      <h1 className='whitespace-nowrap text-center text-3xl md:text-5xl'>
        Frequently Asked Questions
      </h1>
      <Accordion
        type='single'
        collapsible
        className='mt-8 w-full'
      >
        {faqData.map(({ question, answer }) => (
          <FAQItem
            key={question}
            question={question}
            answer={answer}
          />
        ))}
      </Accordion>
    </section>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <AccordionItem
      className='px-2 transition-colors data-[state=open]:bg-gray-100'
      value={question}
    >
      <AccordionTrigger className='data-[state=open]:no-underline'>
        {question}
      </AccordionTrigger>
      <AccordionContent className='text-gray-500'>{answer} </AccordionContent>
    </AccordionItem>
  )
}
