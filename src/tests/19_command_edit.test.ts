import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("CommandEdit.tsx", () => {
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

  it("vlgnr:24 All data updates command", async () => {
    await page.goto("http://localhost:3000/interventies/commando/wijzigen/2");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');

    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestCommando2', {delay: 10});

    const textInput:any = await page.$('input[name=commandText]');
    await textInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await textInput.click({ clickCount: 1 });
    await page.keyboard.type('Dit is een testcommando', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".Toastify__progress-bar--success");
    const succesText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

    expect(succesText).toBe("Commando bijgewerkt!");

    await page.waitForSelector(".table-row");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));
    
    expect(rows.length).toBe(6);
    expect(rows[0]).toBe("TestCommando2\ncommando");
  });

  it("vlgnr:25 Empty text gives error", async () => {
    await page.goto("http://localhost:3000/interventies/commando/wijzigen/2");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');

    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestCommando2', {delay: 10});

    const textInput:any = await page.$('input[name=commandText]');
    await textInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Tekst mag niet leeg zijn!");
  });

  it("vlgnr:26 Empty name gives error", async () => {
    await page.goto("http://localhost:3000/interventies/commando/wijzigen/2");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Naam mag niet leeg zijn!");
  });

  afterAll(() => browser.close());
});