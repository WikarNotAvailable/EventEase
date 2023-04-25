"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userTypeRoutes_1 = __importDefault(require("./src/userType/userTypeRoutes"));
const userRoutes_1 = __importDefault(require("./src/user/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/userTypes", userTypeRoutes_1.default);
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
