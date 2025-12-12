import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { router as eventsRouter } from "./routes/events.js";

const app = express();
app.use(bodyParser.json());

// API
app.use("/events", eventsRouter);

// Webhook бота
app.post("/webhook", (req, res) => {
  console.log("Telegram update:", req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => res.send("Backend running!"));

const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server running on port", port));
