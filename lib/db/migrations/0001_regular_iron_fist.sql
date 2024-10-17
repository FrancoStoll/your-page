CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"instagramUrl" varchar(255),
	"facebookUrl" varchar(255),
	"description" varchar(255)
);
