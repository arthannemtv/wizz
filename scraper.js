import { chromium } from "playwright";

export async function checkFlights() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://multipass.wizzair.com/ro/w6/subscriptions/availability");
    await page.waitForTimeout(2000);

    // exemplu: OTP -> oricare alt aeroport
    console.log("Searching flights from OTP...");

    // poți completa aici cu logica ta (selectare OTP, dată, etc.)
    // pentru început doar verificăm că pagina se încarcă:
    const title = await page.title();
    console.log("Page title:", title);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await browser.close();
  }
}
