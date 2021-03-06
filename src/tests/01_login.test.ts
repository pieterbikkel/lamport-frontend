import puppeteer, { Browser, Page } from "puppeteer";

describe("Login.tsx", () => {
  let browser : Browser;
  let page : Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("vlgnr:1 Correct Login sets token", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#username");

    const username : any = await page.$('input[name=username]');
    await username.click({ clickCount: 1 })
    await page.keyboard.type('E2E', {delay: 10});

    const password : any = await page.$('input[name=password]');
    await password.click({ clickCount: 1 })
    await page.keyboard.type('E2E', {delay: 10});

    await page.$eval('input[type=submit]', (el : any) => el.click());

    await page.waitForTimeout(1000);

    const token = await page.evaluate(() => localStorage.getItem("token"));

    expect(token).not.toBeUndefined();
    expect(token).not.toBeNull();
    expect(token?.length).not.toBe(0);
  });

  it("vlgnr:2 Just username gives error", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#username");

    const username : any = await page.$('input[name=username]');
    await username.click({ clickCount: 1 })
    await page.keyboard.type('E2E', {delay: 10});

    await page.$eval('input[type=submit]', (el : any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors.length).toBe(1);
    expect(errors[0]).toBe("Wachtwoord mag niet leeg zijn!");
  });

  it("Just password gives error", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#username");

    const username : any = await page.$('input[name=password]');
    await username.click({ clickCount: 1 })
    await page.keyboard.type('E2E', {delay: 10});

    await page.$eval('input[type=submit]', (el : any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors.length).toBe(1);
    expect(errors[0]).toBe("Gebruikersnaam mag niet leeg zijn!");
  });

  it("Empty Login gives 2 errors", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#username");

    await page.$eval('input[type=submit]', (el : any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors.length).toBe(2);
    expect(errors[0]).toBe("Gebruikersnaam mag niet leeg zijn!");
    expect(errors[1]).toBe("Wachtwoord mag niet leeg zijn!");
  });

  it("vlgnr:3 Invalid Login gives error", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("#username");

    const username : any = await page.$('input[name=username]');
    await username.click({ clickCount: 3 })
    await page.keyboard.press('Backspace');
    await username.click({ clickCount: 1 })
    await page.keyboard.type('FouteLogin', {delay: 10});

    const password : any = await page.$('input[name=password]');
    await password.click({ clickCount: 3 })
    await page.keyboard.press('Backspace');
    await password.click({ clickCount: 1 })
    await page.keyboard.type('FouteLogin', {delay: 10});

    await page.$eval('input[type=submit]', (el : any) => el.click());

    await page.waitForSelector(".error");

    const errors = await page.evaluate(() => Array.from(document.querySelectorAll(".error")).map((el:any) => el.innerText));

    expect(errors.length).toBe(1);
    expect(errors[0]).toBe("Deze combinatie van gebruikersnaam en wachtwoord is niet gevonden!");
  });

  it("vlgnr:70 Logout deletes token", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector(".nav-dropdown");

    await page.select('.nav-dropdown', 'uitloggen');

    await page.waitForSelector('.button');

    const token = await page.evaluate(() => localStorage.getItem("token"));

    expect(token).toBeNull();
  });

  afterAll(() => browser.close());
});