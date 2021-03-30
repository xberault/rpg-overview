import { EditCharacter } from "./editcharacter";
import {HTMLHandler} from "./htmlhandler";

export class Classes extends HTMLHandler {

    constructor(title, description, hp, ap, img) {
        super();
        this.title = title;
        this.description = description;
        this.hp = hp;
        this.ap = ap;
        this.img = img == "" ? "https://static.thenounproject.com/png/213418-200.png" : img;

    }

    static getAllClasses(page) {
        let baseHtml = HTMLHandler.loadPage(page)
        console.log(baseHtml)
        $.ajax({
            url: "http://localhost:3000/classes",
            type: "GET",
            dataType: "json",
            success: function (classes) {
                classes = classes.class // plus simple et compréhensible
                let maClass;
                $("#left").append("<ul id='class-container' class='overflow'>");
                for (let i = 0; i < classes.length; i++) {
                    console.log("base html:")
                    console.log(baseHtml)
                    maClass = new Classes(classes[i].title, classes[i].description, classes[i].hp, classes[i].ap, classes[i].img)
                    maClass.addHtml(baseHtml, page);
                }
                $("#left").append("</ul>");
            },
            error: function (req, status, err) {
                HTMLHandler.setLeft("<b>Impossible de récupérer les classes !</b>");
            }
        })


    }

    addHtml(baseHtml, page) {
        let that = this;
        let res = '<button id="bt-' + this.title + '" class="button">' +
            '<li id="class-' + this.title + '" class="card" style="width: 10rem; display: inline-block">\n' +
            '    <img class="card-img-top" src=\"' + this.img + '\" alt="Class image of ' + this.title + ' + ">\n' +
            '    <div class="card-body">\n' +
            '        <h5 class="card-title">' + this.title + ' </h5>\n' +
            //'        <p class="card-text">' + this.description + '</p>\n' +// on le mettra à droite quand on clique
            '    </div>\n' +
            '</li>'
        '        </button>\n' +

        $("#class-container").append(res)
        if(page=="classes.html")
            $("#bt-" + this.title).click(function () {
                Classes.display(that)
            })
        else if(page=="editCharacter.html")
            $("#bt-" + this.title).click(function () {
                EditCharacter.chooseClass(that)
            })
    }

    getDetails() {
        return '<li id="class-' + this.title + '" class="card" style="width: 80rem; display: inline-block; text-align:center;   ">\n' +
            '    <img class="card-img-top" style="width: 20rem;" src=\"' + this.img + '\" alt="Class image of ' + this.title + ' + ">\n' +
            '<div style="display: inline-flex; align-items: center">' +
            ` <img style="width: 4rem;" src="https://cdn1.iconfinder.com/data/icons/steaming-gaming-1/80/HP-rpg-HitPoint-HealthPoint-flask-512.png"> ` +
            `<p> ${this.hp} </p>` +
            '<img style="width: 4rem" src="https://cdn1.iconfinder.com/data/icons/steaming-gaming-1/80/mana-mp-potion-512.png">' +
            `<p>${this.ap}</p>` +
            '  </div>' +
            '    <div class="card-body  w-100">\n' +
            '        <h5 class="card-title"> <b>' + this.title + '</b> </h5>\n' +
            '        <p class="card-text">' + this.description + '</p>\n' +
            '</div>\n' +
            '</li>'
    }

    static goTo() {
        Classes.getAllClasses("classes.html");
        HTMLHandler.leftNav("classes.html");
        HTMLHandler.setRight("<h2> Select your class </h2>")
        HTMLHandler.setTitle("Classes");
    }

    static display(classe) {
        let html = classe.getDetails();
        HTMLHandler.setRight(html)
    }
}
