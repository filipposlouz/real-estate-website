
CREATE TABLE "Users" (
	"Id" serial NOT NULL,
	"email" varchar(100) NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" varchar(20) NOT NULL,
	PRIMARY KEY ("Id")
);

CREATE TABLE "Admin" (
	"Id" serial NOT NULL,
	PRIMARY KEY ("Id")
);

CREATE TABLE "Basic" (
	"Id" serial NOT NULL,
	PRIMARY KEY ("Id")
);

CREATE TABLE "Request" (
	"Id" serial NOT NULL,
	"Id_admin" INT NOT NULL,
	"Pending" BOOLEAN NOT NULL,
	"Id_basic" INT NOT NULL,
	PRIMARY KEY ("Id")
);

CREATE TABLE "Property" (
	"Id" serial NOT NULL,
	"nameOfOwner" varchar(50) NOT NULL,
	"phoneOfOwner" varchar(14) NOT NULL,
	"ownershipFile" varchar(100) NOT NULL,
    "province" varchar(50) NOT NULL,
	"placeInTown" varchar(50) NOT NULL,
    "town" varchar(50) NOT NULL,
	"address" varchar(50) NOT NULL,
	"toSell" BOOLEAN NOT NULL,
	"squareMeters" INT NOT NULL,
	"description" varchar(512) NOT NULL,
	"price" INT NOT NULL,
	"typeOfProperty" varchar(50) NOT NULL,
	"numOfRooms" INT NOT NULL,
	"review" varchar(255) NOT NULL,
    "housePictures" varchar(100) NOT NULL,
	"Id_request" INT NOT NULL,
	"id_basic" INT NOT NULL,
	PRIMARY KEY ("Id")
);

CREATE TABLE "Interested" (
	"Id" serial NOT NULL,
	"phone" varchar(14) NOT NULL,
	"email" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	PRIMARY KEY ("Id")
);

CREATE TABLE "isInterested" (
	"Id_ofInterested" INT NOT NULL,
	"Id_property" INT NOT NULL
);

ALTER TABLE "Admin" ADD CONSTRAINT "Admin_fk0" FOREIGN KEY ("Id") REFERENCES "Users"("Id");

ALTER TABLE "Basic" ADD CONSTRAINT "Basic_fk0" FOREIGN KEY ("Id") REFERENCES "Users"("Id");

ALTER TABLE "Request" ADD CONSTRAINT "Request_fk0" FOREIGN KEY ("Id_admin") REFERENCES "Admin"("Id");

ALTER TABLE "Request" ADD CONSTRAINT "Request_fk1" FOREIGN KEY ("Id_basic") REFERENCES "Basic"("Id");

ALTER TABLE "Property" ADD CONSTRAINT "Property_fk0" FOREIGN KEY ("Id_request") REFERENCES "Request"("Id");

ALTER TABLE "Property" ADD CONSTRAINT "Property_fk1" FOREIGN KEY ("id_basic") REFERENCES "Basic"("Id");

ALTER TABLE "isInterested" ADD CONSTRAINT "isInterested_fk0" FOREIGN KEY ("Id_ofInterested") REFERENCES "Interested"("Id");

ALTER TABLE "isInterested" ADD CONSTRAINT "isInterested_fk1" FOREIGN KEY ("Id_property") REFERENCES "Property"("Id");
