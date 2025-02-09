const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const http = require('http');
const socketServer = require('./socketServer');
const authenticate = require("./middlewares/socketAuthentacation");
const cors = require("cors");

const mainRoute = require("./Routes/index");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

dotenv.config({ path: ".env" });

const app = express();

app.use(cors({origin:"*",methods:["GET","POST","PUT","DELETE","PATCH"]}));

app.use(express.json());
app.use(morgan("dev"));

// main system route
app.use("/api", mainRoute);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketServer(server);
io.use(authenticate);

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
