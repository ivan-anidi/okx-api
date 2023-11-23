import ky from "ky";
import axios from "axios";
import CryptoJS from "crypto-js";

export async function fetchUser() {
  const res = await ky.get("/api/user").json();
  return res;
}

export async function fetchBalance() {
  const res = await ky.get("/api/balance").json();
  return res;
}

export async function fetchHistory() {
  const res = await ky.get("/api/history").json();
  return res;
}

export async function fetchDeposit() {
  const res = await ky.get("/api/deposit").json();
  return res;
}

export async function fetchCurrencies() {
  const res = await ky.get("/api/currencies").json();
  return res;
}

export async function fetchSumsub() {
  const res = await ky.get("/api/sumsub").json();
  return res;
}

export async function fetchApiKeys() {
  const res = await ky.get("/api/keys").json();
  return res;
}

export async function fetchWithdrawalHistory() {
  const res = await ky.get("/api/withdrawal_history").json();
  return res;
}

export async function fetchConvertHistory() {
  const res = await ky.get("/api/convert_history").json();
  return res;
}

export async function fetchQuote({ baseCcy, quoteCcy, amount, action }) {
  const res = await ky
    .post("/api/quote", {
      json: {
        baseCcy,
        quoteCcy,
        amount,
        action,
      },
    })
    .json();
  return res;
}

export async function createWithdrawal({ ccy, amt, toAddr, fee, chain }) {
  const res = await ky
    .post("/api/withdraw", {
      json: { ccy, amt, toAddr, fee, chain },
    })
    .json();
  return res;
}

export async function createConvert({
  quoteId,
  baseCcy,
  quoteCcy,
  side,
  sz,
  szCcy,
}) {
  const res = await ky
    .post("/api/convert", {
      json: { quoteId, baseCcy, quoteCcy, side, sz, szCcy },
    })
    .json();
  return res;
}

export async function createApiKey({ label, passphrase, ip, perm }) {
  const res = await ky
    .post("/api/api_keys", {
      json: { label, passphrase, ip, perm },
    })
    .json();
  return res;
}

export async function createSubaccount({ userId }) {
  let url = "/api/v5/broker/nd/create-subaccount";
  let timestamp = new Date().toISOString();

  const subaccountName = `${process.env.OK_SUBACCOUNT_PREFIX}${userId}`;

  let query = {
    subAcct: subaccountName,
    label: "",
  };

  const { data: json } = await axios.post("https://www.okx.com" + url, query, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": process.env.OK_ACCESS_KEY,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(
          timestamp + "POST" + url + JSON.stringify(query),
          process.env.OK_SECRET_KEY
        )
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return {
    subaccountUid: json?.data[0]?.uid,
    subaccountName,
  };
}

export async function createDepositAddress({
  subaccountName,
  currency,
  chain = null,
}) {
  let url = "/api/v5/asset/broker/nd/subaccount-deposit-address";
  let timestamp = new Date().toISOString();

  let query = {
    subAcct: subaccountName,
    ccy: currency,
    chain: chain ? chain : undefined,
  };

  const { data: json } = await axios.post("https://www.okx.com" + url, query, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": process.env.OK_ACCESS_KEY,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(
          timestamp + "POST" + url + JSON.stringify(query),
          process.env.OK_SECRET_KEY
        )
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { address: json?.data[0]?.addr };
}

export async function createAPIKey({
  subaccountName,
  label,
  passphrase,
  ip,
  perm,
}) {
  let url = "/api/v5/broker/nd/subaccount/apikey";
  let timestamp = new Date().toISOString();

  let query = {
    subAcct: subaccountName,
    label,
    passphrase,
    ip,
    perm,
  };

  const { data: json } = await axios.post("https://www.okx.com" + url, query, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": process.env.OK_ACCESS_KEY,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(
          timestamp + "POST" + url + JSON.stringify(query),
          process.env.OK_SECRET_KEY
        )
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return json?.data[0];
}

