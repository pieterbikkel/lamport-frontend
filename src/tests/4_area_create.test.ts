import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("AreaEdit.tsx", () => {
    let browser : Browser;
    let page : Page;
  
    beforeAll(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto("http://localhost:3000/")
      const response = await new AxiosNetworkAdapter().post("/auth", {"username": "Bart", "password": "Bart"});
      const token = response.data.token;
      await page.evaluate(async (token) => {
        localStorage.setItem("token", token);
      }, token);
    });

  it("Happy flow", async () => {
    await page.goto("http://localhost:3000/gebieden/wijzigen/0");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestGebied1', {delay: 10});

    const longitutdeInput:any = await page.$('input[name=longitude]');
    await longitutdeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await longitutdeInput.click({ clickCount: 1 });
    await page.keyboard.type('10', {delay: 10});

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

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".Toastify__progress-bar--success");
    const succesText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

    expect(succesText).toBe("Gebied aangemaakt!");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));
    
    expect(rows.length).toBe(3);
    expect(rows[2]).toBe("TestGebied1");
  });

  it("Alternative flow 1", async () => {
    await page.goto("http://localhost:3000/gebieden/wijzigen/2");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestGebied2', {delay: 10});

    const longitutdeInput:any = await page.$('input[name=longitude]');
    await longitutdeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');

    const latitudeInput:any = await page.$('input[name=latitude]');
    await latitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await latitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('5', {delay: 10});

    const radiusInput:any = await page.$('input[name=radius]');
    await radiusInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await radiusInput.click({ clickCount: 1 });
    await page.keyboard.type('3', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Lengtegraad mag niet leeg zijn!");
  });

  it("Alternative flow 2", async () => {
    await page.goto("http://localhost:3000/gebieden/wijzigen/2");
    await page.waitForSelector("input[name=name]");

    const nameInput:any = await page.$('input[name=name]');
    await nameInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await nameInput.click({ clickCount: 1 });
    await page.keyboard.type('TestGebied3', {delay: 10});

    const longitutdeInput:any = await page.$('input[name=longitude]');
    await longitutdeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await longitutdeInput.click({ clickCount: 1 });
    await page.keyboard.type('3', {delay: 10});

    const latitudeInput:any = await page.$('input[name=latitude]');
    await latitudeInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await latitudeInput.click({ clickCount: 1 });
    await page.keyboard.type('8', {delay: 10});

    const radiusInput:any = await page.$('input[name=radius]');
    await radiusInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await radiusInput.click({ clickCount: 1 });
    await page.keyboard.type('0', {delay: 10});

    await page.$eval('input[type=submit]', (el:any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors[0]).toBe("Straal mag niet leeg zijn!");
  });
});