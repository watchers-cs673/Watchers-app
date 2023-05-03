import { hash } from 'bcrypt';
import {
  generateSecret,
  SignJWT,
  KeyLike,
  exportJWK,
  importJWK,
  // exportPKCS8,
} from 'jose';

// it will be necessary to interface with auth0 here

// const prisma = new PrismaClient();
const saltRounds = 10;


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
