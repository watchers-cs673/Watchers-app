import { PrismaClient, User } from "@prisma/client";

export async function userSearchDatabase(prisma: PrismaClient, userquerystring: string): Promise<{ username: string; userId: string; }[] | null> {
  try {
    const userresults = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: userquerystring
            }
          }
        ]
      },
      select: {
        username: true,
        userId: true
      }
    });
    return userresults;
  } catch (e:any) {
    return null;
  }
}
