import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("InterventionList.tsx", () => {
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

  it("Has 8 rows", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");
    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(8);
    expect(rows[0]).toBe("Volkoren brood\ncommando");
    expect(rows[1]).toBe("Salade\ncommando");
    expect(rows[2]).toBe("Fruitteler\ncommando");
    expect(rows[3]).toBe("Kerk\nvraag");
    expect(rows[4]).toBe("Bami\nvraag");
    expect(rows[5]).toBe("Water\nvraag");
    expect(rows[6]).toBe("Wiskunde quiz\nvragenlijst");
    expect(rows[7]).toBe("Konijnen\nvragenlijst");
  });

  it("vlgnr:27 After command delete 7 rows", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.trash.table-row-button')[0] as HTMLElement).click();
    });

    await page.waitForTimeout(200);

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(7);
    expect(rows[0]).toBe("Salade\ncommando");
    expect(rows[1]).toBe("Fruitteler\ncommando");
    expect(rows[2]).toBe("Kerk\nvraag");
    expect(rows[3]).toBe("Bami\nvraag");
    expect(rows[4]).toBe("Water\nvraag");
    expect(rows[5]).toBe("Wiskunde quiz\nvragenlijst");
    expect(rows[6]).toBe("Konijnen\nvragenlijst");
  });

  it("Command Update goes to update page", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.edit.table-row-button')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/interventies/commando/wijzigen/2")
  });

  it("Command Details goes to details page", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('.table-row-grey-section')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/interventies/commando/2")
  });

  it("Question Detail goes to detail page", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('.table-row-grey-section')[2] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/interventies/vraag/4")
  });

  it("Question Update goes to update page", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.edit.table-row-button')[2] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/interventies/vraag/wijzigen/4")
  });

  it("vlgnr:34 After question delete 6 rows", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.trash.table-row-button')[2] as HTMLElement).click();
    });

    await page.waitForTimeout(200);

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(6);
    expect(rows[0]).toBe("Salade\ncommando");
    expect(rows[1]).toBe("Fruitteler\ncommando");
    expect(rows[2]).toBe("Bami\nvraag");
    expect(rows[3]).toBe("Water\nvraag");
    expect(rows[4]).toBe("Wiskunde quiz\nvragenlijst");
    expect(rows[5]).toBe("Konijnen\nvragenlijst");
  });

  it("Questionaire Detail goes to detail page", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('.table-row-grey-section')[4] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/interventies/vragenlijst/7")
  });

  it("Questionaire Update goes to update page", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.edit.table-row-button')[4] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/interventies/vragenlijst/wijzigen/7")
  });

  it("vlgnr:41 After questionaire delete 5 rows", async () => {
    await page.goto("http://localhost:3000/interventies");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.trash.table-row-button')[4] as HTMLElement).click();
    });

    await page.waitForTimeout(200);

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(5);
    expect(rows[0]).toBe("Salade\ncommando");
    expect(rows[1]).toBe("Fruitteler\ncommando");
    expect(rows[2]).toBe("Bami\nvraag");
    expect(rows[3]).toBe("Water\nvraag");
    expect(rows[4]).toBe("Konijnen\nvragenlijst");
  });

  afterAll(() => browser.close());
});