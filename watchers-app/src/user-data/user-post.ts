import { PrismaClient } from '@prisma/client';
import { tokenAndTime, validateToken } from './user-authenticate';
// import { getUserFromToken } from './user-authenticate'

// get current user from browser auth

export async function userPost(
  user_session_token: tokenAndTime,
  user_id: string,
  post_body: string,
  referenced_movie_id: string
) {
  // TODO: firstly, check validity of user token session cookie
  // fetch the user id from the database on each post rather than
  // if condition==cookie present:
  // const poster_info = getUserInfo(user_session_token);
  if (await validateToken(user_session_token, user_id)) {
    const prisma = new PrismaClient();
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
  }
}
