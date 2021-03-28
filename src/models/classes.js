
import { HTMLHandler } from "./htmlhandler";
export class Classes extends HTMLHandler{

    static getAllClasses(){
        $.ajax({
            url: "http://localhost:3000/classes",
            type: "GET",
            dataType: "json",
            success: function(classes) {
                classes = classes.class // plus simple et compréhensible
                console.log(JSON.stringify(classes));
                for(let i=0; i<classes.length;i++){
                    console.log("Bienvenue");
                    $('#classes')
                    .append($('<li>')
                    .append($('<a>')
                        .text(classes[i].title)
                        )
                    );
                }
            },
            error: function(req, status, err) {
                $("#classes").html("<b>Impossible de récupérer les classes !</b>");
            }
        })


    }

    static goTo(){
        Classes.getAllClasses();
        HTMLHandler.leftNav("classes.html");
        HTMLHandler.setTitle("Classes");
    }
}