import { createSession } from './lib/auth';
import { prisma } from './lib/db';
import { cookies } from 'next/headers';

// Wait, cookies() only works in Next.js context.
// Let's just generate the JWT token!
import { SignJWT } from "jose";

async function main() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("no secret");
  
  const token = await new SignJWT({ sub: "user-123" }) // fake user ID
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`3600s`)
    .sign(new TextEncoder().encode(secret));
    
  console.log("TOKEN=", token);
}
main();
