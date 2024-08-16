import { By, until } from "selenium-webdriver";
import { expect } from "chai";
import driver from "../webDriver.js";
import * as ah from "./utils/automationHelper.js";

describe("New user signup test", function () {
  this.timeout(30000); // Extend default timeout if needed

  before(async function () {
    await driver.get("https://www.automationexercise.com/login");
  });

  after(async function () {
    await driver.quit();
  });

  const username = ah.getRandomUsername();
  const email = ah.getRandomEmail(username);

  it("should not submit the form if required fields are empty", async function () {
    await driver.findElement(By.css('[data-qa="signup-name"]')).clear();
    await driver.findElement(By.css('[data-qa="signup-email"]')).clear();
    await driver.findElement(By.css('[data-qa="signup-button"]')).click();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("https://www.automationexercise.com/login");
  });

  it("should display an error if the email already exists", async function () {
    await driver.findElement(By.css('[data-qa="signup-name"]')).sendKeys("John Doe");
    await driver.findElement(By.css('[data-qa="signup-email"]')).sendKeys("test@mail.com");
    await driver.findElement(By.css('[data-qa="signup-button"]')).click();

    const errorMessage = await driver.findElement(By.css('.signup-form p[style="color: red;"]')).getText();
    expect(errorMessage).to.equal("Email Address already exist!");
  });

  it("should submit the new user form successfully with valid data", async function () {
    await driver.findElement(By.css('[data-qa="signup-name"]')).clear();
    await driver.findElement(By.css('[data-qa="signup-email"]')).clear();
    await driver.findElement(By.css('[data-qa="signup-name"]')).sendKeys(username);
    await driver.findElement(By.css('[data-qa="signup-email"]')).sendKeys(email);
    await driver.findElement(By.css('[data-qa="signup-button"]')).click();
    await driver.wait(until.urlIs("https://www.automationexercise.com/signup"), 10000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("https://www.automationexercise.com/signup");
  });

  it("should enter the account information and submit the signup form successfully", async function () {
    const radioElement = await driver.findElement(By.css('.clearfix'));
    const genderRadios = await radioElement.findElements(By.css('[type="radio"]'));
    const randomIndex = Math.floor(Math.random() * genderRadios.length);
    await genderRadios[randomIndex].click();

    await driver.findElement(By.css('[data-qa="name"]')).sendKeys(username);
    await driver.findElement(By.css('[data-qa="password"]')).sendKeys(`${username}+@1234`);

    const [day, month, year] = ah.getRandomDate().split("/");
    await driver.findElement(By.css('[data-qa="days"]')).sendKeys(day);
    await driver.findElement(By.css('[data-qa="months"]')).sendKeys(month);
    await driver.findElement(By.css('[data-qa="years"]')).sendKeys(year);

    await driver.findElement(By.css('[data-qa="first_name"]')).sendKeys("John");
    await driver.findElement(By.css('[data-qa="last_name"]')).sendKeys("Doe");
    await driver.findElement(By.css('[data-qa="company"]')).sendKeys("Acme Inc.");
    await driver.findElement(By.css('[data-qa="address"]')).sendKeys("123 Main St");
    await driver.findElement(By.css('[data-qa="address2"]')).sendKeys("Apartment 1");

    const countrySelect = await driver.findElement(By.css('select[data-qa="country"]'));
    const countryOptions = await countrySelect.findElements(By.css("option"));
    const randomCountryIndex = Math.floor(Math.random() * countryOptions.length);
    await countryOptions[randomCountryIndex].click();

    await driver.findElement(By.css('[data-qa="state"]')).sendKeys("California");
    await driver.findElement(By.css('[data-qa="city"]')).sendKeys("Los Angeles");
    await driver.findElement(By.css('[data-qa="zipcode"]')).sendKeys(ah.getPincode());
    await driver.findElement(By.css('[data-qa="mobile_number"]')).sendKeys(ah.getMobileNumber());
    await driver.findElement(By.css('[data-qa="create-account"]')).click();
    await driver.wait(until.urlIs("https://www.automationexercise.com/account_created"), 10000);

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("https://www.automationexercise.com/account_created");
  });
});
