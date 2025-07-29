PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('a979cd9a-aad1-44c1-9e00-5ccc51e2b420','9d835918312227be017775fe09e16940dfacd5d61c37dc2e0522e71c4476dd35',1753481670891,'20250724193458_init',NULL,NULL,1753481670880,1);
INSERT INTO _prisma_migrations VALUES('f6200a89-1f36-4dd6-8a42-6fb6a9ab050f','898cf7e2d9ec65e043df152ed7825f33a71b7dbc68a739b45ad5258462841c5e',1753481670902,'20250724201012_add_sessions',NULL,NULL,1753481670894,1);
INSERT INTO _prisma_migrations VALUES('82798f98-d84c-40df-ad12-5d1caa88eedc','5a3ae14bd29d9ab90a99e23f72093cf067571869eba3332a295e257477a59401',1753481670911,'20250724201629_remove_sessions',NULL,NULL,1753481670904,1);
INSERT INTO _prisma_migrations VALUES('c3c64974-cc51-4536-af78-1397bfe3dfe0','ab8703ce4f5268a17f384acebe1f7ce7ddf133aefbe5a807f408a58b6c88d1c7',1753481670928,'20250725071723_add_pseudo_to_user',NULL,NULL,1753481670912,1);
INSERT INTO _prisma_migrations VALUES('9eb39fa9-d8b4-4450-aded-ec38464fc91d','3a631ad014addcdc0debcafa5c2dd3ffc9a5b3d11a1f540efdea3f8d2770b54d',1753481670944,'20250725190432_add_games_questions_scores',NULL,NULL,1753481670930,1);
INSERT INTO _prisma_migrations VALUES('04e3a8e6-29b0-4990-951a-bb29a0d4f153','ac9b4f7d5610733dab92437ba5dfcca1b0a808ab431e4cda27b03fc7e0fe3802',1753523739372,'20250726095300_rename_pseudo_to_username',NULL,NULL,1753523739345,1);
INSERT INTO _prisma_migrations VALUES('fb9110b2-67fa-4175-b7ae-1169d26e7893','c28d173526641d33d3c2852b1a123669293b4ee15be0cdfc2cef5a8e69462d32',1753540938971,'20250726144218_add_multilingual_support',NULL,NULL,1753540938960,1);
INSERT INTO _prisma_migrations VALUES('7465d76e-a5d5-4579-9fef-728b6e7d20ed','52095b06f7b818a70f71398bae33e50c320c76d8fe5a63a48b24951a6cb8fdb7',1753684855779,'20250728064055_remove_multilingual_support',NULL,NULL,1753684855759,1);
INSERT INTO _prisma_migrations VALUES('5fca8462-593f-4a87-82d4-77efaabca137','f10ff30b803d574514a27aab80ce392592dd6449b68d87f73ca0f31357a4cd81',1753687669627,'20250728072749_add_game_mode',NULL,NULL,1753687669610,1);
CREATE TABLE IF NOT EXISTS "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Game VALUES(1,'departements','Quiz des Départements','Testez vos connaissances des départements français ! Pouvez-vous identifier le nom de chaque département ?',1,1753481711129);
INSERT INTO Game VALUES(2,'capitales','Quiz des Capitales','Testez vos connaissances des capitales du monde ! Pouvez-vous identifier la capitale de chaque pays ?',1,1753540624639);
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO User VALUES(1,'t.heyrendt@gmail.com','T2an','$2b$12$W1IhAZCi43FJaMxBMu7Vp.ft/LwXzvPmEFUMpcbg6wMOScbCvPcce',1753481711926);
INSERT INTO User VALUES(2,'admin@example.com','T3an','$2b$12$S.I/sKVBpdsMYKe.6w8k2OHYbr9cAr1otODZ7z562R/BVeTMsELji',1753524595575);
CREATE TABLE IF NOT EXISTS "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "metadata" JSONB,
    "gameId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Question_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Question VALUES(1,'Quel est le numéro du département Ain ?','01','text','1',NULL,1,1753481711137);
