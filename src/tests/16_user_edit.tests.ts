import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("UserEdit.tsx", () => {
    let browser : Browser;
    let page : Page;
  
    beforeAll(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto("http://localhost:3000/")
      const response = await new AxiosNetworkAdapter().post("/auth", {"username": "E2E", "password": "E2E"});
      const token = response.data.token;
      await page.evaluate(async (token) => {
        localStorage.setItem("token", token);
      }, token);
    });

  it("Happy flow", async () => {
    await page.goto("http://localhost:3000/gebruikers/wijzigen/2");
    await page.waitForSelector("input[name=username]");

    const nameInput:any = await page.$('input[name=username]');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestGebruiker2', {delay: 10});

    const emailInput:any = await page.$('input[name=email]');
    await emailInput.click({ clickCount: 1 });
    await page.keyboard.type('test2@test.nl', {delay: 10});

    const passwordInput:any = await page.$('input[name=password]');
    await passwordInput.click({ clickCount: 1 });
    await page.keyboard.type('TestPassword2', {delay: 10});

    await page.select('#id', '1')

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".Toastify__progress-bar--success");
    const succesText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

    expect(succesText).toBe("Gebruiker bijgewerkt!");

    await page.waitForSelector(".table-row");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));
    
    expect(rows.length).toBe(4);
    expect(rows[0]).toBe("TestGebruiker2");
  });

  it("Alternative flow 1", async () => {
    await page.goto("http://localhost:3000/gebruikers/wijzigen/2");
    await page.waitForSelector("input[name=username]");

    const nameInput:any = await page.$('input[name=username]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Gebruikersnaam mag niet leeg zijn!");
  });

  afterAll(() => browser.close());
});