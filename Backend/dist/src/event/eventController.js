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
exports.getEventsWithSoldOutTickets = exports.getEventsWithLimitedAvailability = exports.getEventsWithAvailableTickets = exports.getEventsWithinDateRange = exports.getEventsByEventTypeId = exports.getEventsByPerformerId = exports.getEventsBySpotId = exports.updateEvent = exports.deleteEvent = exports.getEventById = exports.getEvents = exports.addEvent = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./eventQueries"));
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, begindate, enddate, availabletickets, currentlytakentickets, spot_id, eventtype_id, company_id, discussion_id, } = req.body;
        const newEvent = yield db_1.default.query(queries.addEvent, [
            name,
            description,
            begindate,
            enddate,
            availabletickets,
            currentlytakentickets,
            spot_id,
            eventtype_id,
            company_id,
            discussion_id,
        ]);
        return res.status(201).json(newEvent.rows[0]);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.addEvent = addEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield db_1.default.query(queries.getEvents);
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEvents = getEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const event = yield db_1.default.query(queries.getEventById, [id]);
        if (event.rows.length) {
<<<<<<< HEAD
            return res.status(200).json(event.rows[0]);
=======
>>>>>>> main
        }
        else {
            return res.status(400).json({ message: "Event does not exist. (Nonexistent id)" });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventById = getEventById;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const event = yield db_1.default.query(queries.getEventById, [id]);
        if (!event.rows.length) {
            return res.status(400).json({ message: "Event does not exist. (Nonexistent id)" });
        }
        else {
            yield db_1.default.query(queries.deleteEvent, [id]);
            return res.status(200).json({ message: "Event successfully deleted." });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.deleteEvent = deleteEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, description, begindate, enddate, availabletickets, currentlytakentickets, spot_id, eventtype_id, company_id, discussion_id, } = req.body;
        const event = yield db_1.default.query(queries.getEventById, [id]);
        if (!event.rows.length) {
            return res.status(400).json({ message: "Event does not exist. (Nonexistent id)" });
        }
        else {
            const updatedEvent = yield db_1.default.query(queries.updateEvent, [
                name,
                description,
                begindate,
                enddate,
                availabletickets,
                currentlytakentickets,
                spot_id,
                eventtype_id,
                company_id,
                discussion_id,
                id,
            ]);
            return res.status(200).json(updatedEvent.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateEvent = updateEvent;
const getEventsBySpotId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
        const id = parseInt(req.params.id);
        const events = yield db_1.default.query(queries.getEventsBySpotId, [id]);
=======
>>>>>>> main
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventsBySpotId = getEventsBySpotId;
<<<<<<< HEAD
const getEventsByPerformerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const events = yield db_1.default.query(queries.getEventsByPerformerId, [id]);
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventsByPerformerId = getEventsByPerformerId;
const getEventsByEventTypeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const events = yield db_1.default.query(queries.getEventsByEventTypeId, [id]);
=======
>>>>>>> main
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventsByEventTypeId = getEventsByEventTypeId;
const getEventsWithinDateRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
<<<<<<< HEAD
        const { begin, end } = req.params;
        const beginDate = new Date(begin);
        const endDate = new Date(end);
        const events = yield db_1.default.query(queries.getEventsWithinDateRange, [beginDate, endDate]);
=======
>>>>>>> main
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventsWithinDateRange = getEventsWithinDateRange;
const getEventsWithAvailableTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield db_1.default.query(queries.getEventsWithAvailableTickets);
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventsWithAvailableTickets = getEventsWithAvailableTickets;
const getEventsWithLimitedAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = req.params;
        const events = yield db_1.default.query(queries.getEventsWithLimitedAvailability, [limit]);
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventsWithLimitedAvailability = getEventsWithLimitedAvailability;
const getEventsWithSoldOutTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield db_1.default.query(queries.getEventsWithSoldOutTickets);
        return res.status(200).json(events.rows);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getEventsWithSoldOutTickets = getEventsWithSoldOutTickets;
