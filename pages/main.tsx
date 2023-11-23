import React, { useEffect, useState } from "react";
import { fetchUser } from "../api";
import { auth } from "auth";
import Layout from "../components/layout";

import type { GetServerSidePropsContext } from "next";
//import { useSession } from "next-auth/react";

export default function ServerSidePage() {
  //const { data: session } = useSession();
  //<pre>{JSON.stringify(session, null, 2)}</pre>

  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    setUser(null);
    fetchUser().then((result) => {
      if (!ignore) {
        setUser(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout>
      {user && (
        <>
          <p>
            Subaccount UID is <strong>{user.subaccountUid}</strong>.
          </p>
          <p>
            Subaccount level is <strong>{user.subaccountLevel}</strong>.
          </p>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return { props: { session: await auth(context.req, context.res) } };
}
