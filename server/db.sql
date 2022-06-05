--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-06-05 02:13:10

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
-- TOC entry 3362 (class 0 OID 0)
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
-- TOC entry 3363 (class 0 OID 0)
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
-- TOC entry 3364 (class 0 OID 0)
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
-- TOC entry 3365 (class 0 OID 0)
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
-- TOC entry 3366 (class 0 OID 0)
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
-- TOC entry 3367 (class 0 OID 0)
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


-- Completed on 2022-06-05 02:13:10

--
-- PostgreSQL database dump complete
--

INSERT INTO public."Users" ("email", "username", "password") VALUES ('admin@gmail.com', 'admin', '$2b$10$XwRzGy2OqKo28NbBfb.OveQPIEG.jcP7xZjR2M5EblDcUEhFg47fa');
INSERT INTO public."Users" ("email", "username", "password") VALUES ('johndoe@gmail.com', 'johndoe', '$2b$10$QNjBa/LK97z7qYniSoLGgO7Gp0LRS85vhy47swMhEjS4OmapNv9Zi');
INSERT INTO public."Admin" ("Id") VALUES (1);
INSERT INTO public."Basic" ("Id") VALUES (2);
