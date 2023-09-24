"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// import dotenv
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// database connection
const dbConfig_1 = __importDefault(require("./src/framework/database/config/dbConfig"));
// import the route file
const routes_1 = require("./src/interface/routes");
// creat express application
const app = (0, express_1.default)();
// cors setting
const allowedOrigins = ["*", process.env.CORS_ORIGIN_URL];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
// user route
app.use('/', routes_1.userRoutes);
app.use('/ngo', routes_1.ngoRoutes);
app.use('/admin', routes_1.adminRoutes);
app.use('/restaurant', routes_1.restaurantRotues);
// token route
app.use("/refresh/token", routes_1.tokenRoute);
// database connecting & app listen
const port = process.env.PORT || 8000;
(0, dbConfig_1.default)()
    .then((res) => {
    console.log(res);
    const server = app.listen(port, () => console.log(`Server running...`));
    const io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
            origin: allowedOrigins,
        },
    });
    io.on("connection", (socket) => {
        socket.on("joinChat", () => { socket.join("ngo_group"); socket.emit("ngoJoined"); });
        socket.on("typing", () => socket.to("ngo_group").emit("typing"));
        socket.on("stopTyping", () => socket.to("ngo_group").emit("stopTyping"));
        socket.on("newMessage", (newMessage) => { socket.to("ngo_group").emit("messageRecieved", newMessage); });
    });
})
    .catch((error) => console.error(`Failed to connect database`, error));
