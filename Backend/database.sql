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

CREATE TABLE performers(
    performer_id SERIAL PRIMARY KEY,
    performertype_id INTEGER,
    name VARCHAR (100) NOT NULL UNIQUE,
    description text,
    CONSTRAINT fk_performertype FOREIGN KEY(performertype_id)
        REFERENCES performertypes(performertype_id)
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

CREATE TABLE performertypes (
    performertype_id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    transactionstatus_id INTEGER,
    value FLOAT NOT NULL,
    transactiondate Date NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT fk_status FOREIGN KEY(transactionstatus_id) 
        REFERENCES transactionstatuses(transactionstatus_id)
        ON DELETE SET NULL
        ON UPDATE NO ACTION
);