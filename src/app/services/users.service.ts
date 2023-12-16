import prisma from "../../utils/prisma";
export const generateUserUrlKey = async (username: string, id: string) => {
  let updatedUser = null
  let processedString = username!.replace(/\s/g, '').toLowerCase()
  try {
    const userCount = await prisma.user.count({
      where: {
        username:  username,
        NOT: {
          id: id,
        },
      },
    })
    if (userCount === 0) {
      updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: { username: processedString },
      })
    } else {
      updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: { username: `${processedString}${userCount + 1}` },
      })
    }
    return updatedUser
  } catch (error) {
    return null
  }
}