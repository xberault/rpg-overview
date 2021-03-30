import { Classes } from "./classes";
import { Character } from "./characters";
import { HTMLHandler } from "./htmlhandler"

export class EditCharacter extends HTMLHandler{

    constructor(isNew = true){
        this.isNew = isNew;
    }


    
    static goTo() {
        Classes.getAllClasses("editCharacter.html")
        HTMLHandler.leftNav("editCharacter.html");
        HTMLHandler.setRight("<h2> First you must select your class </h2>")
        HTMLHandler.setTitle("Add/Edit a character");
    }

    // When a user has choosen a class
    static chooseClass(classe){
        // Treatement
        HTMLHandler.setRight(EditCharacter.createForm(classe.title))
        //HTMLHandler.rightNav(createForm())
    }

    static createForm(classTitle){
        let res = '<h2>You chose to play as <b>'+classTitle+'</b></h2>' +
            '<input type="text" id="fname" placeholder="First Name">' +
            '<input type="text" id="lname" placeholder="Last Name">'
        return res
        // Creation de tout les forms à remplir pour un Character
        // Creation du bouton de validation et appel de validate() au clic + creation du Character
    }

    static validate(character){
        // Si !isNew retrait de l'ancien perso
        // Ajout du personnage dans la bd
        // Clear form et message de confirmation (ou alors redirection vers la page du perso)

        
    }
}
