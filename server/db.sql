--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-06-05 02:06:20

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
-- TOC entry 212 (class 1259 OID 16806)
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    "Id" integer NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16805)
-- Name: Admin_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Admin_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Admin_Id_seq" OWNER TO postgres;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 211
-- Name: Admin_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Admin_Id_seq" OWNED BY public."Admin"."Id";


--
-- TOC entry 214 (class 1259 OID 16813)
-- Name: Basic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Basic" (
    "Id" integer NOT NULL
);


ALTER TABLE public."Basic" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16812)
-- Name: Basic_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Basic_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Basic_Id_seq" OWNER TO postgres;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 213
-- Name: Basic_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Basic_Id_seq" OWNED BY public."Basic"."Id";


--
-- TOC entry 220 (class 1259 OID 16836)
-- Name: Interested; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Interested" (
    "Id" integer NOT NULL,
    phone character varying(14) NOT NULL,
    email character varying(100) NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public."Interested" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16835)
-- Name: Interested_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Interested_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Interested_Id_seq" OWNER TO postgres;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 219
-- Name: Interested_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Interested_Id_seq" OWNED BY public."Interested"."Id";


--
-- TOC entry 218 (class 1259 OID 16827)
-- Name: Property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Property" (
    "Id" integer NOT NULL,
    "nameOfOwner" character varying(50) NOT NULL,
    "phoneOfOwner" character varying(14) NOT NULL,
    "ownershipFile" character varying(100),
    province character varying(50) NOT NULL,
    "placeInTown" character varying(50) NOT NULL,
    town character varying(50) NOT NULL,
    address character varying(50) NOT NULL,
    "toSell" boolean NOT NULL,
    "squareMeters" integer NOT NULL,
    description character varying(1000) NOT NULL,
    price integer NOT NULL,
    "typeOfProperty" character varying(50) NOT NULL,
    "numOfRooms" integer NOT NULL,
    review character varying(255),
    "housePictures" character varying(100),
    "Id_request" integer NOT NULL,
    id_basic integer NOT NULL,
    "numOfFloors" integer,
    id_admin integer
);


ALTER TABLE public."Property" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16826)
-- Name: Property_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Property_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Property_Id_seq" OWNER TO postgres;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 217
-- Name: Property_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Property_Id_seq" OWNED BY public."Property"."Id";


--
-- TOC entry 216 (class 1259 OID 16820)
-- Name: Request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Request" (
    "Id" integer NOT NULL,
    "Pending" boolean NOT NULL,
    "Id_basic" integer NOT NULL
);


ALTER TABLE public."Request" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16819)
-- Name: Request_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Request_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Request_Id_seq" OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 215
-- Name: Request_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Request_Id_seq" OWNED BY public."Request"."Id";


--
-- TOC entry 210 (class 1259 OID 16799)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "Id" integer NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(200) NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16798)
-- Name: Users_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_Id_seq" OWNER TO postgres;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 209
-- Name: Users_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_Id_seq" OWNED BY public."Users"."Id";


--
-- TOC entry 221 (class 1259 OID 16842)
-- Name: isInterested; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."isInterested" (
    "Id_ofInterested" integer NOT NULL,
    "Id_property" integer NOT NULL
);


ALTER TABLE public."isInterested" OWNER TO postgres;

--
-- TOC entry 3194 (class 2604 OID 16809)
-- Name: Admin Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN "Id" SET DEFAULT nextval('public."Admin_Id_seq"'::regclass);


--
-- TOC entry 3195 (class 2604 OID 16816)
-- Name: Basic Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Basic" ALTER COLUMN "Id" SET DEFAULT nextval('public."Basic_Id_seq"'::regclass);


--
-- TOC entry 3198 (class 2604 OID 16839)
-- Name: Interested Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interested" ALTER COLUMN "Id" SET DEFAULT nextval('public."Interested_Id_seq"'::regclass);


--
-- TOC entry 3197 (class 2604 OID 16830)
-- Name: Property Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property" ALTER COLUMN "Id" SET DEFAULT nextval('public."Property_Id_seq"'::regclass);


