"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompany = exports.deleteCompany = exports.getCompanyById = exports.getCompany = exports.addCompany = void 0;
exports.addCompany = "INSERT INTO companies (name, description) VALUES ($1,$2) RETURNING *";
exports.getCompany = "SELECT * FROM companies";
exports.getCompanyById = "SELECT companies.company_id, companies.name, companies.description, json_build_object('discussion_id', discussions.discussion_id, 'comments', json_build_object('comments_id', comments.comments_id,'content',comments.content)) AS discussion FROM companies LEFT JOIN discussions ON companies.discussion_id = discussions.discussion_id LEFT JOIN comments ON discussions.discussion_id = comments.discussion_id WHERE companies.company_id = $1";
exports.deleteCompany = "DELETE FROM companies WHERE company_id = $1";
exports.updateCompany = "UPDATE companies SET name = $1,description = $2 WHERE company_id = $3 RETURNING *";
