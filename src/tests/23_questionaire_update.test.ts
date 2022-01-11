import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("QuestionaireEdit.tsx", () => {
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

  it("vlgnr:37 All data updates questionaire", async () => {
    await page.goto("http://localhost:3000/interventies/vragenlijst/wijzigen/8");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');

    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestVragenlijst2', {delay: 10});

    await page.$eval('.questionnaire-add-question > button', (el:any) => el.click());

    const questionInput:any = await page.$("input[id='9']");
    await questionInput.click({ clickCount: 1 });
    await page.keyboard.type('Dit is een testvraag', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".Toastify__progress-bar--success");
    const succesText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

    expect(succesText).toBe("Vragenlijst bijgewerkt!");

    await page.waitForSelector(".table-row");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));
    
    expect(rows.length).toBe(8);
    expect(rows[4]).toBe("TestVragenlijst2\nvragenlijst");
  });

  it("vlgnr:38 Empty name gives error", async () => {
    await page.goto("http://localhost:3000/interventies/vragenlijst/wijzigen/8");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');

    await page.$eval('.questionnaire-add-question > button', (el:any) => el.click());

    const questionInput:any = await page.$("input[id='9']");
    await questionInput.click({ clickCount: 1 });
    await page.keyboard.type('Dit is een testvraag', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Naam mag niet leeg zijn!");
  });

  afterAll(() => browser.close());
});