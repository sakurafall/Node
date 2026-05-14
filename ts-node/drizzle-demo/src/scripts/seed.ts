import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { faker } from '@faker-js/faker';
import { todoTable } from '../db/schema.ts';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

const { stdout } = await execPromise('pnpm drizzle-kit push');
console.log(stdout);

const db = drizzle(process.env.DATABASE_URL!);

async function insertTodos(rowNumber: number = 10) {
  const todos = Array.from({ length: rowNumber }, (_, index) => ({
    id: Date.now() + index,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  await db.insert(todoTable).values(todos);
}

await insertTodos()


const todos = await db.select().from(todoTable);
console.log(todos);

// async function main() {
//   const user: typeof todoTable.$inferInsert = {
//     id: 1,
//     name: 'John',
//     email: 'john@example.com',
//   };

//   await db.insert(todoTable).values(user);
//   console.log('New user created!')

//   const users = await db.select().from(todoTable);
//   console.log('Getting all users from the database: ', users)
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */

//   await db
//     .update(todoTable)
//     .set({
//       id: 31,
//     })
//     .where(eq(todoTable.email, user.email));
//   console.log('User info updated!')

//   await db.delete(todoTable).where(eq(todoTable.email, user.email));
//   console.log('User deleted!')
// }

// main();
