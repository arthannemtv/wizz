const { chromium } = require('playwright');

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

    // Click pe Conectare (login)
    await page.click('text=Conectare');

    // Completează email și parolă din variabile de mediu
    await page.fill('input[name="email"]', process.env.WIZZ_EMAIL);
    await page.fill('input[name="password"]', process.env.WIZZ_PASS);
    await page.click('button[type="submit"]');

    // Așteaptă redirecționarea
    await page.waitForURL('**/subscriptions');

    console.log("Autentificat!");

    // Mergi la pagina de availability
    const targetUrl = 'https://multipass.wizzair.com/ro/w6/subscriptions/availability/a2b6c8a5-19d4-413f-90a3-0903c25d8a19';
    await page.goto(targetUrl);

    console.log("Pagina Multipass disponibilitate încărcată!");
