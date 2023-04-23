import { PrismaClient, User } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import {
  generateSecret,
  jwtVerify,
  importPKCS8,
  SignJWT,
  KeyLike,
  exportJWK,
  importJWK,
  // exportPKCS8,
} from 'jose';

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
  // user_id: string,
  email: string,
  password: string
): Promise<string | null> {
  // reject empty email
  if (email == null) {
    return null;
  }

  // check the password hash against the userId in the database
  // let testPasswordHash: string = await createPasswordHash(password);
  const user = await prisma.user.findUnique({
    where: {
      // userId: user_id,
      email: email,
    },
    select: {
      passwordHash: true,
      uniqueUserAuthKey: true,
      userId: true,
    },
  });
  if (user != null) {
    const passwordValidated = await compare(password, user.passwordHash);
    if (passwordValidated) {
      // const userAuthKeyObject = JSON.parse(user.uniqueUserAuthKey);
      const user_token: string = await generateUserToken(
        // userAuthKeyObject['k'],
        user.uniqueUserAuthKey,
        user.userId
      );
      return user_token;
    }
  }
  return null;
}

// export async function getUserID(
//   prisma: PrismaClient,
//   // usernameOrEmail: string
//   email: string
// ): Promise<string|undefined> {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       userId: true
//     },
//   });
//   return user?.userId;
// }

/**
 * generate a JWT secret using the HS256 hash
 * @returns JWT secret
 */
export async function createUserAuthKey(): Promise<string> {
  const secret = (await generateSecret('HS256')) as KeyLike;
  // const exportablesecret = await exportPKCS8(secret);
  // return exportablesecret;
  const exportablesecret = await exportJWK(secret);
  return JSON.stringify(exportablesecret);
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
  const hashed = await hash(password, saltRounds);
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
  // const secret = await importPKCS8(unique_user_auth_key, 'HS256');
  const secret = await importJWK(JSON.parse(unique_user_auth_key));
  const token = await new SignJWT({ user_id: user_id })
    .setExpirationTime('6h')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret);
  return token;
}
