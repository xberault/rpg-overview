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

    static getAllClasses() {
        let baseHtml = HTMLHandler.loadPage("classes.html")
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
                    maClass.addHtml(baseHtml);
                }
                $("#left").append("</ul>");
            },
            error: function (req, status, err) {
                HTMLHandler.setLeft("<b>Impossible de récupérer les classes !</b>");
            }
        })


    }

    addHtml(baseHtml) {

        let res = '<li id="class-' + this.title + '" class="card" style="width: 10rem; display: inline-block">\n' +
            '    <img class="card-img-top" src=\"' + this.img + '\" alt="Class image of ' + this.title + ' + ">\n' +
            '    <div class="card-body">\n' +
            '        <h5 class="card-title">' + this.title + ' </h5>\n' +
            '        <p class="card-text">' + this.description + '</p>\n' +
            '        <a href="#class-' + this.title + ' " class="stretched-link"></a>\n' +
            '    </div>\n' +
            '</li>'

        $("#class-container").append(res)

    }

    static goTo() {
        Classes.getAllClasses();
        HTMLHandler.leftNav("classes.html");
        HTMLHandler.setTitle("Classes");
    }
}
