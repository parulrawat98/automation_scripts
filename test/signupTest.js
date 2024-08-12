import { By, until } from "selenium-webdriver";
import { expect } from "chai";
import driver from "../webDriver.js";

describe("Form Submission Test", function () {
  this.timeout(30000); // Extend default timeout if needed

  before(async function () {
    await driver.get("https://www.automationexercise.com/login");
  });

  after(async function () {
    await driver.quit();
  });

  it("should fill out and submit the signup form successfully", async function () {
    await driver.wait(until.elementLocated(By.css(".signup-form")), 10000);

    await driver
      .findElement(By.css('[data-qa="signup-name"]'))
      .sendKeys("John Doe");
    await driver
      .findElement(By.css('[data-qa="signup-email"]'))
      .sendKeys("john.doe@example.com");

    await driver.findElement(By.css('[data-qa="signup-button"]')).click();

    // Wait for either the success message or the error message
    await driver
      .wait(
        until.elementLocated(By.css('.signup-form p[style="color: red;"]')),
        10000
      )
      .catch(() => {
        /* Catch timeout if error message does not appear */
      });

    // Check if the error message is present
    let errorMessageElement;
    try {
      errorMessageElement = await driver.findElement(
        By.css('.signup-form p[style="color: red;"]')
      );
    } catch (e) {
      errorMessageElement = null;
    }

    if (errorMessageElement) {
      // Check the error message text
      const errorMessage = await errorMessageElement.getText();
      expect(errorMessage).to.equal("Email Address already exist!");
    } else {
      // If no error message, check if the page navigated to the expected URL
    //   await driver.wait(
    //     until.urlIs("https://www.automationexercise.com/signup"),
    //     10000
    //   );
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.equal("https://www.automationexercise.com/signup");
    }
  });
});
