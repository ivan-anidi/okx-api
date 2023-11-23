--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: main; Type: DATABASE; Schema: -; Owner: cleopatra
--

CREATE DATABASE main WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE main OWNER TO cleopatra;

\connect main

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: cleopatra
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    type character varying(255) NOT NULL,
    provider character varying(255) NOT NULL,
    "providerAccountId" character varying(255) NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    id_token text,
    scope text,
    session_state text,
    token_type text
);


ALTER TABLE public.accounts OWNER TO cleopatra;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: cleopatra
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO cleopatra;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cleopatra
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: deposit; Type: TABLE; Schema: public; Owner: cleopatra
--

CREATE TABLE public.deposit (
    id integer NOT NULL,
    uid integer,
    currency character varying(255),
    chain character varying(255),
    address character varying(255)
);


ALTER TABLE public.deposit OWNER TO cleopatra;

--
-- Name: deposit_id_seq; Type: SEQUENCE; Schema: public; Owner: cleopatra
--

CREATE SEQUENCE public.deposit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deposit_id_seq OWNER TO cleopatra;

--
-- Name: deposit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cleopatra
--

ALTER SEQUENCE public.deposit_id_seq OWNED BY public.deposit.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: cleopatra
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    expires timestamp with time zone NOT NULL,
    "sessionToken" character varying(255) NOT NULL
);


ALTER TABLE public.sessions OWNER TO cleopatra;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: cleopatra
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO cleopatra;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cleopatra
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: cleopatra
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    "emailVerified" timestamp with time zone,
    image text,
    "subaccountUid" character varying(255),
    "subaccountName" character varying(255),
    "subaccountLevel" character varying(255) DEFAULT 1,
    "apiKey" character varying(255),
    "apiSecretKey" character varying(255)
);


ALTER TABLE public.users OWNER TO cleopatra;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: cleopatra
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO cleopatra;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cleopatra
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: verification_token; Type: TABLE; Schema: public; Owner: cleopatra
--

