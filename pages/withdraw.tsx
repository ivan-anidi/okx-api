import React, { useEffect, useState } from "react";
import { fetchBalance, fetchWithdrawalHistory } from "../api";
import { auth } from "auth";
import Layout from "../components/layout";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import type { GetServerSidePropsContext } from "next";

export default function ServerSidePage() {
  const [balance, setBalance] = useState([]);
  const [withdraw, setWithdraw] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let ignore = false;
    setBalance([]);
    fetchBalance().then((result) => {
      if (!ignore) {
        setBalance(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    setHistory([]);
    fetchWithdrawalHistory().then((result) => {
      if (!ignore) {
        setHistory(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout>
      <article className="prose lg:prose-xl">
        {balance && (
          <>
            <b>Balance</b>
            <br />
            {balance.map((element) => (
              <p>
                Balance {element.ccy} is <strong>{element.bal}</strong>.{" "}
                {element.availBal > 0 && (
                  <a href="#" onClick={() => setWithdraw(element.ccy)}>
                    Withdraw
                  </a>
                )}
              </p>
            ))}
          </>
        )}
        {withdraw && (
          <>
            <br />
            <b>Withdraw {withdraw}</b>
            <br />
            <p>
              <Input
                size={"sm"}
                type="number"
                label="Amount"
                placeholder="Enter withdrawal amount"
              />
            </p>
            <br />
            <p>
              <Input
                size={"sm"}
                type="text"
                label="Wallet address"
                placeholder="Enter your wallet"
              />
            </p>
            <br />
            <p>
              <Button color="primary" variant="bordered">
                Withdraw
              </Button>
            </p>
          </>
        )}
        {history && (
          <>
            <br />
            <b>History</b>
            {history.map((element) => (
              <p>
                <b>chain: {element.chain}</b>,<b>fee: {element.fee}</b>,
                <b>ccy: {element.ccy}</b>,<b>clientId: {element.clientId}</b>,
                <b>amt: {element.amt}</b>,<b>txId: {element.txId}</b>,
                <b>to: {element.to}</b>,<b>state: {element.state}</b>,
                <b>timestamp: {element.ts}</b>,
                <b>Withdrawal ID: {element.wdId}</b>.
              </p>
            ))}
          </>
        )}
      </article>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return { props: { session: await auth(context.req, context.res) } };
}
