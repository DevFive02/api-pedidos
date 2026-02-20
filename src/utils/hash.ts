import bcrypt from "bcryptjs";

export async function hash_secret(secret: string) {
  return bcrypt.hash(secret, 10);
}

export async function comparar_secret(secret: string, hash: string) {
  return bcrypt.compare(secret, hash);
}
