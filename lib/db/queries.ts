import { and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { domains, users } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = cookies().get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}


// Domain Query


export async function verifyDomainName(domainName: string) {

  const existingDomain = await db.select().from(domains).where(eq(domains.name, domainName)).limit(1);

  if (existingDomain.length === 0) return null

  return existingDomain[0]

}


export async function verifyUserHaveDomain(userId: number) {

  const existingDomain = await db.select().from(domains).where(eq(domains.userId, userId)).limit(1)


  return existingDomain.length > 0 ? existingDomain[0] : null

}

export async function insertDomainIntoDB({ domainName, userId }: { domainName: string, userId: number }) {

  const domain = await db.insert(domains).values({
    name: domainName,
    userId: userId
  }).returning()

  return domain
}



export async function getDomain(userId: number) {

  const domain = await db.select().from(domains).where(eq(domains.userId, userId)).limit(1)
  return domain[0]
}