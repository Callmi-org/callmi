import NavLogo from '@/components/layout/nav-logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Terms() {
  return (
    <main className='bg-stone-100'>
      <div className='mx-auto flex w-full max-w-8xl flex-col gap-4 border-x bg-white px-4 py-8'>
        <NavLogo />
        <h1 className='py-8'>Terms and Conditions</h1>

        <h2 className='text-3xl font-medium'>1. Service Description</h2>
        <p>
          Callmi is a platform that enables professionals to book video calls
          with the MENA region's most in-demand startup and scaleup experts. We
          facilitate these connections by providing a secure and efficient
          system for scheduling, communication, and payment.
        </p>

        <h2 className='text-3xl font-medium'>
          2. User Roles and Responsibilities
        </h2>
        <p>
          Experts: Users who possess valuable knowledge and experience in
          various fields and offer their expertise to clients through the
          platform. As an expert, you are responsible for completing your
          profile, setting your availability, managing your rates, and providing
          valuable and professional advice during scheduled calls.
        </p>
        <p>
          Clients: Users seeking expertise and advice. Clients can browse expert
          profiles, schedule calls, and are responsible for adhering to the
          scheduled times and making payments as agreed.
        </p>

        <h2 className='text-3xl font-medium'>3. Payment Structure</h2>
        <p>
          No Registration Fees: Callmi does not charge any registration fees.
          Experts are free to join and set up their profiles without upfront
          costs.
        </p>
        <p>
          Transaction Fees: We deduct a 5% bank transfer and credit card
          processing fee upon the withdrawal of earnings by the expert.
          Additionally, clients are charged a 20% fee on top of the expert's fee
          for each call. This structure ensures that the platform can continue
          to provide quality services and support.
        </p>
        <p>
          Payment Processing: All payments are processed through Stripe. After a
          call is completed, the payment, minus any applicable fees, becomes
          withdrawable from the expert's Callmi dashboard. Experts can withdraw
          funds once they have accumulated at least $150 USD.
        </p>

        <h2 className='text-3xl font-medium'>4. Intellectual Property</h2>
        <p>
          Ownership and Rights: You acknowledge that any submission made in
          connection with the Session, including any chat, comment, audio,
          image, video, idea, intellectual property, feedback, review, photo,
          text, post, element, or other communication ("Session Content"), will
          be governed by these Terms. Callmi or its licensors own all right,
          title, and interest in and to the Callmi Services, including all
          software, ideas, processes, data, text, media, and other content
          available on the Services ("Callmi Content"); Callmi's trademarks,
          logos, and brand elements ("Marks"); and all other intellectual
          property rights contained in the Services and/or comprising the Callmi
          Content ("Callmi IP"). These are each protected under U.S. and
          international laws. You may not duplicate, copy, or reuse any portion
          of the HTML/CSS, JavaScript, visual design elements, code, or concepts
          without our prior express written consent.
        </p>
        <p>
          Copyright Infringement: If you believe that your copyrights have been
          infringed, please inform us at legal@callmi.co. We respond to notices
          of alleged copyright infringement and terminate access to our Services
          for repeat infringers. The details for filing such a notice should
          follow the requirements outlined under Title 17, United States Code,
          Section 512(c)(2).
        </p>

        <h2 className='text-3xl font-medium'>5. Dispute Resolution</h2>
        <p>
          Governing Law: These Terms will be construed in accordance with and
          governed by the laws of the United States and the State of California,
          without reference to their rules regarding conflicts of law. You
          hereby irrevocably consent to the exclusive jurisdiction of the state
          or federal courts in San Francisco County, California, or the United
          States District Court for the Northern District of California, for any
          actions not subject to arbitration as set forth below.
        </p>
        <p>
          Arbitration: For any dispute you have with Callmi, you agree to first
          contact us at legal@callmi.co and attempt to resolve the dispute with
          us informally. If Callmi has not been able to resolve the dispute with
          you informally, each party agrees to resolve any claim, dispute, or
          controversy through binding arbitration. The specific rules and
          procedures for arbitration will be determined by the American
          Arbitration Association ("JAMS") applicable rules.
        </p>
        <p>
          Class Action Waiver: Both parties agree that any arbitration will be
          conducted only on an individual basis and not in a class or
          representative proceeding. This waiver applies even if the dispute
          resolution process is found unenforceable.
        </p>

        <h2 className='text-3xl font-medium'>6. Privacy and Data Use</h2>
        <p>
          Please refer to our Privacy Policy at{' '}
          <a href='www.callmi.co/privacy'>www.callmi.co/privacy</a> for
          information on how we collect, use, and protect your data.
        </p>

        <h2 className='text-3xl font-medium'>9. Modification of Terms</h2>
        <p>
          Updates and Changes: Callmi may revise these Terms from time to time.
          The most current version will always be posted on our website. If a
          revision, in our sole discretion, is material, we will notify you. By
          continuing to access or use the Services after revisions become
          effective, you agree to be bound by the revised Terms. If you do not
          agree to the new terms, please stop using the Services.
        </p>

        <h2 className='text-3xl font-medium'>10. Termination</h2>
        <p>
          Discontinuation of Use: You may stop using our Services at any time.
          Callmi reserves the right to terminate or suspend your access to any
          Services at any time, for any reason, in our sole discretion,
          including for violation of these Terms or our Privacy Policy.
        </p>
        <p>
          Effect of Termination: Upon termination, your right to use the
          Services will immediately cease. Any provisions of these Terms that by
          their nature should survive termination shall survive termination,
          including, without limitation, ownership provisions, warranty
          disclaimers, indemnity, and limitations of liability.
        </p>
        <Link
          className='flex w-full justify-center'
          href='/'
        >
          <Button
            type='button'
            variant='secondary'
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  )
}
