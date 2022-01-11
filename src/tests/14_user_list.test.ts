import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("UserList.tsx", () => {
  let browser : Browser;
  let page : Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    const response = await new AxiosNetworkAdapter().post("/auth", {"username": "E2E", "password": "E2E"});
    const token = response.data.token;
    await page.evaluate(async (token) => {
      localStorage.setItem("token", token);
    }, token);
  });

  it("Has 5 rows", async () => {
    await page.goto("http://localhost:3000/gebruikers");
    await page.waitForSelector(".table-row");
    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(5);
    expect(rows[0]).toBe("Ivan\nTestRol2");
    expect(rows[1]).toBe("wur\nTestRol2");
    expect(rows[2]).toBe("Bart\nTestRol2");
    expect(rows[3]).toBe("Tim\nTestRol2");
    expect(rows[4]).toBe("E2E\nTestRol2");
  });

  it("vlgnr:64 After delete 4 rows", async () => {
    await page.goto("http://localhost:3000/gebruikers");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.trash.table-row-button')[0] as HTMLElement).click();
    });

    await page.waitForTimeout(200);

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(4);
    expect(rows[0]).toBe("wur\nTestRol2");
    expect(rows[1]).toBe("Bart\nTestRol2");
    expect(rows[2]).toBe("Tim\nTestRol2");
    expect(rows[3]).toBe("E2E\nTestRol2");
  });

  it("Update goes to update page", async () => {
    await page.goto("http://localhost:3000/gebruikers");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.edit.table-row-button')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/gebruikers/wijzigen/2");
  });

  it("Detail goes to detail page", async () => {
    await page.goto("http://localhost:3000/gebruikers");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('.table-row-grey-section')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/gebruikers/2");
  });

  afterAll(() => browser.close());
});