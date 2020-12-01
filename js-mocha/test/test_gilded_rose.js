var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

  const spendDaysInShop = function (shop, days) {
    var items;
    for (var i = 0; i < days; i++) {
      items = shop.updateQuality();
    }
    return items;
  };

  it("At the end of each day sell in value of each item must be lowered by 1", function () {
    const gildedRose = new Shop([new Item("Pancake", 2, 10)]);
    const items = spendDaysInShop(gildedRose, 1);
    expect(items[0].sellIn).to.equal(1);
  });

  it("At the end of each day quality of each item must be lowered by 1", function () {
    const gildedRose = new Shop([new Item("Pancake", 2, 10)]);
    const items = spendDaysInShop(gildedRose, 1);
    expect(items[0].quality).to.equal(9);
  });

  it("Once sell by date has passed, Quality degrades twice as fast", function () {
    const gildedRose = new Shop([new Item("Pancake", 1, 10)]);
    const items = spendDaysInShop(gildedRose, 2);
    expect(items[0].quality).to.equal(7);
  });

  it("Quality of an item is never negative", function () {
    const gildedRose = new Shop([new Item("Pancake", 1, 1)]);
    const items = spendDaysInShop(gildedRose, 2);
    expect(items[0].quality).to.not.lessThan(0);
  });

  it("Aged Brie increases in quality the older it gets", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 5)]);
    const items = spendDaysInShop(gildedRose, 1);
    expect(items[0].quality).to.equal(6);
  });

  it("The quality of an item is never more than 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 49)]);
    const items = spendDaysInShop(gildedRose, 2);
    expect(items[0].quality).to.not.greaterThan(50);
  });

  it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = spendDaysInShop(gildedRose, 2);
    expect(items[0].quality).to.equal(80);
  });

  it("'Backstage passes' quality increases by 2 when there are 10 days or less", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    const items = spendDaysInShop(gildedRose, 2);
    expect(items[0].quality).to.equal(14);
  });

  xit("'Backstage passes' quality drops to 0 after the concert", function () { // concert?
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 10)]);
    const items = spendDaysInShop(gildedRose, 2);
    expect(items[0].quality).to.equal(0);
  });

  it("'Backstage passes' quality increases by 1 when sell in date is above 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
    const items = spendDaysInShop(gildedRose, 1);
    expect(items[0].quality).to.equal(11);
  });

  it("'Backstage passes' quality never goes above 50", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = spendDaysInShop(gildedRose, 1);
    expect(items[0].quality).to.not.greaterThan(50);
  });

  it("'Conjured' items degrade in quality twice as fast as normal items", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 10, 10)]);
    const items = spendDaysInShop(gildedRose, 1);
    expect(items[0].quality).to.not.greaterThan(8);
  });

});