CREATE TABLE public.verification_token (
    identifier text NOT NULL,
    expires timestamp with time zone NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.verification_token OWNER TO cleopatra;

--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: deposit id; Type: DEFAULT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.deposit ALTER COLUMN id SET DEFAULT nextval('public.deposit_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: cleopatra
--

INSERT INTO public.accounts (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type) VALUES (1, 1, 'oauth', 'google', '116690622404011953793', NULL, 'ya29.a0AfB_byA_rwWw0ATK4tZ2cx2qqheJ9skLOMa2UTFCOK69b7539k4ChYws3gKaaWuk8Nt86W8yr9e0nyScQkKrRYDsNtJ_P2t_D-mI5pGybw7hO_wIEtsEH0D3XjsBuCHeVJEIrEeY7QdeLypvjBGhTc5VyPPeuEPmJwaCgYKAdUSARASFQGOcNnC_9czGofCmctDnPkUpF5I7Q0169', 1696705834, 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI5YWM2MDFkMTMxZmQ0ZmZkNTU2ZmYwMzJhYWIxODg4ODBjZGUzYjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NjM1MTQzODA1ODktMnEyaGxwajc5ZzM4M3M5MjAzdjFtamIxaGQ1cmVzcmQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NjM1MTQzODA1ODktMnEyaGxwajc5ZzM4M3M5MjAzdjFtamIxaGQ1cmVzcmQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY2OTA2MjI0MDQwMTE5NTM3OTMiLCJlbWFpbCI6ImFuaWRpLmhkY3JAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI5RFE5QVNjR2tGa0FaUlR0elU1RG5RIiwibmFtZSI6Ikl2YW4gQW5pZGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSUJfU0MtM2VSNmJfV2lRU0hVTHI5N09YODVnQXk0aFg1MzZ4d21PMHlGPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ikl2YW4iLCJmYW1pbHlfbmFtZSI6IkFuaWRpIiwibG9jYWxlIjoicnUiLCJpYXQiOjE2OTY3MDIyMzUsImV4cCI6MTY5NjcwNTgzNX0.gASMUHQPfjelbWI3usZtJGk5LuY8MP1WM0Iy6J8UealzavVb8xfe4KkYPph_5uEWtG0zby-uh5qNfk0Npht3NHslNdlYSwZ3AuPMjQyLGhXtON1Hj-KK1qgLacSSREnOWH85uCGZRYd0jVJZl63HgkGBkVxODm7TteuSJAlxJnwco5ZObRG3h3y8uZyCg74uI3g83220UeUTatL0q9MM6aigvIFtiP3GGM5hdyHrQBaiWgKUo5Le4PjrSSfaRPU24EtSwbSassH_kKBBLmWh6QnrJHMOZXH-CWg6An3NNF_WdgRpPbsqD9KJO6dtbNCxO8dehNQZq657i44t-8HygQ', 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile', NULL, 'Bearer');
INSERT INTO public.accounts (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type) VALUES (2, 2, 'oauth', 'google', '106006672257763656515', NULL, 'ya29.a0AfB_byBxo8okP1RGS9q3f79WwplKB4jBt5TOVj__khU4pdIq36N4NrAFW-Cr2xAXwb5RJPIbvEPtI_6K2GWpQOSwPLLjLeK0JBjmfFXTrijax8cOBFlEpNhP7uOqcrAjejjCOcBrqhvJseWspzHmRjv3T1TDQ4nqKNfIaCgYKAUkSARASFQHGX2Mi0DrbUsEXss3RMMVz__31dA0171', 1700749187, 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjViMzcwNjk2MGUzZTYwMDI0YTI2NTVlNzhjZmE2M2Y4N2M5N2QzMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NjM1MTQzODA1ODktazVnOWplOGFuaDQydWIxOW9sMDEzMTNmbWdjNGlhaWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NjM1MTQzODA1ODktazVnOWplOGFuaDQydWIxOW9sMDEzMTNmbWdjNGlhaWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDYwMDY2NzIyNTc3NjM2NTY1MTUiLCJlbWFpbCI6Imlnb3IxM3NoZXBlbGV2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNXh1bXhtRVliMllvTlNRMEFjUmVqdyIsIm5hbWUiOiJJZ29yIFNoZXBlbGV2IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xNWDlyUUtpTk45U2ZaeTZ2NTBfSFplZFRGUDVCSzJQVHg5dmpidEJBbVNBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Iklnb3IiLCJmYW1pbHlfbmFtZSI6IlNoZXBlbGV2IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE3MDA3NDU1ODgsImV4cCI6MTcwMDc0OTE4OH0.sxBLtIeUY_rbUMl1-6M0ST_l0fZ0_xmORciUGy1wYOlA3fVfn-HPjgTTA3cmE3IX5xdopR1zNDs4t8BtvHSJyJ-L2Aj4uCybKs7o9z_61oOLjQW7pPNuAUkaecIjMVJ_vfBnYLu74ctNegDKBpeKicdKSfhYbX1_52EhFmpVvD7-1F1JmnybZf68RyN7u-gNJy9SMEnenlWg58JsvX0PRPBN3GGorKEAHxHW2mOXMjgbm3edy-eaWqfx81CwrmUT6cKmbrsSMFJkjggBouJKbEz2KjGItCSeXOhM2i4jV2gxXtkVrKGGibavP3O_Jar51P2YrxohxrbYKFogedRj9g', 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile', NULL, 'Bearer');


--
-- Data for Name: deposit; Type: TABLE DATA; Schema: public; Owner: cleopatra
--

INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (5, 1, 'USDT', 'USDT-TRC20', 'TLTzsBgNqfiNB1BiZamm6QsbAZVJjeS3wm');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (6, 1, 'BTC', NULL, '37RYHbu1W7ibmHM2kXptMvJMNvL6CD1NCC');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (7, 1, 'ETH', NULL, '0xc8be3c4b631a4cdb586f4f41569c96590490a64f');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (8, 1, 'USDT', 'USDT-ERC20', '0xc5297958fc561494de1db5344e710a1c78bbb591');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (9, 2, 'BTC', NULL, '3ASnEKUkiKxhd3WmLTYVaAq77S29mFCBug');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (10, 2, 'USDT', 'USDT-TRC20', 'TXTgJJuEY6cQrCzmbe1kzgZuhY21AB7D8G');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (11, 2, 'USDT', 'USDT-ERC20', '0x55646adce4c5320c993191a31cc64cb871f71dec');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (12, 2, 'ETH', NULL, '0x14c7a8812e3a4140ccfd7afc53704d417640bc49');
INSERT INTO public.deposit (id, uid, currency, chain, address) VALUES (13, 2, 'ETH', NULL, '0x2dfbc663fa085e3694c4aeaa78fa8fce3dfa32a6');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: cleopatra
--

INSERT INTO public.sessions (id, "userId", expires, "sessionToken") VALUES (6, 1, '2023-12-22 23:14:22.325+03', '63276f7f-3c65-4e2b-9900-e3d436f19583');
INSERT INTO public.sessions (id, "userId", expires, "sessionToken") VALUES (11, 1, '2023-12-23 01:22:46.416+03', '5e3d237c-2029-47b1-befd-eec015ec8dd7');
INSERT INTO public.sessions (id, "userId", expires, "sessionToken") VALUES (13, 2, '2023-12-23 16:41:16.453+03', '7ae7b2fb-9494-4c1a-a257-81ab27027b03');
INSERT INTO public.sessions (id, "userId", expires, "sessionToken") VALUES (14, 1, '2023-12-23 18:43:46.745+03', '55d99717-506b-4f8c-8cef-d5a5c8b040ca');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cleopatra
--

INSERT INTO public.users (id, name, email, "emailVerified", image, "subaccountUid", "subaccountName", "subaccountLevel", "apiKey", "apiSecretKey") VALUES (1, 'Ivan Anidi', 'anidi.hdcr@gmail.com', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocIB_SC-3eR6b_WiQSHULr97OX85gAy4hX536xwmO0yF=s96-c', '505131822850651650', 'hifmdlxmsx1', '1', '7850281c-c758-4f87-85e3-2de8ddb9c068', 'E2756857E93E735878773B9555066691');
INSERT INTO public.users (id, name, email, "emailVerified", image, "subaccountUid", "subaccountName", "subaccountLevel", "apiKey", "apiSecretKey") VALUES (2, 'Igor Shepelev', 'igor13shepelev@gmail.com', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLMX9rQKiNN9SfZy6v50_HZedTFP5BK2PTx9vjbtBAmSA=s96-c', '513733580967567504', 'hifmdlxmsx2', '1', '1c20bb68-9380-4c40-ad62-3c915a4f4b30', '51C353DA68FD40C8396BC6820F2443DE');


--
-- Data for Name: verification_token; Type: TABLE DATA; Schema: public; Owner: cleopatra
--

INSERT INTO public.verification_token (identifier, expires, token) VALUES ('anidi.hdcr@gmail.com', '2023-10-08 21:23:30.02+03', 'ddcba3a4f31f35f3e258a37dbac2c6ed2e2cd116da3b71442fe4a83350280370');


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cleopatra
--

SELECT pg_catalog.setval('public.accounts_id_seq', 2, true);


--
-- Name: deposit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cleopatra
--

SELECT pg_catalog.setval('public.deposit_id_seq', 13, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cleopatra
--

SELECT pg_catalog.setval('public.sessions_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cleopatra
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: deposit deposit_pkey; Type: CONSTRAINT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.deposit
    ADD CONSTRAINT deposit_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verification_token verification_token_pkey; Type: CONSTRAINT; Schema: public; Owner: cleopatra
--

ALTER TABLE ONLY public.verification_token
    ADD CONSTRAINT verification_token_pkey PRIMARY KEY (identifier, token);


--
-- PostgreSQL database dump complete
--
