import { PrismaClient, User } from '@prisma/client';
import { resolve } from 'path';
import { hash } from 'bcrypt';
import { createHmac } from 'crypto';
const { createHash, generateKey } = await import('crypto');
var jwt = require('jsonwebtoken');

// it will be necessary to interface with auth0 here

const prisma = new PrismaClient();
const saltRounds = 10;

interface user_public_info {
  username: string;
  userId: string;
  displayName?: string;
}

export interface tokenAndTime {
  user_token: string;
  login_time: number;
}

// Goal is to return an authtoken here
export async function userLogin(
  userId: string,
  password: string
): Promise<tokenAndTime | null> {
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
      const current_login_time = Date.now();

      // create the token
      const token_data: tokenAndTime = {
        user_token: await generateUserToken(
          user.uniqueUserAuthKey,
          current_login_time
        ),
        login_time: current_login_time,
      };

      // upload the token to database

      // flush old tokens for time greater than 30 days
      const expire_token_after = 2592000000;

      return token_data;
    }
  }
  return null;
}

// export function getUserFromToken(token_data: tokenAndTime): User {
//   // TODO: return a dictionary of the objects
//   // Use authentication function
//   // a dummy return for now:
//   const user = await prisma.user.findUnique({
//     where: {
//       userId: userId,
//     },
//     select: {
//       passwordHash: true,
//       uniqueUserAuthKey: true,
//     },
//   });
//   return dummy_user;
// }

export async function createUserAuthKey(): Promise<string> {
  // var userAuthKey: string;
  return new Promise((resolve, reject) => {
    generateKey('hmac', { length: 512 }, (err, key) => {
      if (err) throw err;
      console.log(key.export().toString('base64'));
    });
  });
}

export async function validateToken(
  // timestamp: number,
  // authToken: string,
  token_data: tokenAndTime,
  userId: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
      // authToken:
    },
    select: {
      uniqueUserAuthKey: true,
    },
  });
  if (user == null) {
    return false;
  }
  const test_token = await generateUserToken(
    user.uniqueUserAuthKey,
    token_data.login_time
  );
  if (token_data.user_token == test_token) {
    return true;
  }
  return false;
}

// export async function createSessionToken() {}

export async function createPasswordHash(password: string): Promise<string> {
  return hash(password, saltRounds);
}

// export async function flushOldTokens() {}

// we want to do this deterministically to allow verification,
// use the private unique_user_auth_key which user client doesn't
// have access to, use a hash function which is deterministic alongside the login time
export async function generateUserToken(
  unique_user_auth_key: string,
  login_time: number
): Promise<string> {
  // return randomUUID();
  // const user_token = createHash('sha512')
  //   .update(unique_user_auth_key)
  //   .update(login_time.toString())
  //   .digest('base64');
  const user_token = createHmac('sha512', unique_user_auth_key)
    .update(login_time.toString())
    .digest('base64');
  return user_token;
}
