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

CREATE TABLE performertypes (
    performertype_id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE performers(
    performer_id SERIAL PRIMARY KEY,
    performertype_id INTEGER,
    name VARCHAR (100) NOT NULL UNIQUE,
    description text,
    CONSTRAINT fk_performertype FOREIGN KEY(performertype_id)
        REFERENCES performertypes(performertype_id)
        ON DELETE SET NULL
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

CREATE TABLE addresses(
    address_id SERIAL PRIMARY KEY,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    number VARCHAR(50) NOT NULL
);

CREATE TABLE spots(
    spot_id SERIAL PRIMARY KEY,
    spottype_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description text,
    capacity INTEGER,
    isopen BOOLEAN,
    spotimage VARCHAR(500),
    CONSTRAINT fk_spottype FOREIGN KEY(spottype_id)
        REFERENCES spottypes(spottype_id)
        ON DELETE SET NULL,
    CONSTRAINT fk_address FOREIGN KEY(address_id)
        REFERENCES addresses(address_id)
        ON DELETE SET NULL
);

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    description text,
    BeginDate Date,
    EndDate Date,
    AvailableTickets INTEGER,
    CurrentlyTakenTickets INTEGER,
    spot_id INTEGER NOT NULL,
    eventtype_id INTEGER NOT NULL,
    company_id INTEGER,
    discussion_id INTEGER
);

ALTER TABLE events
ADD CONSTRAINT fk_spot FOREIGN KEY(spot_id)
        REFERENCES spots(spot_id)
        ON DELETE SET NULL
        ON UPDATE NO ACTION,
    CONSTRAINT fk_eventtype FOREIGN KEY(eventtype_id)
        REFERENCES eventtypes(eventtype_id)
        ON DELETE SET NULL
        ON UPDATE NO ACTION,
    CONSTRAINT fk_company FOREIGN KEY(company_id)
        REFERENCES companies(company_id)
        ON DELETE SET NULL
        ON UPDATE NO ACTION;