import { PrismaClient, User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { generateSecret, jwtVerify, importPKCS8, SignJWT } from 'jose';

// it will be necessary to interface with auth0 here

// const prisma = new PrismaClient();
const saltRounds = 10;

interface user_public_info {
  username: string;
  userId: string;
  displayName?: string;
}

// export interface tokenAndTime {
//   user_token: string;
//   login_time: number;
// }

/**
 * User login function, goal is to return an authtoken here
 * @param userId the user ID of interest
 * @param password the provided user password candidate
 * @returns a JWT
 */
export async function userLogin(
  prisma: PrismaClient,
  userId: string,
  password: string
): Promise<string | null> {
  // check the password hash against the userId in the database
  let testPasswordHash = await createPasswordHash(password).then((value) => {
    return value;
  });
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      passwordHash: true,
      uniqueUserAuthKey: true,
    },
  });
  if (user == null) {
    return null;
  } else {
    if (user['passwordHash'] == testPasswordHash) {
      const user_token: string = await generateUserToken(
        user.uniqueUserAuthKey,
        userId
      );
      return user_token;
    }
  }
  return null;
}

/**
 * generate a JWT secret using the HS256 hash
 * @returns JWT secret
 */
export async function createUserAuthKey(): Promise<string> {
  const secret = await generateSecret('HS256').toString();
  return secret;
}

/**
 * validate the JWT
 * @param user_token
 * @param user_id
 * @returns
 */
export async function validateToken(
  prisma: PrismaClient,
  // timestamp: number,
  // authToken: string,
  user_token: string,
  user_id: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      userId: user_id,
      // authToken:
    },
    select: {
      uniqueUserAuthKey: true,
    },
  });
  if (user == null) {
    return false;
  }
  const secret = await importPKCS8(user.uniqueUserAuthKey, 'HS256');
  try {
    const { payload, protectedHeader } = await jwtVerify(user_token, secret, {
      algorithms: ['HS256'],
    });
    // check that user_id matches in decoded data from private key
    if (user_id == payload['user_id']) {
      return true;
    }
  } catch (err) {
    // invalid token
    return false;
  }
  return false;
}

export async function createPasswordHash(password: string): Promise<string> {
  const salt = await genSalt(saltRounds);
  const hashed = await hash(password, salt);
  return hashed;
}

/**
 * Function to generate user tokens to be stored in browser and used with authentication requests
 * @param unique_user_auth_key the secret key which is fetched from database (NEVER EXPOSE TO USER CLIENT), user client doesn't have access to this, but is only stored in server-side database
 * @param user_id userId to identify user
 * @returns signed authentication JWT, time-sensitive to expire after 6 hours
 */
export async function generateUserToken(
  unique_user_auth_key: string,
  user_id: string
): Promise<string> {
  const secret = await importPKCS8(unique_user_auth_key, 'HS256');
  const token = await new SignJWT({ user_id: user_id })
    .setExpirationTime('6h')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret);
  return token;
}