export async function subaccountDepositHistory({ subaccountName }) {
  let url =
    "/api/v5/asset/broker/nd/subaccount-deposit-history" +
    "?subAcct=" +
    subaccountName;
  let timestamp = new Date().toISOString();

  const { data: json } = await axios.get("https://www.okx.com" + url, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": process.env.OK_ACCESS_KEY,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(timestamp + "GET" + url, process.env.OK_SECRET_KEY)
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { history: json?.data };
}

export async function subaccountApiKeys({ subaccountName }) {
  let url =
    "/api/v5/broker/nd/subaccount/apikey" + "?subAcct=" + subaccountName;
  let timestamp = new Date().toISOString();

  const { data: json } = await axios.get("https://www.okx.com" + url, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": process.env.OK_ACCESS_KEY,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(timestamp + "GET" + url, process.env.OK_SECRET_KEY)
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { keys: json?.data };
}

export async function subaccountList() {
  let url = "/api/v5/broker/nd/subaccount-info";
  let timestamp = new Date().toISOString();

  const { data: json } = await axios.get("https://www.okx.com" + url, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": process.env.OK_ACCESS_KEY,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(timestamp + "GET" + url, process.env.OK_SECRET_KEY)
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return;
}

export async function getBalance({ apiKey, apiSecretKey }) {
  let url = "/api/v5/asset/balances?ccy=BTC,USDT,ETH";
  let timestamp = new Date().toISOString();

  const { data: json } = await axios.get("https://www.okx.com" + url, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(timestamp + "GET" + url, apiSecretKey)
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { balance: json?.data };
}

export async function estimateQuote({
  apiKey,
  apiSecretKey,
  baseCcy,
  quoteCcy,
  amount,
  action,
}) {
  let url = "/api/v5/asset/convert/estimate-quote";
  let timestamp = new Date().toISOString();

  let query = {
    baseCcy: baseCcy,
    quoteCcy: quoteCcy,
    side: action,
    rfqSz: amount,
    rfqSzCcy: quoteCcy,
  };

  const { data: json } = await axios.post("https://www.okx.com" + url, query, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(
          timestamp + "POST" + url + JSON.stringify(query),
          apiSecretKey
        )
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { quote: json?.data[0] };
}

export async function withdraw({
  apiKey,
  apiSecretKey,
  ccy,
  amt,
  dest,
  toAddr,
  fee,
  chain,
}) {
  let url = "/api/v5/asset/withdrawal";
  let timestamp = new Date().toISOString();

  let query = {
    ccy,
    amt,
    dest,
    toAddr,
    fee,
    chain,
  };

  const { data: json } = await axios.post("https://www.okx.com" + url, query, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(
          timestamp + "POST" + url + JSON.stringify(query),
          apiSecretKey
        )
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { withdrawal: json?.data };
}

export async function convertTrade({
  apiKey,
  apiSecretKey,
  quoteId,
  baseCcy,
  quoteCcy,
  side,
  sz,
  szCcy,
}) {
  let url = "/api/v5/asset/convert/trade";
  let timestamp = new Date().toISOString();

  let query = {
    quoteId,
    baseCcy,
    quoteCcy,
    side,
    sz,
    szCcy,
  };

  const { data: json } = await axios.post("https://www.okx.com" + url, query, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(
          timestamp + "POST" + url + JSON.stringify(query),
          apiSecretKey
        )
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { convert: json?.data[0] };
}

export async function getWithdrawalHistory({ apiKey, apiSecretKey }) {
  let url = "/api/v5/asset/withdrawal-history";
  let timestamp = new Date().toISOString();

  const { data: json } = await axios.get("https://www.okx.com" + url, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(timestamp + "GET" + url, apiSecretKey)
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { history: json?.data };
}

export async function getConvertHistory({ apiKey, apiSecretKey }) {
  let url = "/api/v5/asset/convert/history";
  let timestamp = new Date().toISOString();

  const { data: json } = await axios.get("https://www.okx.com" + url, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(timestamp + "GET" + url, apiSecretKey)
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { history: json?.data };
}

export async function getCurrencies({ ccy, apiKey, apiSecretKey }) {
  let url = "/api/v5/asset/currencies?ccy=" + ccy;
  let timestamp = new Date().toISOString();

  const { data: json } = await axios.get("https://www.okx.com" + url, {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": apiKey,
      "OK-ACCESS-SIGN": CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(timestamp + "GET" + url, apiSecretKey)
      ),
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": process.env.OK_ACCESS_PASSPHRASE,
    },
  });

  return { currencies: json?.data };
}

export async function createSumsubApplicant({ externalUserId }) {
  const url =
    "/resources/applicants?levelName=" + encodeURIComponent("basic-kyc-level");

  const timestamp = Math.floor(Date.now() / 1000).toString(); //Math.floor(new Date().getTime() / 1000);

  const query = {
    externalUserId: externalUserId,
  };

  let valueToSign = timestamp + "POST" + url + JSON.stringify(query);

  const signature = CryptoJS.HmacSHA256(
    valueToSign,
    process.env.SUMSUB_SECRET_KEY
  );

  const { data: json } = await axios.post(
    "https://api.sumsub.com" + url,
    query,
    {
      headers: {
        "X-App-Access-Ts": timestamp,
        "X-App-Access-Sig": CryptoJS.enc.Hex.stringify(signature),
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-App-Token": process.env.SUMSUB_APP_TOKEN,
      },
    }
  );
  return { applicant: json };
}

export async function getSumsubAccessToken({ externalUserId }) {
  const url =
    "/resources/accessTokens?userId=" +
    encodeURIComponent(externalUserId) +
    // "&externalActionId=" +
    // encodeURIComponent(externalUserId + "Action1") +
    "&levelName=" +
    encodeURIComponent("basic-kyc-level") +
    "&ttlInSecs=3600";

  const timestamp = Math.floor(Date.now() / 1000).toString();

  const query = {};

  let valueToSign = timestamp + "POST" + url + JSON.stringify(query);

  const signature = CryptoJS.HmacSHA256(
    valueToSign,
    process.env.SUMSUB_SECRET_KEY
  );

  const { data: json } = await axios.post(
    "https://api.sumsub.com" + url,
    query,
    {
      headers: {
        "X-App-Access-Ts": timestamp,
        "X-App-Access-Sig": CryptoJS.enc.Hex.stringify(signature),
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-App-Token": process.env.SUMSUB_APP_TOKEN,
      },
    }
  );
  return { token: json };
}
// withdrawal
