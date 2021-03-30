import {HTMLHandler} from "./htmlhandler";

export class Inventory {
    constructor(player, items = [], armor = []) {
        this.player = player;
        this.items = items;
        this.armor = armor
    }

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
                    category.forEach(item => {
                        if (tmpNamesItems.includes(item[1].title)){
                            console.log(item[1].title)
                            player.inventory.items.push(item[1])
                        }
                        else if (tmpNamesArmor.includes(item[1]))
                            player.inventory.armor.push(item[1])
                    })
                })
            })
        })
        console.log(player.inventory)
    }

}

function itemToPlayer(item) {
    return item.item
}