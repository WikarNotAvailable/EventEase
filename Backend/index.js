"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.express)();
app.listen(3000, function () {
    console.log("server is listening on port 3000");
});