--
-- TOC entry 3196 (class 2604 OID 16823)
-- Name: Request Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request" ALTER COLUMN "Id" SET DEFAULT nextval('public."Request_Id_seq"'::regclass);


--
-- TOC entry 3193 (class 2604 OID 16802)
-- Name: Users Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "Id" SET DEFAULT nextval('public."Users_Id_seq"'::regclass);


--
-- TOC entry 3360 (class 0 OID 16806)
-- Dependencies: 212
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" ("Id") FROM stdin;
1
\.


--
-- TOC entry 3362 (class 0 OID 16813)
-- Dependencies: 214
-- Data for Name: Basic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Basic" ("Id") FROM stdin;
2
10
11
13
\.


--
-- TOC entry 3368 (class 0 OID 16836)
-- Dependencies: 220
-- Data for Name: Interested; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Interested" ("Id", phone, email, name) FROM stdin;
1	1232113	asdf@aaa	asdf
2	1232113	asdf@aaa	asdf
3	1232113	asdf@aaa	asdf
4	1232113	asdf@aaa	asdf
5	1232113	asdf@aaa	asdf
6	1232113	asdf@aaa	asdf
7	1232113	asdf@aaa	asdf
8	1232113	asdf@aaa	asdf
9	1232113	asdf@aaa	asdf
10	1232113	asdf@aaa	asdf
11	1232113	asdf@aaa	asdf
12	1232113	asdf@aaa	asdf
13	1232113	asdf@aaa	asdf
14	1232113	asdf@aaa	asdf
15	1232113	asdf@aaa	asdf
16	1232113	asdf@aaa	asdf
17	1232113	asdf@aaa	asdf
18	1232113	asdf@aaa	asdf
19	1232113	asdf@aaa	asdf
20	1232113	asdf@aaa	asdf
21	1232113	asdf@aaa	asdf
22	123133	asd@a	asdf
23	123414	asdf@a	asdf
\.


