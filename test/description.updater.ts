const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
const fs = require("fs")

async function update() {

  let driver = await new Builder().forBrowser("chrome").build();

  const de = require("../src/assets/i18n/de.json");
  for (let category of require("../src/app/services/category.json").slice(1, 3)) {
    for (let item of require("../src/app/components/tab/" + category.key + ".json")) {
      let translation = de.items[item.key];
      if (translation && translation["description"] && translation["keywords"]) {
        continue;
      }
      if (!translation) {
        translation = {};
        de.items[item.key] = translation;
      }
      await driver.get(item.web);
      try {
        let description = await driver.findElement(By.xpath("//meta[@name='description']")).getAttribute("content");
        if (description.length >= 20) {
          translation["description"] = description;
        } else {
          try {
            let description = await driver.findElement(By.xpath("//h1")).getText();
            if (description.length >= 20) {
              translation["description"] = description;
            }
          } catch (ex) {
          }
        }
      } catch (ex) {
      }
      try {
        let keywords = await driver.findElement(By.xpath("//meta[@name='keywords']")).getAttribute("content");
        if (keywords.length > 0) {
          translation["keywords"] = keywords;
        }
      } catch (ex) {
      }
    }
  }

  await driver.quit();

  fs.writeFileSync('src/assets/i18n/de.json', JSON.stringify(de, undefined, 4), 'utf-8');

}

update()

