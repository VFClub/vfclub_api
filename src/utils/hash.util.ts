import { randomBytes } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';

export async function passwordHash(password: string) {
  const saltOrRounds = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, saltOrRounds);

  return passwordHash;
}

export function passwordResetCode() {
  return randomBytes(3).toString('hex').toUpperCase();
}

export function activateAccountCode() {
  return randomBytes(3).toString('hex').toUpperCase();
}

export function fileNameHash(fileName: string) {
  const hash = createHash('SHA-1').update(fileName).digest('hex');

  return `vfclub/${hash.slice(0, 12)}-${fileName}`;
}
