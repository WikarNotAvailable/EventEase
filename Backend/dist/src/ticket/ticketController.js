"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketsForEvent = exports.updateUser = exports.deleteTicket = exports.getTicketById = exports.getTickets = exports.postNTickets = exports.postTicket = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./ticketQueries"));
const postTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketTypeID, eventID, price, withPlaces } = req.body;
        const eventInDatabase = yield db_1.default.query(queries.checkEventExists, [eventID]);
        const ticketTypeInDatabase = yield db_1.default.query(queries.checkTicketTypeExists, [ticketTypeID]);
        const availableTickets = yield db_1.default.query(queries.getAvailableTickets, [eventID]);
        const currentlytakentickets = yield db_1.default.query(queries.getCurrentlyTakenTickets, [eventID]);
        const ticketsCount = yield db_1.default.query(queries.getTicketsCount, [eventID]);
        if (eventInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Event doest not exist." });
        }
        else if (ticketTypeInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Ticket type does not exist." });
        }
        else if (availableTickets.rows[0]["availabletickets"] + currentlytakentickets.rows[0]["currentlytakentickets"] == ticketsCount.rows[0]["ticketscount"]) {
            return res.status(400).json({ message: "Cannot add more tickets for this event." });
        }
        else {
            let ticketPlace;
            if (withPlaces) {
                const ticketsMaxPlace = yield db_1.default.query(queries.getMaxTicketPlace, [eventID]);
                ticketPlace = ticketsMaxPlace.rows[0]["maxplace"] + 1;
            }
            let newTicket = yield db_1.default.query(queries.addTicket, [ticketTypeID, eventID, null, price, ticketPlace, true]);
<<<<<<< HEAD
            return res.status(201).json(newTicket.rows[0]);
=======
            return res.status(201).json(newTicket.rows);
>>>>>>> main
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postTicket = postTicket;
const postNTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketsNumber = parseInt(req.params.number);
        const { ticketTypeID, eventID, price, withPlaces } = req.body;
        const eventInDatabase = yield db_1.default.query(queries.checkEventExists, [eventID]);
        const ticketTypeInDatabase = yield db_1.default.query(queries.checkTicketTypeExists, [ticketTypeID]);
        const availableTickets = yield db_1.default.query(queries.getAvailableTickets, [eventID]);
        const currentlytakentickets = yield db_1.default.query(queries.getCurrentlyTakenTickets, [eventID]);
        const ticketsCount = yield db_1.default.query(queries.getTicketsCount, [eventID]);
        if (eventInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Event doest not exist." });
        }
        else if (ticketTypeInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Ticket type does not exist." });
        }
        else if (ticketsNumber < 1) {
            return res.status(400).json({ message: "Number of tickets to add cannot be lower than 1." });
        }
        else if (Number(availableTickets.rows[0]["availabletickets"]) + Number(currentlytakentickets.rows[0]["currentlytakentickets"]) < Number(ticketsCount.rows[0]["ticketscount"]) + ticketsNumber) {
            return res.status(400).json({ message: "To many tickets to add." });
        }
        else {
            if (withPlaces) {
                let ticketPlaceStart;
                const ticketsMaxPlace = yield db_1.default.query(queries.getMaxTicketPlace, [eventID]);
                ticketPlaceStart = ticketsMaxPlace.rows[0]["maxplace"];
                for (let i = 1; i <= ticketsNumber; i++) {
                    yield db_1.default.query(queries.addTicket, [ticketTypeID, eventID, null, price, ticketPlaceStart + i, true]);
                }
            }
            else {
                for (let i = 1; i <= ticketsNumber; i++) {
                    yield db_1.default.query(queries.addTicket, [ticketTypeID, eventID, null, price, null, true]);
                }
            }
            return res.status(201).json({ meesage: "Tickets were added successfuly." });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postNTickets = postNTickets;
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getTickets, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTickets = getTickets;
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getTicketById, [id], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (results.rows.length) {
                results.rows[0]["transaction"] = (yield db_1.default.query(queries.getTransactionForTicket, [results.rows[0]["transaction_id"]])).rows;
                results.rows[0]["event"] = (yield db_1.default.query(queries.getEventForTicket, [results.rows[0]["event_id"]])).rows;
<<<<<<< HEAD
                res.status(200).json(results.rows[0]);
=======
                res.status(200).json(results.rows);
>>>>>>> main
            }
            else {
                res.status(400).json({ message: "Ticket does not exist. (Non existent id)" });
            }
        }));
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTicketById = getTicketById;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const ticket = yield db_1.default.query(queries.getTicketById, [id]);
        if (!ticket.rows.length) {
            res.status(400).json({ message: "Ticket does not exist. (Non existent id)" });
        }
        else {
            if (ticket.rows[0]["transaction_id"] != null) {
                const availableTickets = yield db_1.default.query(queries.getAvailableTickets, [ticket.rows[0]["event_id"]]);
                const currentlytakentickets = yield db_1.default.query(queries.getCurrentlyTakenTickets, [ticket.rows[0]["event_id"]]);
                yield db_1.default.query(queries.changeCurrentlyTakenAndAvailableTickets, [availableTickets.rows[0]["availabletickets"] + 1, currentlytakentickets.rows[0][" currentlytakentickets"] - 1, ticket.rows[0]["event_id"]]);
            }
            db_1.default.query(queries.deleteTicket, [id], (error, results) => {
                if (error)
                    throw error;
                res.status(200).json({ message: "Successfully deleted." });
            });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.deleteTicket = deleteTicket;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { price, transactionID, isAvailable } = req.body;
        const ticket = yield db_1.default.query(queries.getTicketById, [id]);
        const availableTickets = yield db_1.default.query(queries.getAvailableTickets, [ticket.rows[0]["event_id"]]);
        const currentlytakentickets = yield db_1.default.query(queries.getCurrentlyTakenTickets, [ticket.rows[0]["event_id"]]);
        let transactionInDatabase = null;
        if (price == null)
            price = ticket.rows[0]["price"];
        if (isAvailable == true) {
            transactionID = null;
        }
        else {
            if (transactionID != null) {
                isAvailable = false;
                transactionInDatabase = yield db_1.default.query(queries.getTransactionByID, [transactionID]);
            }
            else {
                isAvailable = ticket.rows[0]["isavailable"];
                transactionInDatabase = yield db_1.default.query(queries.getTransactionForTicket, [id]);
                if (transactionInDatabase.rows.length != 0) {
                    transactionID = transactionInDatabase.rows[0]["transaction_id"];
                }
            }
        }
        if (!ticket.rows.length) {
            res.status(400).json({ message: "Ticket does not exist. (Non existent id)" });
        }
        else if (transactionID != null && (transactionInDatabase === null || transactionInDatabase === void 0 ? void 0 : transactionInDatabase.rows.length) == 0) {
            return res.status(400).json({ message: "Transaction doest not exist." });
        }
        else {
            if (isAvailable == true && ticket.rows[0]["isavailable"] == false) {
                yield db_1.default.query(queries.changeCurrentlyTakenAndAvailableTickets, [availableTickets.rows[0]["availabletickets"] + 1, currentlytakentickets.rows[0]["currentlytakentickets"] - 1, ticket.rows[0]["event_id"]]);
            }
            else if (isAvailable == false && ticket.rows[0]["isavailable"] == true) {
                yield db_1.default.query(queries.changeCurrentlyTakenAndAvailableTickets, [availableTickets.rows[0]["availabletickets"] - 1, currentlytakentickets.rows[0]["currentlytakentickets"] + 1, ticket.rows[0]["event_id"]]);
            }
            const newTicket = yield db_1.default.query(queries.updateTicket, [price, isAvailable, transactionID, id]);
<<<<<<< HEAD
            res.status(200).json(newTicket.rows[0]);
=======
            res.json(newTicket.rows);
>>>>>>> main
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateUser = updateUser;
const getTicketsForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventID = req.query.eventID;
        const price = req.query.price;
        if (eventID == null) {
            res.status(400).json({ message: "You did not pass eventID." });
        }
        else if (price == null) {
            res.status(400).json({ message: "You did not pass price." });
        }
        else {
            let tickets = yield db_1.default.query(queries.getTicketsForEvent, [eventID, price]);
            res.status(200).json(tickets.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTicketsForEvent = getTicketsForEvent;
