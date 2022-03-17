BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Task" (
	"taskid"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"createAt"	DATETIME NOT NULL,
	"updatedAt"	DATETIME NOT NULL,
	PRIMARY KEY("taskid")
);
CREATE TABLE IF NOT EXISTS "Label" (
	"labelid"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"date"	DATETIME NOT NULL,
	"createdAt"	DATETIME NOT NULL,
	"updatedAt"	DATETIME NOT NULL,
	PRIMARY KEY("labelid")
);
CREATE TABLE IF NOT EXISTS "LabelTask" (
	"createdAt"	DATETIME NOT NULL,
	"updatedAt"	DATETIME NOT NULL,
	"TaskId"	INTEGER NOT NULL,
	"LabelId"	INTEGER NOT NULL,
	PRIMARY KEY("TaskId","LabelId")
);
CREATE TABLE IF NOT EXISTS "User" (
	"id"	INTEGER NOT NULL UNIQUE,
	"username"	VARCHAR(50) NOT NULL,
	"password"	VARCHAR(50),
	"picture"	TEXT(65536),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "Step" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	VARCHAR(50) NOT NULL,
	"description"	VARCHAR(200),
	"latitude"	FLOAT NOT NULL,
	"longitude"	FLOAT NOT NULL,
	"category"	VARCHAR(50),
	"id_travel"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("id_travel") REFERENCES "Travel"("id")
);
CREATE TABLE IF NOT EXISTS "Point" (
	"id"	INTEGER NOT NULL UNIQUE,
	"latitude"	FLOAT NOT NULL,
	"longitude"	FLOAT NOT NULL,
	"title"	VARCHAR(50),
	"description"	VARCHAR(200),
	"category"	VARCHAR(50),
	"id_travel"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("id_travel") REFERENCES "Travel"("id")
);
CREATE TABLE IF NOT EXISTS "Travel" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	VARCHAR(50),
	"picture"	TEXT(65536),
	"activated"	BOOLEAN NOT NULL DEFAULT 0,
	"budget"	DOUBLE NOT NULL DEFAULT 0,
	"infos"	VARCHAR(10000),
	"finished"	BOOLEAN NOT NULL DEFAULT 0,
	"organizer"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("organizer") REFERENCES "User"("id")
);
CREATE TABLE IF NOT EXISTS "TaskStep" (
	"id"	INTEGER NOT NULL UNIQUE,
	"id_task"	INTEGER NOT NULL,
	"id_step"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("id_task") REFERENCES "Task"("taskid"),
	FOREIGN KEY("id_step") REFERENCES "Step"("id")
);
CREATE TABLE IF NOT EXISTS "TaskPoint" (
	"id"	INTEGER NOT NULL UNIQUE,
	"id_task"	INTEGER NOT NULL,
	"id_point"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("id_point") REFERENCES "Point"("id"),
	FOREIGN KEY("id_task") REFERENCES "Task"("taskid")
);
CREATE TABLE IF NOT EXISTS "TravelMember" (
	"id"	INTEGER NOT NULL UNIQUE,
	"id_travel"	INTEGER NOT NULL,
	"id_user"	INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("id_travel") REFERENCES "Travel"("id"),
	FOREIGN KEY("id_user") REFERENCES "User"("id")
);
COMMIT;
