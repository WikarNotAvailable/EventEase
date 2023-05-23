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
exports.loginUser = exports.updateUser = exports.deleteUser = exports.getUserById = exports.getUsers = exports.postUser = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./userQueries"));
const passwordHash = __importStar(require("password-hash"));
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userTypeID, name, surname, email, phoneNumber, birthday, password } = req.body;
        const emailInDatabase = yield db_1.default.query(queries.checkEmailExists, [email]);
        const phoneNumberInDatabase = yield db_1.default.query(queries.checkPhoneNumberExists, [phoneNumber]);
        const userTypeInDatabase = yield db_1.default.query(queries.checkUserTypeExists, [userTypeID]);
        if (emailInDatabase.rows.length) {
            return res.status(400).json({ message: "Email already exists." });
        }
        else if (phoneNumberInDatabase.rows.length) {
            return res.status(400).json({ message: "Phone number already exists." });
        }
        else if (userTypeInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "User type does not exist." });
        }
        else {
            let newUser = yield db_1.default.query(queries.addUser, [userTypeID, name, surname, email, phoneNumber, birthday, password]);
            newUser.rows[0]["password"] = passwordHash.generate(newUser.rows[0]["password"]);
            return res.status(201).json(newUser.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postUser = postUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getUsers, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getUserById, [id], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (results.rows.length) {
                results.rows[0]["transactions"] = (yield db_1.default.query(queries.getTransactionsForUser, [results.rows[0]["user_id"]])).rows;
                results.rows[0]["password"] = passwordHash.generate(results.rows[0]["password"]);
                res.status(200).json(results.rows);
            }
            else {
                res.status(400).json({ message: "User does not exist. (Non existent id)" });
            }
        }));
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield db_1.default.query(queries.getUserById, [id]);
        if (!user.rows.length) {
            res.status(400).json({ message: "User does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deleteUser, [id], (error, results) => {
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
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { name, surname, email, phoneNumber, birthday, password } = req.body;
        const user = yield db_1.default.query(queries.getUserById, [id]);
        let emailInDatabase = null;
        let phoneNumberInDatabase = null;
        if (name == null)
            name = user.rows[0]["name"];
        if (surname == null)
            surname = user.rows[0]["surname"];
        if (email == null)
            email = user.rows[0]["email"];
        else
            emailInDatabase = yield db_1.default.query(queries.checkEmailExists, [email]);
        if (phoneNumber == null)
            phoneNumber = user.rows[0]["phone_number"];
        else
            phoneNumberInDatabase = yield db_1.default.query(queries.checkPhoneNumberExists, [phoneNumber]);
        if (birthday == null)
            birthday = user.rows[0]["birthday"];
        if (password == null)
            password = user.rows[0]["password"];
        if (!user.rows.length) {
            res.status(400).json({ message: "User does not exist. (Non existent id)" });
        }
        else if (emailInDatabase != null && emailInDatabase.rows.length && id != user.rows[0]["user_id"]) {
            return res.status(400).json({ message: "Email already exists." });
        }
        else if (phoneNumberInDatabase != null && phoneNumberInDatabase.rows.length && id != user.rows[0]["user_id"]) {
            return res.status(400).json({ message: "Phone number already exists." });
        }
        else {
            const newUser = yield db_1.default.query(queries.updateUser, [name, surname, email, phoneNumber, birthday, password, id]);
            res.json(newUser.rows);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateUser = updateUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const emailInDatabase = yield db_1.default.query(queries.checkEmailExists, [email]);
        if (!emailInDatabase.rows.length) {
            return res.json({ message: "Email does not exist." });
        }
        else {
            db_1.default.query(queries.loginUser, [email, password], (error, results) => {
                if (results.rows.length) {
                    return res.status(200).json({ login: "Succeeded", userData: results.rows });
                }
                else {
                    return res.status(400).json({ login: "Failed" });
                }
            });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.loginUser = loginUser;
