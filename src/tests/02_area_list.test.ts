import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("AreaList.tsx", () => {
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

  it("Has 3 rows", async () => {
    await page.goto("http://localhost:3000/gebieden");
    await page.waitForSelector(".table-row");
    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(3);
    expect(rows[0]).toBe("Nijmegen");
    expect(rows[1]).toBe("Wageningen");
    expect(rows[2]).toBe("Utrecht");
  });

  it("vlgnr:10 After delete 2 rows", async () => {
    await page.goto("http://localhost:3000/gebieden");

    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.trash.table-row-button')[0] as HTMLElement).click();
    });

    await page.waitForSelector(".table-row");

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(2);
    expect(rows[0]).toBe("Wageningen");
    expect(rows[1]).toBe("Utrecht");
  });

  it("Update goes to update page", async () => {
    await page.goto("http://localhost:3000/gebieden");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.edit.table-row-button')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/gebieden/wijzigen/2")
  });

  it("Detail goes to detail page", async () => {
    await page.goto("http://localhost:3000/gebieden");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('.table-row-grey-section')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/gebieden/2")
  });

  afterAll(() => browser.close());
});