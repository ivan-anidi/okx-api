import { Pool } from "pg";
import { getServerSession } from "next-auth";
import { config } from "../../auth";
import { convertTrade } from "../../api";

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
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const { quoteId, baseCcy, quoteCcy, side, sz, szCcy } = req.body;

  const session = await getServerSession(req, res, config);

  let user = await pool.query("SELECT * FROM users WHERE email = $1::text", [
    session?.user?.email,
  ]);

  const response = await convertTrade({
    apiKey: user.rows[0].apiKey,
    apiSecretKey: user.rows[0].apiSecretKey,
    quoteId,
    baseCcy,
    quoteCcy,
    side,
    sz,
    szCcy,
  });

  res.status(200).json(response);
}
