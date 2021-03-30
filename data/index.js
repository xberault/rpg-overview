const classes = require('./class.json');
const items = require('./items.json');
const players = require('./player.json');
const inventory = require('./inventory.json');
// Something more

module.exports = () => ({

  classes: classes,
  items: items,
  players : players,
  inventory : inventory,
});
