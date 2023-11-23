import React, { useEffect, useState } from "react";
import { createApiKey, fetchApiKeys } from "../api";
import { auth } from "auth";
import Layout from "../components/layout";
import {
  RadioGroup,
  Radio,
  Input,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";

import type { GetServerSidePropsContext } from "next";

export default function ServerSidePage() {
  const [type, setType] = React.useState("trade");
  const [label, setLabel] = React.useState("");
  const [passphrase, setPassphrase] = React.useState("");
  const [ip, setIp] = React.useState("");
  const [perm, setPerm] = React.useState(["read_only", "trade"]);
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const create = () => {
    setNewKey(null);
    setModalOpen(false);
    createApiKey({ label, passphrase, ip, perm: perm.toString() }).then(
      (result) => {
        setNewKey(result);
        if (result?.apiKey) {
          setModalOpen(true);
        }
      }
    );
  };

  useEffect(() => {
    let ignore = false;
    setKeys([]);
    fetchApiKeys().then((result) => {
      if (!ignore) {
        setKeys(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout>
      <b>Создание API ключа</b>
      <br />
      <RadioGroup
        label="Цель"
        orientation="horizontal"
        value={type}
        onValueChange={setType}
      >
        <Radio value="trade">Торговля API</Radio>
        {/* <Radio value="app">Привязка сторонних приложений</Radio> */}
      </RadioGroup>
      <br />
      <Input
        type="text"
        label="Название"
        placeholder="Введите название"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <br />
      <Input
        label="Пасс-фраза"
        variant="bordered"
        placeholder="Пасс-фраза"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />
      <p>
        API Key password, supports 8 to 32 alphanumeric characters containing at
        least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special
        character. <b>Example: Passphrase1@</b>
      </p>
      <br />
      <Textarea
        variant="flat"
        label="IP-адрес (необязательно)"
        labelPlacement="outside"
        placeholder="Добавьте до 20 IP-адресов, разделяя их запятыми. Поддерживает IPv4 и IPv6"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <br />
      <CheckboxGroup
        label="Доступы"
        orientation="horizontal"
        defaultValue={["read_only", "trade"]}
        value={perm}
        onValueChange={setPerm}
      >
        <Checkbox value="read_only">Чтение</Checkbox>
        <Checkbox value="withdraw">Вывод</Checkbox>
        <Checkbox value="trade">Торговля</Checkbox>
      </CheckboxGroup>
      <br />
      <Button color="primary" onClick={create}>
        Create key
      </Button>
      <br />
      {keys && (
        <>
          <br />
          <b>Keys</b>
          {keys.map((element) => (
            <p>
              <b>label: {element.label}</b>, apiKey: {element.apiKey}, perm:{" "}
              {element.perm}, ip: {element.ip}, timestamp: {element.ts}.
            </p>
          ))}
        </>
      )}

      <Modal isOpen={modalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New API key created
              </ModalHeader>
              <ModalBody>
                <p>
                  apiKey: <b>{newKey.apiKey}</b>
                  <br />
                  ip: <b>{newKey.ip}</b>
                  <br />
                  label: <b>{newKey.label}</b>
                  <br />
                  passphrase: <b>{newKey.passphrase}</b>
                  <br />
                  perm: <b>{newKey.perm}</b>
                  <br />
                  secretKey: <b>{newKey.secretKey}</b>
                  <br />
                  subAcct: <b>{newKey.subAcct}</b>
                  <br />
                  ts: <b>{newKey.ts}</b>
                  <br />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setModalOpen(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return { props: { session: await auth(context.req, context.res) } };
}