--
-- TOC entry 3366 (class 0 OID 16827)
-- Dependencies: 218
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Property" ("Id", "nameOfOwner", "phoneOfOwner", "ownershipFile", province, "placeInTown", town, address, "toSell", "squareMeters", description, price, "typeOfProperty", "numOfRooms", review, "housePictures", "Id_request", id_basic, "numOfFloors", id_admin) FROM stdin;
77	john doe	6944444444	\N	achaia	krhnh	messatida	Σοφια 6	t	280	Αποτελείται από 6 υπνοδωμάτια, 2 σαλόνια, 2 κουζίνες, 2 μπάνια και WC. Είναι κατασκευασμένη το 2002 και διαθέτει θέρμανση αυτόνομη - πετρελαίου, απεριόριστη θέα, κουφώματα αλουμινίου, πατώματα από πλακάκι, εντοιχιζόμενες ντουλάπες, πρόσβαση ΑΜΕΑ, πάρκινγκ, αποθήκη 5 τ.μ., κήπο, τζάκι, A/C, συναγερμό, τέντες, σίτες, διπλά τζάμια, ηλιακό θερμοσίφωνα, Boiler, σκαλιά εισόδου, νυχτερινό ρεύμα, ανοιχτωσιά, εσωτερική σκάλα, μπαλκόνια 60 τ.μ. απόσταση από θάλασσα 4000 μέτρα.	350000	oneFloor	12	\N	\N	88	2	0	\N
79	john	694444444	\N	aitoliaAkarnania	kentro	amfiloxia	Μαρια 23	f	46	Ανακαινισμένη γκαρσονιέρα/studio συνολικής επιφάνειας 46 τ.μ. 1ος υπερυψωμένος . Αποτελείται από 1 υπνοδωμάτιο, σαλοκουζίνα, μπάνιο . Είναι κατασκευασμένη το 1977 και διαθέτει θέρμανση κεντρική - πετρέλαιο, κουφώματα αλουμινίου, ξύλινα πατώματα, πόρτα ασφαλείας, εντοιχιζόμενες ντουλάπες, ανελκυστήρα, A/C, έπιπλα, ηλεκτρικές συσκευές, διπλά τζάμια, ανοιχτωσιά, μπαλκόνια 10 τ.μ. απόσταση από θάλασσα 400 μέτρα.	650	studio	2	\N	\N	90	2	1	\N
80	john	694444444	\N	fokida	agiosNikolaos	tolofwno	Κωσταντινουπουλοως 23	t	90	Νεόδμητο διαμέρισμα συνολικής επιφάνειας 90 τ.μ. στον 2 ο όροφο . Αποτελείται από 2 υπνοδωμάτια, σαλόνι, κουζίνα, μπάνιο . Είναι κατασκευασμένο το 2010 με ενεργειακή κλάση Α και διαθέτει θέρμανση ατομική - πετρέλαιο, θέα σε πάρκο, κουφώματα αλουμινίου, πατώματα από πλακάκι, πόρτα ασφαλείας, εντοιχιζόμενες ντουλάπες, ανελκυστήρα, πρόσβαση ΑΜΕΑ, 2 κλειστά γκαράζ , τζάκι, A/C, έπιπλα, ηλεκτρικές συσκευές, τέντες, σίτες, διπλά τζάμια, ηλιακό θερμοσίφωνα, νυχτερινό ρεύμα, ανοιχτωσιά, μπαλκόνια 25 τ.μ. απόσταση από θάλασσα 1500 μέτρα.	230000	flat	5	\N	\N	91	2	2	\N
81	γιαννης	69444444	\N	achaia	alsos	aigialia	Σοφία 1	f	120	Διαμέρισμα συνολικής επιφάνειας 120 τ.μ. στον 3 ο όροφο . Αποτελείται από 3 υπνοδωμάτια, σαλόνι, κουζίνα, μπάνιο . Είναι κατασκευασμένο το 1980 και διαθέτει θέρμανση κεντρική - πετρέλαιο, απεριόριστη θέα, κουφώματα ξύλινα, πατώματα από πλακάκι, ντουλάπες, ανελκυστήρα, πρόσβαση ΑΜΕΑ, A/C, σκαλιά εισόδου, ανοιχτωσιά, μπαλκόνια 13 τ.μ. απόσταση από θάλασσα 350 μέτρα.	500	flat	6	\N	\N	92	2	3	\N
\.


--
-- TOC entry 3364 (class 0 OID 16820)
-- Dependencies: 216
-- Data for Name: Request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Request" ("Id", "Pending", "Id_basic") FROM stdin;
59	t	2
60	t	2
61	t	2
62	t	2
63	t	2
64	t	2
65	t	2
66	t	2
67	t	2
68	t	2
71	f	2
70	f	2
69	f	2
73	t	2
74	t	2
76	t	2
77	t	2
78	t	2
79	t	2
80	t	2
81	f	2
75	f	2
82	f	2
83	f	2
84	f	2
85	f	2
86	t	2
87	t	2
88	f	2
89	f	2
90	f	2
91	f	2
92	t	2
54	t	2
55	t	2
56	t	2
57	t	2
58	t	2
\.


