import React, { useEffect, useState } from "react";
import {
  fetchBalance,
  createWithdrawal,
  fetchWithdrawalHistory,
  fetchCurrencies,
} from "../api";
import { auth } from "auth";
import Layout from "../components/layout";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { swap, usdt_chains } from "const";

import type { GetServerSidePropsContext } from "next";

export default function ServerSidePage() {
  const [balance, setBalance] = useState([]);
  const [withdraw, setWithdraw] = useState("");
  const [history, setHistory] = useState([]);
  const [chain, setChain] = useState("");
  const [ccy, setCcy] = useState("");
  const [amt, setAmt] = useState("");
  const [toAddr, setToAddr] = useState("");
  const [fee, setFee] = useState("0");
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    let ignore = false;
    setCurrencies([]);
    fetchCurrencies().then((result) => {
      if (!ignore) {
        setCurrencies(result);
        console.log(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

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

  const create = () => {
    createWithdrawal({ ccy, amt, toAddr, fee, chain }).then((result) => {
      console.log(result);
    });
  };

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
            <Select
              label="Currency"
              placeholder="Select currency"
              className="max-w-xs"
              value={ccy}
              onChange={(e) => {
                setCcy(e.target.value);
              }}
            >
              {swap.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </Select>
            <br />
            <br />
            {ccy === "USDT" && (
              <>
                <Select
                  label="Chain"
                  placeholder="Select chain"
                  className="max-w-xs"
                  value={chain}
                  onChange={(e) => {
                    setChain(e.target.value);
                  }}
                >
                  {usdt_chains.map((chain) => (
                    <SelectItem key={chain.value} value={chain.value}>
                      {chain.label}
                    </SelectItem>
                  ))}
                </Select>
                <br />
                <br />
              </>
            )}
            <p>
              <Input
                size={"sm"}
                type="number"
                label="Amount"
                placeholder="Enter withdrawal amount"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
              />
            </p>
            <br />
            <p>
              <Input
                size={"sm"}
                type="text"
                label="Wallet address"
                placeholder="Enter your wallet"
                value={toAddr}
                onChange={(e) => setToAddr(e.target.value)}
              />
            </p>
            <br />
            Fee: {fee}{" "}
            https://www.okx.com/docs-v5/en/#funding-account-rest-api-get-currencies
            <p>
              <Button color="primary" variant="bordered" onClick={create}>
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
