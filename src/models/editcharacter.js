import { Classes } from "./classes";
import { Character } from "./characters";
import { HTMLHandler } from "./htmlhandler"

export class EditCharacter extends HTMLHandler{
    
    static goTo() {
        Classes.getAllClasses("editCharacter.html")
        HTMLHandler.leftNav("editCharacter.html");
        HTMLHandler.setRight("<h2> First you must select your class </h2>")
        HTMLHandler.setTitle("Add/Edit a character");
    }

    // When a user has choosen a class
    static chooseClass(classe){
        // Treatement
        HTMLHandler.setRight(EditCharacter.createForm(classe))
        $('#img').bind('input', function() {
            $('#preview').attr('src', $(this).val());
            console.log("Bilbo")
        });
        $("#bt-validate").click(function () {
            // Verify if fields are filled
            if(EditCharacter.checkFields()) {
                let character = new Character(
                    $("#rname").val(),
                    $("#nname").val(),
                    classe.title,
                    $("#desc").val(),
                    // Inventory here
                    null,
                    $("#hp").val(),
                    $("#ap").val(),
                    $("#shield").val(),
                    $("#weight").val(),
                    $("#img").val()
                )
                console.log("Character created, sended to bd validation")
                EditCharacter.validate(character)
            }
        })
        //HTMLHandler.rightNav(createForm())
    }

    static createForm(classe){
        // Creation de tout les forms à remplir pour un Character
        let res = '<h2>You chose to play as <b>'+classe.title+'</b>' +
            '<img style="width: 80px;margin: 20px" src="' + classe.img + '" alt="Class image of ' + classe.title + '">\n' + '</h2>\n' +
            '<input type="text" id="rname" placeholder="Real Name*">\n' +
            '<input type="text" id="nname" placeholder="Character\'s Name*">\n' +
            '<input type="text" id="desc" placeholder="Description">\n' +
            '<input type="number" id="hp" placeholder="Total health*">\n' +
            '<input type="number" id="ap" placeholder="Magic power*">\n' +
            '<input type="number" id="shield" placeholder="Armor points*">\n' +
            '<input type="number" id="weight" placeholder="Maximum weight (kg)*">\n' +
            '<input type="url" id="img" placeholder="URL for character\' picture">\n' +
            '<img id="preview" style="width: 80px;height: 80px;margin: 20px" src="" alt="Image preview" onerror=\'this.src="https://png.pngtree.com/element_our/20190604/ourmid/pngtree-office-preview-file-illustration-image_1468631.jpg"\'>\n' +
            '<button id="bt-validate" class="btn btn-primary">Validate</button>\n' +
            '<div id="flash" style="margin :20px"></div>'
        

        // Creation du bouton de validation et appel de validate() au clic + creation du Character
        return res
        
        
    }

    static checkFields(){
        // Check si tout les fields sont bien remplis
        let error = false
        let flash = ""
        // Cause error
        if(!$("#rname").val()){
            flash+="<b>Real name</b>"
            error = true
        }
        if(!$("#nname").val()){
            if(error)
                flash+=", "
            flash+="<b>Character's name</b>"
            error = true
        }
        if(!$("#hp").val()){
            if(error)
                flash+=", "
            flash+="<b>Total health</b>"
            error = true
        }
        if(!$("#ap").val()){
            if(error)
                flash+=", "
            flash+="<b>Magic Power</b>"
            error = true
        }
        if(!$("#shield").val()){
            if(error)
                flash+=", "
            flash+="<b>Armor points</b>"
            error = true
        }
        if(!$("#weight").val()){
            if(error)
                flash+=", "
            flash+="<b>Maximum weight</b>"
            error = true
        }

        if(error){
            $("#flash").addClass("alert alert-danger")
            $("#flash").html(flash + " missing (* means required)")
        }
        return !error
    }

    static isNew(character){
        return true
    }

    static validate(character){
        // Si !isNew retrait de l'ancien perso
        // Ajout du personnage dans la bd
        if(!character.img)
            character.img = "https://img.icons8.com/windows/452/person-male.png"
        if(EditCharacter.isNew(character)){
            console.log("Saving...")
            character.save()
        }
        else{
            console.log("Editing...")
            character.edit()
        }
        
        // Clear form et message de confirmation (ou alors redirection vers la page du perso)
        HTMLHandler.goTo(Character)
    }
}
