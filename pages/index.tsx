import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import Main from "./main";

export default function IndexPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Hello</h1>
        <p>This is an example site.</p>
      </Layout>
    );
  }

  return <Main />;
}
