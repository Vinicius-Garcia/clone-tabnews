import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });
  await client.connect();
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.log("Database query error:");
    console.error(error);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
