import {HTMLHandler} from "./htmlhandler";

/**
 * Inventory of player / character
 */
export class Inventory {
    constructor(player, items = [], armor = []) {
        this.player = player;
        this.items = items; // all items carried by characters
        this.armor = armor; // armor equipped
    }

    /**
     * define iventory of a player
     * @param player to set the inventory
     */
    static setAllItem(player) {
        let tmpItems = [];
        let tmpArmor = [];

        HTMLHandler.sendRequest("http://localhost:3000/inventory", "GET", (data) => {

            data.inv.forEach(item => {
                if (item.player == player.name)
                    tmpItems.push(item)
            })
            data.armor.forEach(item => {
                if (item.player == player.name)
                    tmpArmor.push(item)
            })
        }).then(() => {
            HTMLHandler.sendRequest("http://localhost:3000/items", "GET", (data) => {
                let tmpNamesItems = tmpItems.map(itemToPlayer)
                let tmpNamesArmor = tmpArmor.map(itemToPlayer)
                Object.entries(data).forEach(category => {
                    category.forEach(items => {
                        for (let item of items) {
                            if (typeof item === 'string')
                                return;
                            if (tmpNamesItems.includes(item.title))
                                player.inventory.items.push(item)
                            else if (tmpNamesArmor.includes(item.title))
                                player.inventory.armor.push(item)
                        }

                    })

                })
            })
        })
    }
}

/**
 * @param {Object} item
 * @returns {String} return item name
 */
function itemToPlayer(item) {
    return item.item
}