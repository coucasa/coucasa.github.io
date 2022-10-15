const fs = require("fs")

function reconciliate() {

  let de = require("./src/assets/i18n/de.json");
  let data = require("./src/assets/i18n/data.json");
  for (let d of data) {
    let item = de.items[d.key];
    delete item.appStore;
    delete item.playStore;
    delete item.web;
    delete item['og:title'];
    if (d.appStore) {
      item.title = d.appStore['og:title'];
      item.image = d.appStore['image'];
      item.description = d.appStore['og:description'];
      item.appStore = { "rating": d.appStore['rating'], "url": d.appStore['og:url'] };
    }
    if (d.playStore) {
      item.playStore = { "rating": d.playStore['rating'], "url": d.playStore['og:url'] };
    }
    if (!item.title) {
      item.title = d.web['og:title'];
    }
    if (!item.image) {
      item.image = d.web['image'];
    }
    if (!item.description) {
      item.description = d.web['og:description'];
    }
    if (d.key == 'paybackpanel') {
      let toCopy;
      for (toCopy of data) {
        if (toCopy.key == 'payback') {
          break;
        }
      }
      item.title = 'PAYBACK Online Panel';
      item.image = toCopy.appStore['image'];
      item.description = 'Das PAYBACK Online Panel ist eine Gemeinschaft von PAYBACK Kunden, die an Online-Umfragen teilnehmen können. Sie können nur Mitglied werden, indem Sie von PAYBACK zur Teilnahme am PAYBACK Online Panel persönlich eingeladen werden.';
    }
  }
  fs.writeFileSync("src/assets/i18n/de.json", JSON.stringify(de, undefined, 4), 'utf-8');
}

reconciliate()

