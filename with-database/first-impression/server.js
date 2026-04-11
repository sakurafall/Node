import { Client } from 'pg'
const client = await new Client({
  host: 'aws-1-ap-southeast-2.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.jfcygsvrsmrmuwfrpoth',
  password: 'sakura.666.66',

}).connect()
 
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()