--
-- TOC entry 3358 (class 0 OID 16799)
-- Dependencies: 210
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("Id", email, username, password) FROM stdin;
1	admin@gmail.com	admin	$2b$10$XwRzGy2OqKo28NbBfb.OveQPIEG.jcP7xZjR2M5EblDcUEhFg47fa
2	johndoe@gmail.com	johndoe	$2b$10$QNjBa/LK97z7qYniSoLGgO7Gp0LRS85vhy47swMhEjS4OmapNv9Zi
3	test@test.com	test	$2b$10$eoHOm.kPesikCuf3bdeOp.GIBh4PoG8W7t9vtIWJTBXJQmkYT06MO
4	test1@test.com	test1	$2b$10$XWYYA5YNgmjcnA5Ap2Vcd.uXpo55Rgas1nmRKapdg9n81R5siS4hC
5	test2@test.com	test2	$2b$10$gkOG94cZn5xYlEV08CVQ3.ZcFE6uIpuV/guiJVRZ/MjfO/EujgPuK
6	test3@test.com	test3	$2b$10$8Dl8/UuPlxwwqCn712yHoOdrPSy3/RZOXQNP7jmQKXWM/tJZHFsH2
7	test4@test.com	test4	$2b$10$bhfcRhalTZ28036G5fiSDOUtdN0Skw8PPGmzgL1B.5nivMA5mFdSW
9	asdf@asdf	asdf	$2b$10$aQwxAvNWR8DEoyf8mfQdveb/o06AiB4TJrVZJ6E2oPfVIijYme5N2
10	asdf@asdf.com	asdfdf	$2b$10$LOJ7SK8/oyv28J3CSZUvp.7qWXxKkbzk9hBXL6MZrPtXTP9ZB0ynu
11	asdffff@gmail.com	123	$2b$10$fC75aNGYCpop1Kpu9ZrSvetwO2nWJWUJPmELU514NiuJCFR4GKaP6
13	w@w	w	$2b$10$1G3yWpu4Rz4g4o0lEGtGyu7ge8BraIG87iKUdsZK7VjSmvtorituK
\.


--
-- TOC entry 3369 (class 0 OID 16842)
-- Dependencies: 221
-- Data for Name: isInterested; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."isInterested" ("Id_ofInterested", "Id_property") FROM stdin;
\.


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 211
-- Name: Admin_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admin_Id_seq"', 1, false);


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 213
-- Name: Basic_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Basic_Id_seq"', 1, false);


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 219
-- Name: Interested_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Interested_Id_seq"', 23, true);


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 217
-- Name: Property_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Property_Id_seq"', 81, true);


--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 215
-- Name: Request_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Request_Id_seq"', 92, true);


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 209
-- Name: Users_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_Id_seq"', 13, true);


--
-- TOC entry 3202 (class 2606 OID 16811)
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3204 (class 2606 OID 16818)
-- Name: Basic Basic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Basic"
    ADD CONSTRAINT "Basic_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3210 (class 2606 OID 16841)
-- Name: Interested Interested_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Interested"
    ADD CONSTRAINT "Interested_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3208 (class 2606 OID 16834)
-- Name: Property Property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3206 (class 2606 OID 16825)
-- Name: Request Request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3200 (class 2606 OID 16804)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3211 (class 2606 OID 16845)
-- Name: Admin Admin_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_fk0" FOREIGN KEY ("Id") REFERENCES public."Users"("Id");


--
-- TOC entry 3212 (class 2606 OID 16850)
-- Name: Basic Basic_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Basic"
    ADD CONSTRAINT "Basic_fk0" FOREIGN KEY ("Id") REFERENCES public."Users"("Id");


--
-- TOC entry 3214 (class 2606 OID 16865)
-- Name: Property Property_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_fk0" FOREIGN KEY ("Id_request") REFERENCES public."Request"("Id");


--
-- TOC entry 3215 (class 2606 OID 16870)
-- Name: Property Property_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_fk1" FOREIGN KEY (id_basic) REFERENCES public."Basic"("Id");


--
-- TOC entry 3213 (class 2606 OID 16860)
-- Name: Request Request_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_fk1" FOREIGN KEY ("Id_basic") REFERENCES public."Basic"("Id");


--
-- TOC entry 3216 (class 2606 OID 16875)
-- Name: isInterested isInterested_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."isInterested"
    ADD CONSTRAINT "isInterested_fk0" FOREIGN KEY ("Id_ofInterested") REFERENCES public."Interested"("Id");


--
-- TOC entry 3217 (class 2606 OID 16880)
-- Name: isInterested isInterested_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."isInterested"
    ADD CONSTRAINT "isInterested_fk1" FOREIGN KEY ("Id_property") REFERENCES public."Property"("Id");


-- Completed on 2022-06-05 02:06:20

--
-- PostgreSQL database dump complete
--

