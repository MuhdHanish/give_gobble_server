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

// required a model
import { Ngo } from "./src/domain/models/Ngo";

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
      socket.on("setup", () => {
         socket.join("ngo_group"); 
         socket.emit("connected");
      });
      socket.on("joinChat", () => {
        socket.join("ngo_group");
        console.log(`Ngo joined room: ngo_group`);
      });
      socket.on("typing", () => socket.to("ngo_group").emit("typing"));
      socket.on("stop typing", () => socket.to("ngo_group").emit("stop typing"));
      socket.on("newMessage", (newMessageRecieved) => {
        let chat = newMessageRecieved?.chat;
         if (!chat?.users) return console.log(`chat. user not defined`);
         chat?.users.forEach((user:Ngo) => {
          if (user?._id === newMessageRecieved?.sender?._id) return;
          socket.to(user?._id?.toString() as string).emit("messageRecieved", newMessageRecieved);
        });
      });
    });
  })
  .catch((error) => console.error(`Failed to connect database`, error));
