import express from "express";
import { db } from "../db.js";
import { notifyUser } from "../bot.js";

export const router = express.Router();

// Получить события
router.get("/", async (req, res) => {
  const { calendarId } = req.query;

  const result = await db.query(
    "SELECT id, title, start_time AS start, end_time AS end FROM events WHERE calendar_id = $1",
    [calendarId]
  );

  res.json(result.rows);
});

// Создать событие
router.post("/", async (req, res) => {
  const { title, start, end, userId } = req.body;

  const result = await db.query(
    `INSERT INTO events (calendar_id, title, start_time, end_time, created_by)
     VALUES (1, $1, $2, $3, $4)
     RETURNING *`,
    [title, start, end, userId]
  );

  // Оповещение
  notifyUser(userId, `Новое событие: ${title}`);

  res.json(result.rows[0]);
});
