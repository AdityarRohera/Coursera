"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// all middleWare
app.use(express_1.default.json());
// database connection 
const dbConnect_1 = __importDefault(require("./database-connect/dbConnect"));
(0, dbConnect_1.default)();
// all user routes
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
app.use('/api/v1/user', userRoute_1.default);
app.use('/api/v1/admin', adminRoute_1.default);
app.listen(port, () => {
    console.log(`app listening in ${port} port`);
});
