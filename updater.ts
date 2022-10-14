const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");
const fs = require("fs")

async function updateProperties(key, driver, translation) {
  let metas = await driver.findElements(By.xpath("//meta"));
  for (let meta of metas) {
    try {
      let prop = await meta.getAttribute("property");
      if (['og:title', 'og:description', 'og:url', 'og:image'].includes(prop)) {
        translation[prop] = await meta.getAttribute("content");
      }
      let name = await meta.getAttribute("name");
      if (['description', 'keywords'].includes(name)) {
        translation[name] = await meta.getAttribute("content");
      }
    } catch (ex) { }
  }
}

async function updateAppProperties(key, driver, translation) {
  await updateProperties(key, driver, translation);
  try {
    let value = await driver.findElement(By.xpath("//figcaption[contains(@class,'we-rating-count')]")).getText();
    translation["rating"] = value.substring(0, value.indexOf(' Bewertungen'));
  } catch (ex) {
  }
  try {
    let value = await driver.findElement(By.xpath("//picture[contains(@class,'product-hero__artwork')]/source[@type='image/png']")).getAttribute("srcset");
    translation['image'] = value.split(' ')[0];
  } catch (ex) {
  }
}

async function updatePlayProperties(key, driver, translation) {
  await updateProperties(key, driver, translation);
  try {
    let el = await driver.findElement(By.xpath("//div[@itemprop='starRating']/../.."));
    let rating = await el.findElement(By.xpath("div[1]/div[@itemprop='starRating']/div")).getText();
    let reviews = await el.findElement(By.xpath("div[2]")).getText();
    translation["rating"] = rating.substring(0, rating.indexOf('\n')) + ' • ' + reviews.substring(0, reviews.indexOf(' Rezensionen\ninfo'));
  } catch (ex) {
  }
}

async function updateWebsiteProperties(key, driver, translation) {
  await updateProperties(key, driver, translation);
  try {
    let value = await driver.findElement(By.xpath("//link[contains(@rel, 'icon')]")).getAttribute('href');
    translation["image"] = value;
  } catch (ex) {
  }
}

async function update() {

  let stores = [
    { key: "playStore", getUrl: function (id) { return `https://play.google.com/store/apps/details?id=${id}&hl=de&gl=DE` }, updateProperties: updatePlayProperties },
    { key: "appStore", getUrl: function (id) { return `https://apps.apple.com/de/app/${id}` }, updateProperties: updateAppProperties },
    { key: "web", getUrl: function (id) { return id }, updateProperties: updateWebsiteProperties }
  ];

  const de = require("./src/assets/i18n/de.json");
  for (let category of require("./src/app/services/category.json").slice(1)) {
    let items = require("./src/app/components/tab/" + category.key + ".json");
    for (let item of items) {
      let translation = de.items[item.key];
      if (!translation) {
        translation = {};
        de.items[item.key] = translation;
      }
      for (let store of stores) {
        let storeTranslation = translation[store.key];
        if (!storeTranslation) {
          storeTranslation = {};
          translation[store.key] = storeTranslation;
        }
        let storeId = item[store.key + 'Id'];
        if (storeId) {
          let url = store.getUrl(storeId);
          console.log(url);
          let driver = await new Builder().forBrowser("chrome").build();
          try {
            await driver.get(url);
            await store.updateProperties(store.key, driver, storeTranslation);
          } finally {
            await driver.quit();
          }
        }
      }
      for (let prop of ['og:title', 'image', 'description']) {
        translation[prop] = translation['appStore'][prop];
        if (!translation[prop]) {
          translation[prop] = translation['web'][prop];
        }
      }
    }
  }


  fs.writeFileSync("src/assets/i18n/de.json", JSON.stringify(de, undefined, 4), 'utf-8');

}

update()

