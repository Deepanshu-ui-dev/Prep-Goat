import { Pool, type PoolConfig } from "pg";

/** Enable SSL for Neon/cloud DBs; local docker Postgres has no SSL. */
export function createPgPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  const useSsl =
    process.env.DATABASE_SSL === "true" ||
    /sslmode=require|neon\.tech/i.test(connectionString || "");

  const config: PoolConfig = { connectionString };
  if (useSsl) {
    config.ssl = { rejectUnauthorized: false };
  }
  return new Pool(config);
}
