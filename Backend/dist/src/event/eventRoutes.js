"use strict";
<<<<<<< HEAD
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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("./eventController"));
const eventRoutes = (0, express_1.Router)();
eventRoutes.post("/", controller.addEvent);
eventRoutes.get("/", controller.getEvents);
eventRoutes.get("/available-tickets/", controller.getEventsWithAvailableTickets);
eventRoutes.get("/sold-out", controller.getEventsWithSoldOutTickets);
eventRoutes.get("/:id", controller.getEventById);
eventRoutes.delete("/:id", controller.deleteEvent);
eventRoutes.put("/:id", controller.updateEvent);
eventRoutes.get("/spot/:id", controller.getEventsBySpotId);
eventRoutes.get("/type/:id", controller.getEventsByEventTypeId);
eventRoutes.get("/performer/:id", controller.getEventsByPerformerId);
eventRoutes.get("/date/:begin/:end", controller.getEventsWithinDateRange);
eventRoutes.get("/limited-availability/:limit", controller.getEventsWithLimitedAvailability);
exports.default = eventRoutes;
/*
Request Body for POST/PUT:
{
  "name": "RapFestival",
  "description": "Spiewanie piosenek",
  "begindate": "2023-06-01",
  "enddate": "2023-06-05",
  "availabletickets": 10000,
  "currentlytakentickets": 0,
  "spot_id": 8,
  "eventtype_id": 3,
  "company_id": 13,
  "discussion_id": 8
}

Request Body for updateEvent:
{
    "name": string,
    "description": string,
    "BeginDate": date,
    "EndDate": date,
    "AvailableTickets": integer,
    "CurrentlyTakenTickets": integer,
    "spot_id": integer,
    "eventtype_id": integer,
    "company_id": integer,
    "discussion_id": integer
}

body for get
{
    [
        {
        "event_id": 2,
        "name": "StandUP.TV",
        "description": "haha xd lol",
        "begindate": "2023-05-30T22:00:00.000Z",
        "enddate": "2023-06-03T22:00:00.000Z",
        "availabletickets": 100,
        "currentlytakentickets": 0,
        "spot_id": 7,
        "eventtype_id": 2,
        "company_id": 12,
        "discussion_id": 7
        }, ...
    ]
}

body for get by id
{
    "event_id": 2,
    "name": "StandUP.TV",
    "description": "haha xd lol",
    "begindate": "2023-05-30T22:00:00.000Z",
    "enddate": "2023-06-03T22:00:00.000Z",
    "availabletickets": 100,
    "currentlytakentickets": 0,
    "spot": {
        "spot_id": 7,
        "spot_name": "Spot B",
        "spot_type": "Spot Type B",
        "address": {
            "address_id": 2,
            "country": "Country B",
            "city": "City B",
            "street": "Street B",
            "number": "456"
        }
    },
    "eventtype_name": "Event Type B",
    "company_id": 12,
    "discussion_id": 7,
    "event_images": [
        {
            "eventimage_id": 1,
            "image_url": "image_url_1.jpg"
        },
    ],
    "performers": [
        {
            "performer_id": 17,
            "performer_name": "Performer B",
            "performer_type": "Performer Type B"
        },
    ]
}
=======

>>>>>>> main
*/ 
