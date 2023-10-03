import express from "express";

import { connectDB } from "./db/config.js";
import { getEvents } from "./db/get-events.js";
import { scrapeConfigs } from "./utils/scrapeConfig.js";
import { addEvents } from "./db/add-events.js";

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.get("/api/events", async (req, res) => {
  const events = await getEvents(req.query);
  res.json(events);
});

app.post("/api/events", async (_, res) => {
  try {
    await Promise.allSettled(
      scrapeConfigs.map((scrapeConfig) => addEvents(scrapeConfig))
    );

    res.json({
      message:
        "List of urls found to be scraped. Events on the pages will be added to db.",
      urls: scrapeConfigs.map((scrapeConfig) => scrapeConfig.url),
    });
  } catch (e) {
    console.error(e);
    res.json({ error: e.message });
  }
});

app.listen(port, () => console.log(`App listening at port ${port}`));
