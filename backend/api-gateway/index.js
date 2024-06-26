import { config } from "dotenv";
import express from "express";
import httpProxy from "http-proxy";
import { authenticate } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const apiGateway = express();
apiGateway.use(cookieParser());
apiGateway.use(cors());
const proxy = httpProxy.createProxyServer();

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[96m",
  yellow: "\x1b[93m",
  magenta: "\x1b[95m",
  green: "\x1b[92m",
  blue: "\x1b[94m",
  red: "\x1b[91m",
};

const consoleLog = (message, color) => {
  console.log(`${color}${message}${colors.reset}`);
};

apiGateway.use("/api/auth", (req, res) => {
  consoleLog(`Request sent to auth server from gateway`, colors.green);
  proxy.web(req, res, { target: process.env.AUTH_API });
});

apiGateway.use("/api/*", (req, res, next) => {
  authenticate(req, res, next);
});

proxy.on("error", (error, req, res) => {
  console.error("Proxy Error:", error);
  res.status(500).send("Proxy Error");
});

apiGateway.listen(process.env.API_GATEWAY_PORT, () => {
  console.log(
    `API Gateway running on http://localhost:${process.env.API_GATEWAY_PORT}`
  );
});

apiGateway.use("/api/user", (req, res) => {
  consoleLog(`Request sent to auth server from gateway`, colors.green);
  proxy.web(req, res, { target: process.env.AUTH_API });
});

apiGateway.use("/api/payment", (req, res) => {
  consoleLog(`Request sent to payment server from gateway`, colors.cyan);
  proxy.web(req, res, { target: process.env.PAYMENT_API });
});

apiGateway.use("/payment", (req, res) => {
  consoleLog(`Request sent to payment server from gateway`, colors.cyan);
  proxy.web(req, res, { target: process.env.PAYMENT_API });
});

apiGateway.use("/api/course", (req, res) => {
  consoleLog(`Request sent to course server from gateway`, colors.yellow);
  proxy.web(req, res, { target: process.env.COURSE_API });
});

apiGateway.use("/course", (req, res) => {
  consoleLog(`Request sent to course server from gateway`, colors.yellow);
  proxy.web(req, res, { target: process.env.COURSE_API });
});

apiGateway.use("/api/notification", (req, res) => {
  consoleLog(`Request sent to notification server from gateway`, colors.blue);
  proxy.web(req, res, { target: process.env.NOTIFICATION_API });
});

apiGateway.use("/notification", (req, res) => {
  consoleLog(`Request sent to notification server from gateway`, colors.blue);
  proxy.web(req, res, { target: process.env.NOTIFICATION_API });
});

apiGateway.use("/api/learner", (req, res) => {
  consoleLog(`Request sent to learner server from gateway`, colors.magenta);
  proxy.web(req, res, { target: process.env.LEARNER_API });
});

apiGateway.use("/learner/auth", (req, res) => {
  consoleLog(`Request sent to auth of learner server from gateway`, colors.red);
  proxy.web(req, res, { target: process.env.LEARNER_API });
});
