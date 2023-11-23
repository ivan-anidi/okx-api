import React, { useEffect, useState } from "react";
import {
  createConvert,
  fetchBalance,
  fetchConvertHistory,
  fetchQuote,
} from "../api";
import { auth } from "auth";
import Layout from "../components/layout";
import {
  Input,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import type { GetServerSidePropsContext } from "next";
import { swap } from "const";

export default function ServerSidePage() {
  const [balance, setBalance] = useState([]);
  const [quote, setQuote] = useState([]);
  const [history, setHistory] = useState([]);
  const [baseCcy, setBaseCcy] = useState("");
  const [quoteCcy, setQuoteCcy] = useState("");
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = React.useState("buy");
  const [modalOpen, setModalOpen] = useState(false);

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
    fetchConvertHistory().then((result) => {
      if (!ignore) {
        setHistory(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const getQuote = () => {
    setQuote([]);
    fetchQuote({
      baseCcy,
      quoteCcy,
      amount,
      action: selected,
    }).then((result) => {
      setQuote(result);
      setModalOpen(true);
    });
  };

  const create = () => {
    createConvert({
      quoteId: quote.quoteId,
      baseCcy,
      quoteCcy,
      side: quote.side,
      sz: quote.rfqSz,
      szCcy: quote.rfqSzCcy,
    }).then((result) => {
      console.log(result);
      fetchConvertHistory().then((result) => {
        setHistory(result);
      });
      fetchBalance().then((result) => {
        setBalance(result);
      });
      setQuote([]);
    });
  };

  return (
    <Layout>
      {balance && (
        <>
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
      <br />
      <b>Swap</b>
      <br />

      <div className="flex flex-col w-full">
        <Card className="max-w-full w-[340px] h-[400px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="buy" title="Buy">
                <form className="flex flex-col gap-4">
                  <div>
                    <Select
                      label="Currency from"
                      placeholder="Select currency from"
                      className="max-w-xs"
                      onChange={(e) => {
                        setBaseCcy(e.target.value);
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
                    <Select
                      label="Currency to"
                      placeholder="Select currency to"
                      className="max-w-xs"
                      onChange={(e) => {
                        setQuoteCcy(e.target.value);
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
                    <Input
                      size={"sm"}
                      type="number"
                      label="Amount"
                      placeholder="Enter amount"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" onClick={getQuote}>
                      Buy
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sell" title="Sell">
                <form className="flex flex-col gap-4 h-[300px]">
                  <div>
                    <Select
                      label="Currency from"
                      placeholder="Select currency from"
                      className="max-w-xs"
                      onChange={(e) => {
                        setBaseCcy(e.target.value);
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
                    <Select
                      label="Currency to"
                      placeholder="Select currency to"
                      className="max-w-xs"
                      onChange={(e) => {
                        setQuoteCcy(e.target.value);
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
                    <Input
                      size={"sm"}
                      type="number"
                      label="Amount"
                      placeholder="Enter amount"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" onClick={getQuote}>
                      Sell
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
      <br />
      <br />
      {quote && (
        <Modal isOpen={modalOpen}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  New conversion
                </ModalHeader>
                <ModalBody>
                  <p>
                    You can <b>{quote.side}</b> <b>{quote.rfqSz}</b>{" "}
                    <b>{quote.quoteCcy}</b> for <b>{quote.baseSz}</b>{" "}
                    <b>{quote.baseCcy}</b>
                    <br />
                    <br />
                    Conversion rate is <b>{quote.cnvtPx}</b>{" "}
                    <b>{quote.quoteCcy}</b>
                    {/* clQReqId: <b>{quote.clQReqId}</b> */}
                    {/* <br />
                    origRfqSz: <b>{quote.origRfqSz}</b>
                    <br />
                    quoteSz: <b>{quote.quoteSz}</b>
                    <br />
                    rfqSzCcy: <b>{quote.rfqSzCcy}</b>
                    <br /> */}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      setModalOpen(false);
                      setQuote([]);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="light"
                    onPress={() => {
                      setModalOpen(false);
                      create();
                    }}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {history && (
        <>
          <br />
          <b>History</b>
          {history.map((element) => (
            <p>
              <b>state: {element.state}</b>,<b>instId: {element.instId}</b>,
              <b>baseCcy: {element.baseCcy}</b>,
              <b>quoteCcy: {element.quoteCcy}</b>,<b>side: {element.side}</b>,
              <b>fillPx: {element.fillPx}</b>,
              <b>fillBaseSz: {element.fillBaseSz}</b>,
              <b>fillQuoteSz: {element.fillQuoteSz}</b>,
              <b>timestamp: {element.ts}</b>
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
