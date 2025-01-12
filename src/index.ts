import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/xata-http';
import { getXataClient } from './xata';
import { usersTable } from './db/schema';

async function main() {
  const xata = getXataClient();
  const db = drizzle(xata);

}

main();
