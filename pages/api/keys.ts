import { Pool } from "pg";
import { getServerSession } from "next-auth";
import { config } from "../../auth";
import { subaccountApiKeys } from "../../api";

const pool = new Pool({
  host: "89.19.216.32",
  user: "cleopatra",
  password: "cleopatra",
  database: "main",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default async function handler(req: any, res: any) {
  const session = await getServerSession(req, res, config);

  let user = await pool.query("SELECT * FROM users WHERE email = $1::text", [
    session?.user?.email,
  ]);

  let { keys } = await subaccountApiKeys({
    subaccountName: user.rows[0].subaccountName,
  });

  keys = keys.slice(1);

  res.status(200).json(keys);
}
