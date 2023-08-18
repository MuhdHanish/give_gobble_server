// import dependencies
import { Socket } from "socket.io";
import express from "express";
import morgan from "morgan";
import cors from "cors";

// import dotenv
import { config } from "dotenv";
config();

// database connection
import connnectDatabase from "./src/framework/database/config/dbConfig";

// import the route file
import { adminRoutes, userRoutes,ngoRoutes,restaurantRotues, tokenRoute } from "./src/interface/routes";

// creat express application
const app = express();

// cors setting
const allowedOrigins = ["*", process.env.CORS_ORIGIN_URL as string];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// user route
app.use('/', userRoutes);
app.use('/ngo', ngoRoutes);
app.use('/admin', adminRoutes);
app.use('/restaurant', restaurantRotues);

// token route
app.use("/refresh/token", tokenRoute);

// database connecting & app listen
const port = process.env.PORT || 8000;
connnectDatabase()
  .then((res) => {
    console.log(res);
    const server = app.listen(port, (): void => console.log(`Server running...`));
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: allowedOrigins,
      },
    });
    io.on("connection", (socket: Socket) => {
      console.log('connected to socket...');
      socket.on("setup", (data:string) => {
        console.log(data);
        socket.emit("response", "hello bwoy")
      });
    });
  })
  .catch((error) => console.log(`Failed to connect database`, error));
