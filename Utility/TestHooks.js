const { Before, After, AfterAll } = require('@cucumber/cucumber')
const page = require('@playwright/test')
const { AllureRuntime } = require('allure-cucumberjs');

Before(async () => {
  let browser = await page.chromium.launch({ headless: false })
  global.browser = browser
  const context = await browser.newContext()
  global.page = await context.newPage()
})
After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
      const screenshot = await this.page.screenshot({ path: `allure-results/${scenario.pickle.name}.png` });
      this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await this.context.close();
});
AfterAll(async () => {
  await global.browser.close()
})