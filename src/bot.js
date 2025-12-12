import axios from "axios";

export async function notifyUser(chatId, text) {
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
  await axios.post(url, { chat_id: chatId, text });
}
