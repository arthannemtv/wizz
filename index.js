const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("Deschid pagina de login Wizz Air...");

    await page.goto("https://multipass.wizzair.com/ro/w6/subscriptions");

    // Completează username/email
    await page.fill('#username', process.env.WIZZ_EMAIL);

    // Completează parola
    await page.fill('#password', process.env.WIZZ_PASS);

    // Click pe butonul Sign In
    await page.click('#kc-login');

    // Așteaptă redirecționarea către subscriptions
    await page.waitForURL('**/subscriptions', { timeout: 60000 });

    console.log("Autentificat cu succes!");

    // Intră pe pagina de availability
    const targetUrl = 'https://multipass.wizzair.com/ro/w6/subscriptions/availability/a2b6c8a5-19d4-413f-90a3-0903c25d8a19';
    await page.goto(targetUrl);

    console.log("Pagina availability încărcată!");
    const bodyText = await page.textContent('body');
    console.log("Conținut pagină:", bodyText.slice(0, 500), "...");

    await browser.close();
  } catch (err) {
    console.error("Eroare Playwright:", err);
  }
})();
