import { Pool } from "pg";
import { getServerSession } from "next-auth";
import { config } from "../../auth";
import { createDepositAddress } from "../../api";
import { currencies } from "../../const";

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

  let deposit = await pool.query(
    "SELECT * FROM deposit WHERE uid = $1::integer",
    [user.rows[0].id]
  );

  currencies.forEach(async (currency) => {
    let entry = deposit.rows.find(
      (o) => o.currency === currency.title && o.chain === currency.chain
    );

    if (!entry) {
      const { address } = await createDepositAddress({
        subaccountName: user.rows[0].subaccountName,
        currency: currency.title,
        chain: currency.chain,
      });

      if (address) {
        await pool.query(
          `INSERT INTO "deposit" (uid, currency, chain, address) VALUES ($1, $2, $3, $4)`,
          [user.rows[0].id, currency.title, currency.chain, address]
        );
      }
    }
  });

  deposit = await pool.query("SELECT * FROM deposit WHERE uid = $1::integer", [
    user.rows[0].id,
  ]);

  res.status(200).json(deposit.rows);
}
