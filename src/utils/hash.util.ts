import { genSalt, hash } from 'bcrypt';
import { randomBytes } from 'crypto';

export async function generatePasswordHash(password: string) {
  const saltOrRounds = await genSalt();
  const passwordHash = await hash(password, saltOrRounds);

  return passwordHash;
}

export function generateConfirmationCode() {
  return randomBytes(3).toString('hex').toUpperCase();
}
