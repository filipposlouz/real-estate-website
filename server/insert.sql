INSERT INTO "Users" ("email", "username", "password") VALUES ('admin@gmail.com', 'admin', '123456789');
INSERT INTO "Users" ("email", "username", "password") VALUES ('johndoe@gmail.com', 'johndoe', '12345');
INSERT INTO "Admin" ("Id") VALUES (1);
INSERT INTO "Basic" ("Id") VALUES (2);
INSERT INTO "Request" ("Id_admin", "Pending", "Id_basic") VALUES (1, FALSE, 2);
INSERT INTO "Property"
("Id", "nameOfOwner" ,
	"phoneOfOwner" ,
	"ownershipFile",
    "town",
	"placeInTown",
    "province",
	"address" ,
	"toSell" ,
	"squareMeters" ,
	"description" ,
	"price" ,
	"typeOfProperty" ,
	"numOfRooms" ,
	"review" ,
	"Id_request" ,
	"id_basic", 
    "housePictures") 
    VALUES 
    (1, 'john doe', 2109999999, 'pdf\\1',
    'Patras', 'Agia Sofia', 'Achaia', 'Ζακύνθου 23',
    TRUE,
    '50',
    'Κωδικός ακινήτου: 2421 - Πάτρα Αγία Σοφία ΠΩΛΕΙΤΑΙ διαμέρισμα συνολικής επιφάνειας 50 τ.μ. στον 3 ο όροφο .',
    60000,
    'διαμέρισμα',
    2,
    'good',
    1,
    2,
    'images\\1'
    );


    SELECT * FROM "Property", "Request" WHERE "Request"."Pending" = FALSE and "Property"."Id_request" = "Request"."Id";