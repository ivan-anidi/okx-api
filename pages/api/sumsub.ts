import { Pool } from "pg";
import { getServerSession } from "next-auth";
import { config } from "../../auth";
import { createSumsubApplicant, getSumsubAccessToken } from "../../api";

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

  //   const externalUserId =
  //     "random-JSToken-" + Math.random().toString(36).substr(2, 9);
  //   console.log("External UserID: ", externalUserId);

  //   const applicant = await createSumsubApplicant({ externalUserId: user.rows[0].subaccountName });
  //   console.log(applicant);
  //   console.log("___________");
  const token = await getSumsubAccessToken({
    externalUserId: user.rows[0].subaccountName,
  });

  res.status(200).json(token.token);
}
