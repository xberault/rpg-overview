import {HTMLHandler} from "./htmlhandler";
import {Classes} from "./classes";
import {Inventory} from "./inventory";

export class Character extends HTMLHandler {
    constructor(name, nickname, classe, description, inventory, hp, ap, shield, weight, img) {
        super();
        this.name = name;
        this.nickname = nickname;
        this.classe = classe;
        this.description = description;
        this.hp = hp;
        this.ap = ap;
        this.shield = shield;
        this.weight = weight;
        this.img = img;
        this.armor = [];

        if (inventory == null)
            this._defineInventory()
        else
            this.inventory = inventory;
        console.log("inventory: ")
        console.log(inventory)
    }


    static goTo() {
        HTMLHandler.leftNav("characters.html");
        HTMLHandler.setTitle("Characters");
        Character.getAllCharacters()
        HTMLHandler.setRight("<h2>Select your player</h2>")
    }


    static getAllCharacters() {
        let characters = HTMLHandler.sendRequest("http://localhost:3000/players", "GET", Character.buildCharacters)
    }

    addHtml() {
        let that = this;
        let res = '<button id="bt-' + this.name + '" class="button">' +
            '<li id="class-' + this.name + '" class="card" style="width: 10rem; display: inline-block">\n' +
            '    <img class="card-img-top" src=\"' + this.img + '\" alt="Character image of ' + this.name + '">\n' +
            '    <div class="card-body">\n' +
            '        <h5 class="card-title">' + this.name + ' </h5>\n' +
            //'        <p class="card-text">' + this.description + '</p>\n' +// on le mettra à droite quand on clique
            '    </div>\n' +
            '</li>'
        '        </button>\n' +

        $("#character-container").append(res)
        $("#bt-" + this.name).click(function () {
            Character.display(that)
        })
    }

    static display(character) {
        // let html = character.getDetails();
        HTMLHandler.setRight(character.getDetails());
    }


    getDetails() {
        let res = "";
        res += this.getInventoryDetails()
        return res;
    }

    static buildCharacters(data) {
        let players = data.player;
        $("#left").append("<ul id='character-container' class='overflow'>");
        for (let p of players)
            new Character(p.name, p.nickname, p.class, p.description, p.inventory, p.hp, p.ap, p.shield, p.weight, p.img).addHtml();
        $("#left").append("</ul>")

    }

    getInventoryDetails() {

        let res = `<div class="w-100">
                        <div class="w-100">
                            <div class="card-heading clearfix">
                                <h4 class="card-title">${this.name}</h4>
                            </div>
                            <div class="card-body">
                                <div class="team">`
        res += `<div> <h3> Armor </h3> `
        console.log("les armures: ")
        console.log(this.inventory.armor)
        for (let item of this.inventory.armor) {
            res += `<div class="team-member">
                <img src="${item.img}" alt="" />
                </div>`
        }
        res += "</div>"

        res += `<div> <h3> Items </h3> `
        for (let item of this.inventory.items) {
            res += `<div class="team-member">
                <img src="${item.img}" alt="" />
                </div>`
        }
        res += "</div>"

        return res + "</div> </div> </div>"


    }

    _defineInventory() {
        this.inventory = new Inventory(this);
        Inventory.setAllItem(this)
    }

}