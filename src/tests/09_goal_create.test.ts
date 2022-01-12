import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("GoalEdit.tsx", () => {
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

  it("vlgnr:16 All data makes new goal", async () => {
    await page.goto("http://localhost:3000/doelstellingen/wijzigen/0");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestDoelstelling1', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".Toastify__progress-bar--success");
    const succesText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

    expect(succesText).toBe("Doelstelling aangemaakt!");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));
    
    expect(rows.length).toBe(3);
    expect(rows[2]).toBe("TestDoelstelling1");
  });

  it("vlgnr:17 Empty names gives error", async () => {
    await page.goto("http://localhost:3000/doelstellingen/wijzigen/0");
    await page.waitForSelector("input[name=name]");

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Naam mag niet leeg zijn!");
  });

  afterAll(() => browser.close());
});