import React, { useEffect, useState } from "react";
import { fetchBalance, fetchDeposit, fetchHistory } from "../api";
import { auth } from "auth";
import Layout from "../components/layout";

import type { GetServerSidePropsContext } from "next";

export default function ServerSidePage() {
  const [balance, setBalance] = useState([]);
  const [deposit, setDeposit] = useState([]);
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
    setDeposit([]);
    fetchDeposit().then((result) => {
      if (!ignore) {
        setDeposit(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    setHistory([]);
    fetchHistory().then((result) => {
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
      {balance && (
        <>
          <br />
          <b>Balance</b>
          <br />
          {balance.map((element) => (
            <p>
              Balance {element.ccy} is <strong>{element.bal}</strong>. (
              {element.frozenBal} frozen, {element.availBal} available).
            </p>
          ))}
        </>
      )}
      {deposit && (
        <>
          <br />
          <b>Deposit</b>
          {deposit.map((element) => (
            <p>
              Deposit {element.currency} {element.chain ? element.chain : ""}{" "}
              address is <strong>{element.address}</strong>.
            </p>
          ))}
        </>
      )}
      {history && (
        <>
          <br />
          <b>History</b>
          {history.map((element) => (
            <p>
              <b>
                {element.amt}
                {element.ccy}
              </b>
              , {element.chain} chain, deposit ID: {element.depId}, deposit
              address: {element.to}, TX: {element.txId}, timestamp: {element.ts}
              .
            </p>
          ))}
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return { props: { session: await auth(context.req, context.res) } };
}
