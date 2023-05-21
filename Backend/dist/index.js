"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userTypeRoutes_1 = __importDefault(require("./src/userType/userTypeRoutes"));
const userRoutes_1 = __importDefault(require("./src/user/userRoutes"));
const performerRoutes_1 = __importDefault(require("./src/performer/performerRoutes"));
const spotTypeRoutes_1 = __importDefault(require("./src/spotType/spotTypeRoutes"));
const transactionStatusRoutes_1 = __importDefault(require("./src/transactionStatus/transactionStatusRoutes"));
const ticketTypeRoutes_1 = __importDefault(require("./src/ticketType/ticketTypeRoutes"));
const performerTypeRoutes_1 = __importDefault(require("./src/performerType/performerTypeRoutes"));
const transactionsRoutes_1 = __importDefault(require("./src/transaction/transactionsRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/userTypes", userTypeRoutes_1.default);
app.use("/api/performers", performerRoutes_1.default);
app.use("/api/spotTypes", spotTypeRoutes_1.default);
app.use("/api/transactionStatuses", transactionStatusRoutes_1.default);
app.use("/api/ticketTypes", ticketTypeRoutes_1.default);
app.use("/api/performerTypes", performerTypeRoutes_1.default);
app.use("/api/transactions", transactionsRoutes_1.default);
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
