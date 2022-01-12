import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("LocationEdit.tsx", () => {
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

  it("vlgnr:43 All data updates location", async () => {
    await page.goto("http://localhost:3000/locaties/wijzigen/5");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestLocatie2', {delay: 10});

    await page.select("#areaId", "3");
    await page.select("#franchiseId", "3");

    const longitudeInput:any = await page.$('input[name=longitude]');
    await longitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await longitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('5', {delay: 10});

    const latitudeInput:any = await page.$('input[name=latitude]');
    await latitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await latitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    const radiusInput:any = await page.$('input[name=radius]');
    await radiusInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await radiusInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    const delayInput:any = await page.$('input[name=delay]');
    await delayInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await delayInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    await page.select('#new-intervention', '2');

    await page.$eval('.add-row .submit-button', (el:any) => el.click());

    await page.$eval('form .submit-button', (el:any) => el.click());

    await page.waitForSelector(".Toastify__progress-bar--success");
    const succesText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

    expect(succesText).toBe("Locatie bijgewerkt!");

    await page.waitForSelector(".table-row");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));
    
    expect(rows.length).toBe(3);
    expect(rows[0]).toBe("TestLocatie2\nUtrecht");
  });

  it("vlgnr:44 Empty delay gives error", async () => {
    await page.goto("http://localhost:3000/locaties/wijzigen/5");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestLocatie', {delay: 10});

    await page.select("#areaId", "3");
    await page.select("#franchiseId", "3");

    const longitudeInput:any = await page.$('input[name=longitude]');
    await longitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await longitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('5', {delay: 10});

    const latitudeInput:any = await page.$('input[name=latitude]');
    await latitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await latitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    const radiusInput:any = await page.$('input[name=radius]');
    await radiusInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await radiusInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    const delayInput:any = await page.$('input[name=delay]');
    await delayInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');

    await page.select('#new-intervention', '2');

    await page.$eval('.add-row .submit-button', (el:any) => el.click());

    await page.$eval('form .submit-button', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Delay mag niet leeg zijn!");
  });

  it("vlgnr:45 Empty name gives error", async () => {
    await page.goto("http://localhost:3000/locaties/wijzigen/5");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');

    await page.select("#areaId", "3");
    await page.select("#franchiseId", "3");

    const longitudeInput:any = await page.$('input[name=longitude]');
    await longitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await longitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('5', {delay: 10});

    const latitudeInput:any = await page.$('input[name=latitude]');
    await latitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await latitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    const radiusInput:any = await page.$('input[name=radius]');
    await radiusInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await radiusInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    const delayInput:any = await page.$('input[name=delay]');
    await delayInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await delayInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

    await page.select('#new-intervention', '2');

    await page.$eval('.add-row .submit-button', (el:any) => el.click());

    await page.$eval('form .submit-button', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Naam mag niet leeg zijn!");
  });

  afterAll(() => browser.close());
});