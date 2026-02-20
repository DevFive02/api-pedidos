import crypto from "crypto";

export function gerar_secret() {
  return crypto.randomBytes(32).toString("hex");
}
