import express from "express";
import { chromium } from "playwright";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Wizz Flight Finder API active 🛫"));

app.post("/find-flights", async (req, res) => {
  const { from = "OTP", days = 2 } = req.body;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://multipass.wizzair.com/");
    // Aici ulterior vom adăuga logica de căutare zboruri.

    // De test:
    await new Promise(r => setTimeout(r, 2000));

    await browser.close();
    res.json({ status: "ok", message: "Browser ran successfully" });
  } catch (err) {
    await browser.close();
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

import { checkFlights } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Wizz Flight Finder API active 🛫"));
app.get("/run", async (req, res) => {
  await checkFlights();
  res.send("Scraper run complete. Check logs.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

