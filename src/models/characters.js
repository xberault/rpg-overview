import {HTMLHandler} from "./htmlhandler";
import {Classes} from "./classes";

export class Character extends HTMLHandler {
    constructor(name, nickname, classe, description, inventory, hp, ap, shield, weight, img) {
        super();
        this.name = name;
        this.nickname = nickname;
        this.classe = classe;
        this.description = description;
        //this.inventory = inventory;
        this.hp = hp;
        this.ap = ap;
        this.shield = shield;
        this.weight = weight;
        this.img = img;
        console.log("inventory: " )
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

    static display(character){
        // let html = character.getDetails();
        HTMLHandler.setRight(character.name)
    }

    static buildCharacters(data) {
        let players = data.player;
        $("#left").append("<ul id='character-container' class='overflow'>");
        for (let p of players)
            new Character(p.name, p.nickname, p.class, p.description, p.inventory, p.hp, p.ap, p.shield, p.weight, p.img).addHtml();
        $("#left").append("</ul>")

    }

    toDict(){
        return {"name":this.name, "nickname": this.nickname, "classe": this.classe, "description":this.description, "hp": this.hp, "ap": this.ap, "shield": this.shield, "weight": this.weight, "img":this.img}
    }

    save(){
        //$.post("http://localhost:3000/players",this)
        $.ajax({
            url: "http://localhost:3000/players",
            type: "POST",
            dataType: "json",
            data: this
        })
    }

    edit(){
        // Soit get du character existant suppresion puis save du nouveau
        // Soit put des edits (a première vue faut un id dans l'objet)
    }
}