"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = exports.deleteCompany = exports.getCompanyById = exports.getCompany = exports.addCompany = void 0;
exports.addCompany = "INSERT INTO companies (discussion_id,name,description) VALUES ($1,$2,$3) RETURNING *";
exports.getCompany = "SELECT * FROM companies";
exports.getCompanyById = "SELECT * FROM companies WHERE company_id = $1";
exports.deleteCompany = "DELETE FROM companies WHERE company_id = $1";
exports.updateCompany = "UPDATE companies SET name = $1,description = $2 WHERE company_id = $3 RETURNING *";
