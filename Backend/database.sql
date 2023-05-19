CREATE DATABASE eventease_database;

CREATE TABLE usertypes(
    usertype_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    usertype_id INTEGER,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    birthday Date NOT NULL,
    password VARCHAR(100) NOT NULL,
    CONSTRAINT fk_usertype FOREIGN KEY(usertype_id) 
        REFERENCES usertypes(usertype_id)
        ON DELETE SET NULL
        ON UPDATE NO ACTION
);

CREATE TABLE spottypes(
    spottype_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE transactionstatuses(
    transactionstatus_id SERIAL PRIMARY KEY,
    status VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tickettypes(
    tickettype_id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL UNIQUE
);