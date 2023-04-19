import { PrismaClient } from '@prisma/client';
import { createUserAuthKey, createPasswordHash } from './user-authenticate.js';

// const prisma = new PrismaClient();

export async function createUser(
  prisma: PrismaClient,
  username: string,
  email: string,
  password: string,
  displayName?: string
): Promise<boolean> {
  const userExists = await prisma.user
    .findFirstOrThrow({
      where: {
        username: username,
      },
    })
    .catch(() => {
      return false;
    });
  const emailExists = await prisma.user
    .findFirstOrThrow({
      where: {
        email: email,
      },
    })
    .catch(() => {
      return false;
    });

  let passwordHashResult = await createPasswordHash(password);

  let userAuthKey = await createUserAuthKey();

  const displayNameResult = displayName ?? username;
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      passwordHash: passwordHashResult,
      uniqueUserAuthKey: userAuthKey,
      displayName: displayNameResult,
    },
  });
  // TODO: in the future interface with Auth0 and return session cookie here
  // true indicates successful creation
  // verify user created
  const userExistsNow = await prisma.user
    .findFirstOrThrow({
      where: {
        username: username,
      },
    })
    .catch(() => {
      return false;
    });
  return true;
}
