import { PrismaClient } from '@prisma/client';
import { validateToken } from './user-authenticate.js';

/**
 * post to database after verification of user identity
 * @param user_session_token the user token from HTTP authentication header
 * @param user_id identifies user
 * @param post_body content to include in post
 * @param referenced_movie_id identifies the movie of interest
 */
export async function userPost(
  prisma: PrismaClient,
  user_session_token: string,
  user_id: string,
  post_body: string,
  referenced_movie_id: string
): Promise<boolean> {
  if (await validateToken(prisma, user_session_token, user_id)) {
    // const prisma = new PrismaClient();
    const post = await prisma.post.updateMany({
      where: {
        // author: posting_User,
        authorId: user_id
      },
      data: {
        postBody: post_body,
        referencedMovieId: referenced_movie_id,
      },
    });
    if (!post) {
      return false;
    }
    // post.count
  }
  return true;
}
