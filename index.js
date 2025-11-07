const { chromium } = require('playwright-core');

(async () => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("Deschid site-ul Wizz Air...");

    await page.goto("https://multipass.wizzair.com/ro/w6/subscriptions");
    await page.click('text=Conectare');

    await page.fill('input[name="email"]', process.env.WIZZ_EMAIL);
    await page.fill('input[name="password"]', process.env.WIZZ_PASS);
    await page.click('button[type="submit"]');

    await page.waitForURL('**/subscriptions');
    console.log("Autentificat!");

    const targetUrl = 'https://multipass.wizzair.com/ro/w6/subscriptions/availability/a2b6c8a5-19d4-413f-90a3-0903c25d8a19';
    await page.goto(targetUrl);

    console.log("Pagina Multipass disponibilitate încărcată!");
    const bodyText = await page.textContent('body');
    console.log("Conținut pagină:", bodyText.slice(0, 500), "...");

    await browser.close();
  } catch (err) {
    console.error("Eroare Playwright:", err);
  }
})();
