const { By, Builder } = require("selenium-webdriver");
require('chromedriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require("fs")

async function updateProperties(driver, data) {
  let metas = await driver.findElements(By.xpath("//meta"));
  for (let meta of metas) {
    try {
      let prop = await meta.getAttribute("property");
      if (['og:title', 'og:description', 'og:url', 'og:image'].includes(prop)) {
        data[prop] = await meta.getAttribute("content");
      }
      let name = await meta.getAttribute("name");
      if (['description', 'keywords'].includes(name)) {
        data[name] = await meta.getAttribute("content");
      }
    } catch (ex) { }
  }
}

async function updateAppProperties(driver, data) {
  await updateProperties(driver, data);
  try {
    let value = await driver.findElement(By.xpath("//figcaption[contains(@class,'we-rating-count')]")).getText();
    data["rating"] = value.substring(0, value.indexOf(' Bewertungen'));
  } catch (ex) {
    data["rating"] = 'Keine Bewertung';
  }
  try {
    let sources = await driver.findElements(By.xpath("//picture[contains(@class,'product-hero__artwork')]/source"));
    for (let source of sources) {
      let type = await source.getAttribute('type');
      console.log(type);
      if (['image/png', 'image/jpeg'].includes(type)) {
        let srcset = await source.getAttribute("srcset");
        data['image'] = srcset.split(' ')[0];
        break;
      }
    }
  } catch (ex) {
    console.log(ex);
  }
}

async function updatePlayProperties(driver, data) {
  await updateProperties(driver, data);
  try {
    let el = await driver.findElement(By.xpath("//div[@itemprop='starRating']/../.."));
    let rating = await el.findElement(By.xpath("div[1]/div[@itemprop='starRating']/div")).getText();
    let reviews = await el.findElement(By.xpath("div[2]")).getText();
    data["rating"] = rating.substring(0, rating.indexOf('\n')) + ' • ' + reviews.substring(0, reviews.indexOf(' Rezensionen\ninfo'));
  } catch (ex) {
    data["rating"] = 'Keine Bewertung';
  }
}

async function updateWebsiteProperties(driver, data) {
  await updateProperties(driver, data);
  let icons = await driver.findElements(By.xpath("//link[contains(@rel, 'icon')]"));
  data["images"] = [];
  for (let icon of icons) {
    try {
      data["images"].push(await icon.getAttribute('href'));
    } catch (ex) {
    }
  }
  try {
    data["title"] = await driver.getTitle();
  } catch (ex) {
  }
}

async function update() {

  let stores = [
    { key: "playStore", getUrl: function (id) { return `https://play.google.com/store/apps/details?id=${id}&hl=de&gl=DE` }, updateProperties: updatePlayProperties },
    { key: "appStore", getUrl: function (id) { return `https://apps.apple.com/de/app/${id}` }, updateProperties: updateAppProperties },
    { key: "web", getUrl: function (id) { return id }, updateProperties: updateWebsiteProperties }
  ];
  let data = [];
  for (let category of require("./src/app/services/category.json").slice(3, 4)) {
    let items = require("./src/app/components/tab/" + category.key + ".json");
    for (let item of items) {
      let d = { "key": item.key };
      data.push(d);
      for (let store of stores) {
        let storeId = item[store.key + 'Id'];
        if (storeId) {
          let storeData = {};
          d[store.key] = storeData;
          let url = store.getUrl(storeId);
          let driver = await new Builder()
            .forBrowser("chrome")
            //.setChromeOptions(new chrome.Options().headless())
            .build();

          console.log(url);
          try {
            await driver.get(url);
            await store.updateProperties(driver, storeData);
          } catch (ex) {
            console.log(ex);
          } finally {
            console.log('quit', url);
            await driver.quit();
          }
        }
      }
    }
  }
  fs.writeFileSync("src/assets/i18n/data.json", JSON.stringify(data, undefined, 4), 'utf-8');
}

update()

