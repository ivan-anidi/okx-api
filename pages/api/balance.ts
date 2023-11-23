import { Pool } from "pg";
import { getServerSession } from "next-auth";
import { config } from "../../auth";
import { getBalance, createAPIKey } from "../../api";

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

  if (user.rows[0].apiKey === null) {
    //createAPIKey
    const { apiKey, secretKey } = await createAPIKey({
      subaccountName: user.rows[0].subaccountName,
      label: user.rows[0].subaccountName,
      passphrase: process.env.OK_ACCESS_PASSPHRASE,
      ip: process.env.OK_ACCESS_IP_ADDRESS,
      perm: "read_only,trade,withdraw",
    });

    if (apiKey) {
      await pool.query(
        `UPDATE "users" SET "apiKey" = $1, "apiSecretKey" = $2 WHERE "id" = $3`,
        [apiKey, secretKey, user.rows[0].id]
      );
    }
  }

  const { balance } = await getBalance({
    apiKey: user.rows[0].apiKey,
    apiSecretKey: user.rows[0].apiSecretKey,
  });

  res.status(200).json(balance);
}
