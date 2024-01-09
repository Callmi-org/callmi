import prisma, { convertEnumToText } from '@/utils/prisma'
export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params
  if (!username) {
    return Response.json({ message: 'no username' }, { status: 400 })
  }

  const result = await prisma.user.findUnique({
    where: { username },
    include: {
      availability: true,
      meetings: true,
    },
  })

  if (!result) {
    return Response.json({ message: 'no user found' }, { status: 404 })
  }

  // @ts-ignore
  result.expertise = result.expertise.map(el => convertEnumToText(el))
  // @ts-ignore
  result.industry = result.industry.map(el => convertEnumToText(el))

  // res.json(result)
  return Response.json(result, { status: 200 })
}
