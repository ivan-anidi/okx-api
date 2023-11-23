import { Pool } from "pg";
import { getServerSession } from "next-auth";
import { config } from "../../auth";
import {
  createSubaccount,
  subaccountList,
  createDepositAddress,
  createAPIKey,
} from "../../api";
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

  if (user.rows[0].subaccountUid === null) {
    const { subaccountUid, subaccountName } = await createSubaccount({
      userId: user.rows[0].id,
    });

    if (subaccountUid) {
      await pool.query(
        `UPDATE "users" SET "subaccountUid" = $1, "subaccountName" = $2 WHERE "id" = $3`,
        [subaccountUid, subaccountName, user.rows[0].id]
      );

      //Create deposit addresses
      currencies.forEach(async (currency) => {
        const { address } = await createDepositAddress({
          subaccountName,
          currency: currency.title,
          chain: currency.chain,
        });

        if (address) {
          await pool.query(
            `INSERT INTO "deposit" (uid, currency, chain, address) VALUES ($1, $2, $3, $4)`,
            [user.rows[0].id, currency.title, currency.chain, address]
          );
        }
      });

      //createAPIKey
      const { apiKey, secretKey } = await createAPIKey({
        subaccountName,
        label: subaccountName,
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
  }

  user = await pool.query("SELECT * FROM users WHERE email = $1::text", [
    session?.user?.email,
  ]);

  res.status(200).json(user.rows[0]);
}