INSERT INTO Question VALUES(2,'Quel est le numéro du département Aisne ?','02','text','1',NULL,1,1753481711141);
INSERT INTO Question VALUES(3,'Quel est le numéro du département Allier ?','03','text','1',NULL,1,1753481711145);
INSERT INTO Question VALUES(4,'Quel est le numéro du département Alpes-de-Haute-Provence ?','04','text','1',NULL,1,1753481711148);
INSERT INTO Question VALUES(5,'Quel est le numéro du département Hautes-Alpes ?','05','text','1',NULL,1,1753481711153);
INSERT INTO Question VALUES(6,'Quel est le numéro du département Alpes-Maritimes ?','06','text','1',NULL,1,1753481711157);
INSERT INTO Question VALUES(7,'Quel est le numéro du département Ardèche ?','07','text','1',NULL,1,1753481711161);
INSERT INTO Question VALUES(8,'Quel est le numéro du département Ardennes ?','08','text','1',NULL,1,1753481711166);
INSERT INTO Question VALUES(9,'Quel est le numéro du département Ariège ?','09','text','1',NULL,1,1753481711170);
INSERT INTO Question VALUES(10,'Quel est le numéro du département Aube ?','10','text','1',NULL,1,1753481711174);
INSERT INTO Question VALUES(11,'Quel est le numéro du département Aude ?','11','text','1',NULL,1,1753481711178);
INSERT INTO Question VALUES(12,'Quel est le numéro du département Aveyron ?','12','text','1',NULL,1,1753481711181);
INSERT INTO Question VALUES(13,'Quel est le numéro du département Bouches-du-Rhône ?','13','text','1',NULL,1,1753481711185);
INSERT INTO Question VALUES(14,'Quel est le numéro du département Calvados ?','14','text','1',NULL,1,1753481711188);
INSERT INTO Question VALUES(15,'Quel est le numéro du département Cantal ?','15','text','1',NULL,1,1753481711192);
INSERT INTO Question VALUES(16,'Quel est le numéro du département Charente ?','16','text','1',NULL,1,1753481711196);
INSERT INTO Question VALUES(17,'Quel est le numéro du département Charente-Maritime ?','17','text','1',NULL,1,1753481711201);
INSERT INTO Question VALUES(18,'Quel est le numéro du département Cher ?','18','text','1',NULL,1,1753481711206);
INSERT INTO Question VALUES(19,'Quel est le numéro du département Corrèze ?','19','text','1',NULL,1,1753481711210);
INSERT INTO Question VALUES(20,'Quel est le numéro du département Corse-du-Sud ?','2A','text','1',NULL,1,1753481711216);
INSERT INTO Question VALUES(21,'Quel est le numéro du département Haute-Corse ?','2B','text','1',NULL,1,1753481711222);
INSERT INTO Question VALUES(22,'Quel est le numéro du département Côte-d''Or ?','21','text','1',NULL,1,1753481711227);
INSERT INTO Question VALUES(23,'Quel est le numéro du département Côtes-d''Armor ?','22','text','1',NULL,1,1753481711233);
INSERT INTO Question VALUES(24,'Quel est le numéro du département Creuse ?','23','text','1',NULL,1,1753481711236);
INSERT INTO Question VALUES(25,'Quel est le numéro du département Dordogne ?','24','text','1',NULL,1,1753481711240);
INSERT INTO Question VALUES(26,'Quel est le numéro du département Doubs ?','25','text','1',NULL,1,1753481711243);
INSERT INTO Question VALUES(27,'Quel est le numéro du département Drôme ?','26','text','1',NULL,1,1753481711247);
INSERT INTO Question VALUES(28,'Quel est le numéro du département Eure ?','27','text','1',NULL,1,1753481711251);
INSERT INTO Question VALUES(29,'Quel est le numéro du département Eure-et-Loir ?','28','text','1',NULL,1,1753481711255);
INSERT INTO Question VALUES(30,'Quel est le numéro du département Finistère ?','29','text','1',NULL,1,1753481711258);
INSERT INTO Question VALUES(31,'Quel est le numéro du département Gard ?','30','text','1',NULL,1,1753481711262);
INSERT INTO Question VALUES(32,'Quel est le numéro du département Haute-Garonne ?','31','text','1',NULL,1,1753481711266);
INSERT INTO Question VALUES(33,'Quel est le numéro du département Gers ?','32','text','1',NULL,1,1753481711270);
INSERT INTO Question VALUES(34,'Quel est le numéro du département Gironde ?','33','text','1',NULL,1,1753481711274);
INSERT INTO Question VALUES(35,'Quel est le numéro du département Hérault ?','34','text','1',NULL,1,1753481711278);
INSERT INTO Question VALUES(36,'Quel est le numéro du département Ille-et-Vilaine ?','35','text','1',NULL,1,1753481711281);
INSERT INTO Question VALUES(37,'Quel est le numéro du département Indre ?','36','text','1',NULL,1,1753481711286);
INSERT INTO Question VALUES(38,'Quel est le numéro du département Indre-et-Loire ?','37','text','1',NULL,1,1753481711289);
INSERT INTO Question VALUES(39,'Quel est le numéro du département Isère ?','38','text','1',NULL,1,1753481711293);
INSERT INTO Question VALUES(40,'Quel est le numéro du département Jura ?','39','text','1',NULL,1,1753481711297);
INSERT INTO Question VALUES(41,'Quel est le numéro du département Landes ?','40','text','1',NULL,1,1753481711300);
INSERT INTO Question VALUES(42,'Quel est le numéro du département Loir-et-Cher ?','41','text','1',NULL,1,1753481711305);
INSERT INTO Question VALUES(43,'Quel est le numéro du département Loire ?','42','text','1',NULL,1,1753481711308);
INSERT INTO Question VALUES(44,'Quel est le numéro du département Haute-Loire ?','43','text','1',NULL,1,1753481711312);
INSERT INTO Question VALUES(45,'Quel est le numéro du département Loire-Atlantique ?','44','text','1',NULL,1,1753481711316);
INSERT INTO Question VALUES(46,'Quel est le numéro du département Loiret ?','45','text','1',NULL,1,1753481711319);
INSERT INTO Question VALUES(47,'Quel est le numéro du département Lot ?','46','text','1',NULL,1,1753481711323);
INSERT INTO Question VALUES(48,'Quel est le numéro du département Lot-et-Garonne ?','47','text','1',NULL,1,1753481711327);
INSERT INTO Question VALUES(49,'Quel est le numéro du département Lozère ?','48','text','1',NULL,1,1753481711332);
INSERT INTO Question VALUES(50,'Quel est le numéro du département Maine-et-Loire ?','49','text','1',NULL,1,1753481711336);
INSERT INTO Question VALUES(51,'Quel est le numéro du département Manche ?','50','text','1',NULL,1,1753481711340);
INSERT INTO Question VALUES(52,'Quel est le numéro du département Marne ?','51','text','1',NULL,1,1753481711344);
INSERT INTO Question VALUES(53,'Quel est le numéro du département Haute-Marne ?','52','text','1',NULL,1,1753481711347);
INSERT INTO Question VALUES(54,'Quel est le numéro du département Mayenne ?','53','text','1',NULL,1,1753481711352);
INSERT INTO Question VALUES(55,'Quel est le numéro du département Meurthe-et-Moselle ?','54','text','1',NULL,1,1753481711355);
INSERT INTO Question VALUES(56,'Quel est le numéro du département Meuse ?','55','text','1',NULL,1,1753481711360);
INSERT INTO Question VALUES(57,'Quel est le numéro du département Morbihan ?','56','text','1',NULL,1,1753481711364);
INSERT INTO Question VALUES(58,'Quel est le numéro du département Moselle ?','57','text','1',NULL,1,1753481711368);
INSERT INTO Question VALUES(59,'Quel est le numéro du département Nièvre ?','58','text','1',NULL,1,1753481711371);
INSERT INTO Question VALUES(60,'Quel est le numéro du département Nord ?','59','text','1',NULL,1,1753481711375);
INSERT INTO Question VALUES(61,'Quel est le numéro du département Oise ?','60','text','1',NULL,1,1753481711379);
INSERT INTO Question VALUES(62,'Quel est le numéro du département Orne ?','61','text','1',NULL,1,1753481711382);
INSERT INTO Question VALUES(63,'Quel est le numéro du département Pas-de-Calais ?','62','text','1',NULL,1,1753481711385);
INSERT INTO Question VALUES(64,'Quel est le numéro du département Puy-de-Dôme ?','63','text','1',NULL,1,1753481711390);
INSERT INTO Question VALUES(65,'Quel est le numéro du département Pyrénées-Atlantiques ?','64','text','1',NULL,1,1753481711394);
INSERT INTO Question VALUES(66,'Quel est le numéro du département Hautes-Pyrénées ?','65','text','1',NULL,1,1753481711397);
INSERT INTO Question VALUES(67,'Quel est le numéro du département Pyrénées-Orientales ?','66','text','1',NULL,1,1753481711401);
INSERT INTO Question VALUES(68,'Quel est le numéro du département Bas-Rhin ?','67','text','1',NULL,1,1753481711405);
INSERT INTO Question VALUES(69,'Quel est le numéro du département Haut-Rhin ?','68','text','1',NULL,1,1753481711408);
INSERT INTO Question VALUES(70,'Quel est le numéro du département Rhône ?','69','text','1',NULL,1,1753481711412);
INSERT INTO Question VALUES(71,'Quel est le numéro du département Haute-Saône ?','70','text','1',NULL,1,1753481711416);
INSERT INTO Question VALUES(72,'Quel est le numéro du département Saône-et-Loire ?','71','text','1',NULL,1,1753481711420);
INSERT INTO Question VALUES(73,'Quel est le numéro du département Sarthe ?','72','text','1',NULL,1,1753481711424);
INSERT INTO Question VALUES(74,'Quel est le numéro du département Savoie ?','73','text','1',NULL,1,1753481711428);
INSERT INTO Question VALUES(75,'Quel est le numéro du département Haute-Savoie ?','74','text','1',NULL,1,1753481711432);
INSERT INTO Question VALUES(76,'Quel est le numéro du département Paris ?','75','text','1',NULL,1,1753481711436);
INSERT INTO Question VALUES(77,'Quel est le numéro du département Seine-Maritime ?','76','text','1',NULL,1,1753481711439);
INSERT INTO Question VALUES(78,'Quel est le numéro du département Seine-et-Marne ?','77','text','1',NULL,1,1753481711442);
INSERT INTO Question VALUES(79,'Quel est le numéro du département Yvelines ?','78','text','1',NULL,1,1753481711446);
INSERT INTO Question VALUES(80,'Quel est le numéro du département Deux-Sèvres ?','79','text','1',NULL,1,1753481711451);
INSERT INTO Question VALUES(81,'Quel est le numéro du département Somme ?','80','text','1',NULL,1,1753481711455);
INSERT INTO Question VALUES(82,'Quel est le numéro du département Tarn ?','81','text','1',NULL,1,1753481711459);
INSERT INTO Question VALUES(83,'Quel est le numéro du département Tarn-et-Garonne ?','82','text','1',NULL,1,1753481711464);
INSERT INTO Question VALUES(84,'Quel est le numéro du département Var ?','83','text','1',NULL,1,1753481711469);
INSERT INTO Question VALUES(85,'Quel est le numéro du département Vaucluse ?','84','text','1',NULL,1,1753481711474);
INSERT INTO Question VALUES(86,'Quel est le numéro du département Vendée ?','85','text','1',NULL,1,1753481711479);
INSERT INTO Question VALUES(87,'Quel est le numéro du département Vienne ?','86','text','1',NULL,1,1753481711484);
INSERT INTO Question VALUES(88,'Quel est le numéro du département Haute-Vienne ?','87','text','1',NULL,1,1753481711490);
INSERT INTO Question VALUES(89,'Quel est le numéro du département Vosges ?','88','text','1',NULL,1,1753481711494);
INSERT INTO Question VALUES(90,'Quel est le numéro du département Yonne ?','89','text','1',NULL,1,1753481711499);
INSERT INTO Question VALUES(91,'Quel est le numéro du département Territoire de Belfort ?','90','text','1',NULL,1,1753481711504);
INSERT INTO Question VALUES(92,'Quel est le numéro du département Essonne ?','91','text','1',NULL,1,1753481711507);
INSERT INTO Question VALUES(93,'Quel est le numéro du département Hauts-de-Seine ?','92','text','1',NULL,1,1753481711511);
INSERT INTO Question VALUES(94,'Quel est le numéro du département Seine-Saint-Denis ?','93','text','1',NULL,1,1753481711514);
INSERT INTO Question VALUES(95,'Quel est le numéro du département Val-de-Marne ?','94','text','1',NULL,1,1753481711518);
INSERT INTO Question VALUES(96,'Quel est le numéro du département Val-d''Oise ?','95','text','1',NULL,1,1753481711528);
INSERT INTO Question VALUES(97,'Quel est le numéro du département Guadeloupe ?','971','text','1',NULL,1,1753481711538);
INSERT INTO Question VALUES(98,'Quel est le numéro du département Martinique ?','972','text','1',NULL,1,1753481711545);
INSERT INTO Question VALUES(99,'Quel est le numéro du département Guyane ?','973','text','1',NULL,1,1753481711588);
INSERT INTO Question VALUES(100,'Quel est le numéro du département La Réunion ?','974','text','1',NULL,1,1753481711597);
INSERT INTO Question VALUES(101,'Quel est le numéro du département Mayotte ?','976','text','1',NULL,1,1753481711601);
INSERT INTO Question VALUES(346,'Quelle est la capitale de France ?','Paris','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(347,'Quelle est la capitale de Allemagne ?','Berlin','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(348,'Quelle est la capitale de Espagne ?','Madrid','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(349,'Quelle est la capitale de Italie ?','Rome','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(350,'Quelle est la capitale de Royaume-Uni ?','Londres','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(351,'Quelle est la capitale de Pays-Bas ?','Amsterdam','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(352,'Quelle est la capitale de Belgique ?','Bruxelles','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(353,'Quelle est la capitale de Suisse ?','Berne','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(354,'Quelle est la capitale de Autriche ?','Vienne','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(355,'Quelle est la capitale de Portugal ?','Lisbonne','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(356,'Quelle est la capitale de Grèce ?','Athènes','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(357,'Quelle est la capitale de Pologne ?','Varsovie','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(358,'Quelle est la capitale de République tchèque ?','Prague','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(359,'Quelle est la capitale de Hongrie ?','Budapest','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(360,'Quelle est la capitale de Roumanie ?','Bucarest','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(361,'Quelle est la capitale de Bulgarie ?','Sofia','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(362,'Quelle est la capitale de Croatie ?','Zagreb','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(363,'Quelle est la capitale de Slovénie ?','Ljubljana','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(364,'Quelle est la capitale de Slovaquie ?','Bratislava','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(365,'Quelle est la capitale de Lituanie ?','Vilnius','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(366,'Quelle est la capitale de Lettonie ?','Riga','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(367,'Quelle est la capitale de Estonie ?','Tallinn','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(368,'Quelle est la capitale de Finlande ?','Helsinki','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(369,'Quelle est la capitale de Suède ?','Stockholm','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(370,'Quelle est la capitale de Norvège ?','Oslo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(371,'Quelle est la capitale de Danemark ?','Copenhague','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(372,'Quelle est la capitale de Islande ?','Reykjavik','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(373,'Quelle est la capitale de Irlande ?','Dublin','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(374,'Quelle est la capitale de Luxembourg ?','Luxembourg','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(375,'Quelle est la capitale de Malte ?','La Valette','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(376,'Quelle est la capitale de Chypre ?','Nicosie','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(377,'Quelle est la capitale de États-Unis ?','Washington','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(378,'Quelle est la capitale de Canada ?','Ottawa','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(379,'Quelle est la capitale de Mexique ?','Mexico','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(380,'Quelle est la capitale de Brésil ?','Brasilia','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(381,'Quelle est la capitale de Argentine ?','Buenos Aires','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(382,'Quelle est la capitale de Chili ?','Santiago','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(383,'Quelle est la capitale de Pérou ?','Lima','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(384,'Quelle est la capitale de Colombie ?','Bogota','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(385,'Quelle est la capitale de Venezuela ?','Caracas','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(386,'Quelle est la capitale de Équateur ?','Quito','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(387,'Quelle est la capitale de Bolivie ?','La Paz','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(388,'Quelle est la capitale de Paraguay ?','Asuncion','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(389,'Quelle est la capitale de Uruguay ?','Montevideo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(390,'Quelle est la capitale de Guyana ?','Georgetown','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(391,'Quelle est la capitale de Suriname ?','Paramaribo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(392,'Quelle est la capitale de Japon ?','Tokyo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(393,'Quelle est la capitale de Chine ?','Pékin','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(394,'Quelle est la capitale de Corée du Sud ?','Séoul','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(395,'Quelle est la capitale de Inde ?','New Delhi','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(396,'Quelle est la capitale de Australie ?','Canberra','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(397,'Quelle est la capitale de Nouvelle-Zélande ?','Wellington','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(398,'Quelle est la capitale de Thaïlande ?','Bangkok','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(399,'Quelle est la capitale de Vietnam ?','Hanoï','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(400,'Quelle est la capitale de Malaisie ?','Kuala Lumpur','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(401,'Quelle est la capitale de Singapour ?','Singapour','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(402,'Quelle est la capitale de Indonésie ?','Jakarta','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(403,'Quelle est la capitale de Philippines ?','Manille','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(404,'Quelle est la capitale de Pakistan ?','Islamabad','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(405,'Quelle est la capitale de Bangladesh ?','Dacca','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(406,'Quelle est la capitale de Sri Lanka ?','Colombo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(407,'Quelle est la capitale de Népal ?','Katmandou','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(408,'Quelle est la capitale de Bhoutan ?','Thimphu','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(409,'Quelle est la capitale de Maldives ?','Male','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(410,'Quelle est la capitale de Birmanie ?','Naypyidaw','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(411,'Quelle est la capitale de Laos ?','Vientiane','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(412,'Quelle est la capitale de Cambodge ?','Phnom Penh','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(413,'Quelle est la capitale de Mongolie ?','Oulan-Bator','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(414,'Quelle est la capitale de Kazakhstan ?','Nour-Soultan','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(415,'Quelle est la capitale de Ouzbékistan ?','Tachkent','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(416,'Quelle est la capitale de Kirghizistan ?','Bichkek','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(417,'Quelle est la capitale de Tadjikistan ?','Douchanbé','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(418,'Quelle est la capitale de Turkménistan ?','Achgabat','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(419,'Quelle est la capitale de Azerbaïdjan ?','Bakou','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(420,'Quelle est la capitale de Géorgie ?','Tbilissi','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(421,'Quelle est la capitale de Arménie ?','Erevan','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(422,'Quelle est la capitale de Russie ?','Moscou','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(423,'Quelle est la capitale de Ukraine ?','Kiev','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(424,'Quelle est la capitale de Biélorussie ?','Minsk','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(425,'Quelle est la capitale de Moldavie ?','Chișinău','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(426,'Quelle est la capitale de Albanie ?','Tirana','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(427,'Quelle est la capitale de Macédoine du Nord ?','Skopje','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(428,'Quelle est la capitale de Kosovo ?','Pristina','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(429,'Quelle est la capitale de Monténégro ?','Podgorica','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(430,'Quelle est la capitale de Bosnie-Herzégovine ?','Sarajevo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(431,'Quelle est la capitale de Serbie ?','Belgrade','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(432,'Quelle est la capitale de Turquie ?','Ankara','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(433,'Quelle est la capitale de Israël ?','Jérusalem','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(434,'Quelle est la capitale de Liban ?','Beyrouth','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(435,'Quelle est la capitale de Syrie ?','Damas','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(436,'Quelle est la capitale de Jordanie ?','Amman','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(437,'Quelle est la capitale de Irak ?','Bagdad','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(438,'Quelle est la capitale de Iran ?','Téhéran','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(439,'Quelle est la capitale de Afghanistan ?','Kaboul','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(440,'Quelle est la capitale de Arabie saoudite ?','Riyad','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(441,'Quelle est la capitale de Yémen ?','Sanaa','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(442,'Quelle est la capitale de Oman ?','Mascate','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(443,'Quelle est la capitale de Émirats arabes unis ?','Abou Dabi','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(444,'Quelle est la capitale de Qatar ?','Doha','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(445,'Quelle est la capitale de Bahreïn ?','Manama','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(446,'Quelle est la capitale de Koweït ?','Koweït','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(447,'Quelle est la capitale de Égypte ?','Le Caire','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(448,'Quelle est la capitale de Libye ?','Tripoli','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(449,'Quelle est la capitale de Tunisie ?','Tunis','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(450,'Quelle est la capitale de Algérie ?','Alger','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(451,'Quelle est la capitale de Maroc ?','Rabat','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(452,'Quelle est la capitale de Mauritanie ?','Nouakchott','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(453,'Quelle est la capitale de Mali ?','Bamako','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(454,'Quelle est la capitale de Niger ?','Niamey','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(455,'Quelle est la capitale de Tchad ?','N''Djamena','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(456,'Quelle est la capitale de Soudan ?','Khartoum','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(457,'Quelle est la capitale de Soudan du Sud ?','Juba','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(458,'Quelle est la capitale de Éthiopie ?','Addis-Abeba','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(459,'Quelle est la capitale de Érythrée ?','Asmara','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(460,'Quelle est la capitale de Djibouti ?','Djibouti','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(461,'Quelle est la capitale de Somalie ?','Mogadiscio','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(462,'Quelle est la capitale de Kenya ?','Nairobi','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(463,'Quelle est la capitale de Ouganda ?','Kampala','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(464,'Quelle est la capitale de Tanzanie ?','Dodoma','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(465,'Quelle est la capitale de Rwanda ?','Kigali','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(466,'Quelle est la capitale de Burundi ?','Gitega','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(467,'Quelle est la capitale de République démocratique du Congo ?','Kinshasa','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(468,'Quelle est la capitale de République du Congo ?','Brazzaville','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(469,'Quelle est la capitale de République centrafricaine ?','Bangui','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(470,'Quelle est la capitale de Cameroun ?','Yaoundé','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(471,'Quelle est la capitale de Gabon ?','Libreville','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(472,'Quelle est la capitale de Guinée équatoriale ?','Malabo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(473,'Quelle est la capitale de Sao Tomé-et-Principe ?','São Tomé','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(474,'Quelle est la capitale de Angola ?','Luanda','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(475,'Quelle est la capitale de Zambie ?','Lusaka','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(476,'Quelle est la capitale de Zimbabwe ?','Harare','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(477,'Quelle est la capitale de Botswana ?','Gaborone','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(478,'Quelle est la capitale de Namibie ?','Windhoek','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(479,'Quelle est la capitale de Afrique du Sud ?','Pretoria','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(480,'Quelle est la capitale de Lesotho ?','Maseru','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(481,'Quelle est la capitale de Eswatini ?','Mbabane','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(482,'Quelle est la capitale de Mozambique ?','Maputo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(483,'Quelle est la capitale de Madagascar ?','Antananarivo','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(484,'Quelle est la capitale de Comores ?','Moroni','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(485,'Quelle est la capitale de Seychelles ?','Victoria','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(486,'Quelle est la capitale de Maurice ?','Port-Louis','text','medium',NULL,2,1753686109858);
INSERT INTO Question VALUES(487,'Quelle est la capitale de Andorre ?','Andorre-la-Vieille','text','medium',NULL,2,1753686647144);
INSERT INTO Question VALUES(488,'Quelle est la capitale de Monaco ?','Monaco','text','medium',NULL,2,1753686647151);
INSERT INTO Question VALUES(489,'Quelle est la capitale de Saint-Marin ?','Saint-Marin','text','medium',NULL,2,1753686647157);
INSERT INTO Question VALUES(490,'Quelle est la capitale de Vatican ?','Cité du Vatican','text','medium',NULL,2,1753686647163);
INSERT INTO Question VALUES(491,'Quelle est la capitale de Liechtenstein ?','Vaduz','text','medium',NULL,2,1753686647169);
INSERT INTO Question VALUES(492,'Quelle est la capitale de Cuba ?','La Havane','text','medium',NULL,2,1753686647183);
INSERT INTO Question VALUES(493,'Quelle est la capitale de Jamaïque ?','Kingston','text','medium',NULL,2,1753686647188);
INSERT INTO Question VALUES(494,'Quelle est la capitale de Haïti ?','Port-au-Prince','text','medium',NULL,2,1753686647193);
INSERT INTO Question VALUES(495,'Quelle est la capitale de République dominicaine ?','Saint-Domingue','text','medium',NULL,2,1753686647197);
INSERT INTO Question VALUES(496,'Quelle est la capitale de Bahamas ?','Nassau','text','medium',NULL,2,1753686647201);
INSERT INTO Question VALUES(497,'Quelle est la capitale de Barbade ?','Bridgetown','text','medium',NULL,2,1753686647207);
INSERT INTO Question VALUES(498,'Quelle est la capitale de Trinité-et-Tobago ?','Port-d''Espagne','text','medium',NULL,2,1753686647211);
INSERT INTO Question VALUES(499,'Quelle est la capitale de Grenade ?','Saint-Georges','text','medium',NULL,2,1753686647216);
INSERT INTO Question VALUES(500,'Quelle est la capitale de Saint-Vincent-et-les-Grenadines ?','Kingstown','text','medium',NULL,2,1753686647220);
INSERT INTO Question VALUES(501,'Quelle est la capitale de Saint-Kitts-et-Nevis ?','Basseterre','text','medium',NULL,2,1753686647226);
INSERT INTO Question VALUES(502,'Quelle est la capitale de Antigua-et-Barbuda ?','Saint John''s','text','medium',NULL,2,1753686647231);
INSERT INTO Question VALUES(503,'Quelle est la capitale de Dominique ?','Roseau','text','medium',NULL,2,1753686647237);
INSERT INTO Question VALUES(504,'Quelle est la capitale de Sainte-Lucie ?','Castries','text','medium',NULL,2,1753686647246);
INSERT INTO Question VALUES(505,'Quelle est la capitale de Belize ?','Belmopan','text','medium',NULL,2,1753686647269);
INSERT INTO Question VALUES(506,'Quelle est la capitale de Guatemala ?','Guatemala','text','medium',NULL,2,1753686647290);
INSERT INTO Question VALUES(507,'Quelle est la capitale de Honduras ?','Tegucigalpa','text','medium',NULL,2,1753686647298);
INSERT INTO Question VALUES(508,'Quelle est la capitale de El Salvador ?','San Salvador','text','medium',NULL,2,1753686647309);
INSERT INTO Question VALUES(509,'Quelle est la capitale de Nicaragua ?','Managua','text','medium',NULL,2,1753686647316);
INSERT INTO Question VALUES(510,'Quelle est la capitale de Costa Rica ?','San José','text','medium',NULL,2,1753686647331);
INSERT INTO Question VALUES(511,'Quelle est la capitale de Panama ?','Panama','text','medium',NULL,2,1753686647345);
CREATE TABLE IF NOT EXISTS "Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "gameMode" TEXT NOT NULL DEFAULT 'blind',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Score_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Score VALUES(1,1,1,15,15,15,1,'blind',1753481711931,1753481711931);
INSERT INTO Score VALUES(2,2,1,1,1,7,6,'blind',1753524631469,1753724272976);
INSERT INTO Score VALUES(3,2,2,5,5,9,4,'normal',1753540742209,1753722160412);
INSERT INTO sqlite_sequence VALUES('Game',2);
INSERT INTO sqlite_sequence VALUES('User',2);
INSERT INTO sqlite_sequence VALUES('Question',511);
INSERT INTO sqlite_sequence VALUES('Score',3);
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "Score_userId_gameId_key" ON "Score"("userId", "gameId");
COMMIT;
