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

CREATE TABLE events(
    event_id SERIAL PRIMARY KEY,
    name VARCHAR (100),
    description text,
    BeginDate Date,
    EndDate Date,
    AvailableTickets INTEGER,
    CurrentlyTakenTickets INTEGER,
    spot_id INTEGER,
    eventtype_id INTEGER,
    company_id INTEGER,
    discussion_id INTEGER,
    CONSTRAINT fk_spot FOREIGN KEY(spot_id)
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
        ON UPDATE NO ACTION
);