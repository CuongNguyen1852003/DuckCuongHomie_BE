CREATE SCHEMA vidu;
SET SCHEMA 'vidu';

CREATE TABLE accounts(
	user_id SERIAL PRIMARY KEY, -- serial là tự động tăng
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP
);