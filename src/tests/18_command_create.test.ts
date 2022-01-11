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

  it("vlgnr:21 All data makes new command", async () => {
    await page.goto("http://localhost:3000/interventies/commando/wijzigen/0");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestCommando1', {delay: 10});

    const textInput:any = await page.$('input[name=commandText]');
    await textInput.click({ clickCount: 1 });
    await page.keyboard.type('Dit is een test commando', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".Toastify__progress-bar--success");
    const succesText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

    expect(succesText).toBe("Commando aangemaakt!");

    await page.waitForSelector(".table-row");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));
    
    expect(rows.length).toBe(6);
    expect(rows[5]).toBe("TestCommando1\ncommando");
  });

  it("vlgnr:22 Empty name throws error", async () => {
    await page.goto("http://localhost:3000/interventies/commando/wijzigen/0");
    await page.waitForSelector("input[name=name]");

    const textInput:any = await page.$('input[name=commandText]');
    await textInput.click({ clickCount: 1 });
    await page.keyboard.type('Dit is een test commando', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Naam mag niet leeg zijn!");
  });

  it("vlgnr:23 Empty text throws error", async () => {
    await page.goto("http://localhost:3000/interventies/commando/wijzigen/0");
    await page.waitForSelector("input[name=name]");

    const textInput:any = await page.$('input[name=name]');
    await textInput.click({ clickCount: 1 });
    await page.keyboard.type('Commando 3', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Tekst mag niet leeg zijn!");
  });

  afterAll(() => browser.close());
});