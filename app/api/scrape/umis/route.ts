import { NextResponse } from "next/server";

import puppeteer from "puppeteer-core";

import {
  UNNEEDED_RESOURCE_TYPES,
  UEAB_UMIS_LOGIN_URL,
  USERNAME_INPUT_SELECTOR,
  PASSWORD_INPUT_SELECTOR,
  SUBMIT_BUTTON_SELECTOR,
} from "./constants";

import { fetchResourcesData } from "./functions";

export async function POST(request: Request) {
  console.time("POST request");
  const { username, password, resourcesToFetch } = await request.json();

  // return NextResponse.json({ username, password, resourcesToFetch });
  console.log(`username: ${username}, password: ${password}`);
  let browser;
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint:
        "wss://chrome.browserless.io?token=" +
        process.env.BROWSERLESS_API_TOKEN,
      ignoreHTTPSErrors: true, // Set this to true to ignore SSL errors
    });

    console.log("Browser connected.");

    const page = await browser.newPage();

    console.log("new Page object created.");

    // Enable request interception
    await page.setRequestInterception(true);

    // Intercept network requests
    page.on("request", (request) => {
      const resourceType = request.resourceType();

      // Block requests for CSS, media, and JavaScript files
      if (UNNEEDED_RESOURCE_TYPES.includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Visit the UMIS login page
    await page.goto(UEAB_UMIS_LOGIN_URL);

    console.log("login Page loaded.");

    //check if already logged in here
    const isAlreadyLoggedIn = await page.$('a[href="logout.jsp?logoff=yes"]');

    if (isAlreadyLoggedIn) {
      console.log("Already logged in.");
    } else {
      // Fill in username and password
      await page.type(USERNAME_INPUT_SELECTOR, username as string);
      await page.type(PASSWORD_INPUT_SELECTOR, password as string);

      // Click the submit button
      await Promise.all([
        page.waitForNavigation(),
        page.click(SUBMIT_BUTTON_SELECTOR),
      ]);
    }
    // Now, use page.evaluate and pass the fetching function as an argument
    const result = await page.evaluate(
      fetchResourcesData as any,
      resourcesToFetch
    );

    console.log("Result:");

    console.log(result);

    console.timeEnd("POST request");

    return NextResponse.json(result);

    // await browser.close();
  } catch (error) {
    await browser?.close();
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
