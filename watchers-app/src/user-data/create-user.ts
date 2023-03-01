import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function createUser(username: string, email: string, password: string, displayName?: string): Promise<boolean> {
  const userExists = await prisma.user.findFirstOrThrow({
    where: {
      username: username
    }
  }).catch(() => { return false });
  const emailExists = await prisma.user.findFirstOrThrow({
    where: {
      email: email
    }
  }).catch(() => { return false });

  let passwordHashResult = await hash(password, saltRounds).then((value) => {
    return value
  });
  const displayNameResult = displayName ?? username;
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      passwordHash: passwordHashResult,
      displayName: displayNameResult
    },
  })
  // TODO: in the future interface with Auth0 and return session cookie here
  // true indicates successful creation
  // verify user created
  const userExistsNow = await prisma.user.findFirstOrThrow({
    where: {
      username: username
    }
  }).catch(() => { return false });
  return true;
}
