const { Before, After, AfterAll } = require('@cucumber/cucumber')
const { chromium } = require('playwright');
const { AllureRuntime } = require('allure-cucumberjs');

Before(async () => {
  let browser = await page.chromium.launch({ headless: true })
  global.browser = browser

  global.context = await browser.newContext();
  global.page = await context.newPage();

  this.context = global.context;
  this.page = global.page;
})
After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
      const screenshot = await this.page.screenshot({ path: `allure-results/${scenario.pickle.name}.png` });
      this.attach(screenshot, 'image/png');
  }
  if(this.page) await this.page.close();
  if(this.context) await this.context.close();
});
AfterAll(async () => {
  if(global.browser)await global.browser.close();
})