import puppeteer, { Browser, Page } from "puppeteer";
import AxiosNetworkAdapter from "../adapters/network/AxiosNetworkAdapter";

describe("GoalList.tsx", () => {
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

  it("Has 2 rows", async () => {
    await page.goto("http://localhost:3000/doelstellingen");
    await page.waitForSelector(".table-row");
    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(3);
    expect(rows[0]).toBe("Afvallen");
    expect(rows[1]).toBe("Geld Besparen");
    expect(rows[1]).toBe("ADMIN");
  });

  it("After delete 2 rows", async () => {
    await page.goto("http://localhost:3000/doelstellingen");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.trash.table-row-button')[0] as HTMLElement).click();
    });

    await page.waitForTimeout(200);

    const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

    expect(rows.length).toBe(2);
    expect(rows[0]).toBe("Geld Besparen");
  });

  // it("Delete on role with users gives error", async () => {
  //   await page.goto("http://localhost:3000/rollen");
  //   await page.waitForSelector(".table-row");

  //   await page.evaluate(() => {
  //     (document.querySelectorAll('button.trash.table-row-button')[0] as HTMLElement).click();
  //   });

  //   await page.waitForSelector(".Toastify__progress-bar--error");

  //   const errorText = await page.$eval(".Toastify__toast-body", (el:any) => el.innerText);

  //   expect(errorText).toBe("Er zitten gebruikers aan deze rol en kan daarom niet verwijderd worden!");

  //   const rows = await page.evaluate(() => Array.from(document.querySelectorAll(".table-row")).map((el:any) => el.innerText));

  //   expect(rows.length).toBe(1);
  //   expect(rows[0]).toBe("Beheerder");
  // })

  it("Update goes to update page", async () => {
    await page.goto("http://localhost:3000/doelstellingen");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('button.edit.table-row-button')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/doelstellingen/wijzigen/2")
  });

  it("Detail goes to detail page", async () => {
    await page.goto("http://localhost:3000/doelstellingen");
    await page.waitForSelector(".table-row");

    await page.evaluate(() => {
      (document.querySelectorAll('.table-row-grey-section')[0] as HTMLElement).click();
    });
    
    expect(page.url()).toBe("http://localhost:3000/doelstellingen/2")
  })

  afterAll(() => browser.close());
});