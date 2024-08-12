import { Builder } from 'selenium-webdriver';

const driver = new Builder()
    .forBrowser('chrome')
    .build();

export default driver;