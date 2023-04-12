import { Follows, PrismaClient, Post, Like, UserComment } from '@prisma/client';

// const prisma = new PrismaClient();

// enum publicDataType {
// };

/**
 * READ-ONLY function to view posts by a certain user from database
 * @param user_id user of interest
 * @returns array of Post values
 */
export async function viewPostsFromUser(
  prisma: PrismaClient,
  user_id: string
): Promise<Post[] | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: user_id,
      },
      select: {
        posts: true,
      },
    });
    return user?.posts;
  } catch (e: any) {
    return;
  }

  // const posts_array = user?.posts;
  // return JSON.stringify(posts_array);
}

/**
 * return list of user following
 * @param user_id user of interest
 * @return list of users following
 */
export async function getUserFollowing(
  prisma: PrismaClient,
  user_id: string
): Promise<Follows[] | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: user_id,
      },
      select: {
        following: true,
      },
    });
    return user?.following;
  } catch (e: any) {
    return;
  }
}

/**
 * return list of user followers
 * @param user_id user of interest
 * @returns list of users followed by
 */
export async function getUserFollowers(
  prisma: PrismaClient,
  user_id: string
): Promise<Follows[] | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: user_id,
      },
      select: {
        follower: true,
      },
    });
    return user?.follower;
  } catch (e: any) {
    return;
  }
}

/**
 * return display name or username
 * @param user_id user of interest
 * @returns user display name
 */
export async function getUserDisplayName(
  prisma: PrismaClient,
  user_id: string
): Promise<string | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: user_id,
      },
      select: {
        displayName: true,
        username: true,
      },
    });
    if (user?.displayName == null) {
      return user?.username;
    }
    return user?.displayName;
  } catch (e: any) {
    return;
  }
}

/**
 * return user likes
 * @param user_id user of interest
 * @returns user likes
 */
export async function getUserLikes(
  prisma: PrismaClient,
  user_id: string
): Promise<Like[] | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: user_id,
      },
      select: {
        likes: true,
      },
    });
    return user?.likes;
  } catch (e: any) {
    return;
  }
}

/**
 * return user comments
 * @param user_id user of interest
 * @returns user comments
 */
export async function getUserComments(
  prisma: PrismaClient,
  user_id: string
): Promise<UserComment[] | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: user_id,
      },
      select: {
        comments: true,
      },
    });
    return user?.comments;
  } catch (e: any) {
    return;
  }
}
