const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Merg pe site...");
  await page.goto("https://multipass.wizzair.com/auth/realms/w6/protocol/openid-connect/auth?scope=openid%20roles%20tenant%20address%20phone%20subs%20email%20passenger&response_type=code&client_id=cvo-laravel&redirect_uri=https%3A%2F%2Fmultipass.wizzair.com%2Fw6%2Fsubscriptions%2Fauth%2Fcallback&state=ff41027cd4186d4d4992107e40178f90&ui_locales=en&kc_locale=en");
  
  // exemplu login (înlocuiește cu propriile selectoare corecte)
  await page.click('text=Conectare');
  await page.fill('input[name="email"]', process.env.WIZZ_EMAIL);
  await page.fill('input[name="password"]', process.env.WIZZ_PASS);
  await page.click('button[type="submit"]');

  await page.waitForURL('**/subscriptions');
  console.log("Autentificat!");

  await page.goto("https://multipass.wizzair.com/ro/w6/subscriptions/availability/a2b6c8a5-19d4-413f-90a3-0903c25d8a19");

  console.log(await page.title());
  await browser.close();
})();
