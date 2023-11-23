import React, { useEffect, useState } from "react";
import { fetchUser, fetchSumsub } from "../api";
import { auth } from "auth";
import Layout from "../components/layout";

import type { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const SumSubNoSSR = dynamic(() => import("../components/sumsub.tsx"), {
  ssr: false,
});

export default function ServerSidePage() {
  const { data: session } = useSession();

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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

  useEffect(() => {
    let ignore = false;
    setAccessToken(null);
    fetchSumsub().then((result) => {
      if (!ignore) {
        if (result?.token) {
          setAccessToken(result.token);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout>
      <b>KYC</b>
      <br />
      {accessToken && (
        <SumSubNoSSR accessToken={accessToken} children={undefined} />
      )}
    </Layout>
  );
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return { props: { session: await auth(context.req, context.res) } };
}
