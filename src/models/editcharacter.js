import {Classes} from "./classes";
import {Character} from "./characters";
import {HTMLHandler} from "./htmlhandler"

/**
 * Allow to edit or create a character
 */
export class EditCharacter extends HTMLHandler {

    /**
     * Allow to navigate to Add/Edit character page
     */
    static goTo() {
        Classes.getAllClasses("editCharacter.html")
        HTMLHandler.leftNav("editCharacter.html");
        HTMLHandler.setRight("<h2> First you must select your class </h2>")
        HTMLHandler.setTitle("Add/Edit a character");
    }

    /**
     * When a user choose the class for his character
     * @param {Classe} classe the 'classe' of the new character or the existing one
     */
    static chooseClass(classe) {
        // Display form of the character on the right of the page
        HTMLHandler.setRight(EditCharacter.createForm(classe))
        // Bind the picture URL to the image preview
        $('#img').bind('input', function () {
            $('#preview').attr('src', $(this).val());
        });
        // On click "Validate" check the fields and create character
        $("#bt-validate").click(function () {
            // Verify if fields are filled
            if (EditCharacter.checkFields()) {
                // Create new character
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
                // Send the new character to validation
                EditCharacter.validate(character)
            }
        })
    }

    /**
     * Give the form corresponding to the "classe" the user has chosen
     * @param {Classe} classe the "classe" that the user has chosen
     * @returns {String} html code for the right of the page
     */
    static createForm(classe) {
        // Creation of all fields to allow Character creation
        return '<h2>You chose to play as <b>' + classe.title + '</b>' +
            '<img style="width: 80px;margin: 20px" src="' + classe.img + '" alt="Class image of ' + classe.title + '">\n' + '</h2>\n' +
            '<div class="container"><div class="row input-group" style="margin:10px">' +
            '<input class="form-control col" type="text" id="rname" placeholder="Real Name*">\n' +
            '<input class="form-control col" type="text" id="nname" placeholder="Character\'s Name*">\n' +
            '<input class="form-control col" type="number" id="hp" placeholder="Total health*">\n' +
            '<input class="form-control col" type="number" id="ap" placeholder="Magic power*">\n' +
            '<input class="form-control col" type="number" id="shield" placeholder="Armor points*">\n' +
            '<input class="form-control col" type="number" id="weight" placeholder="Maximum weight*"></div>\n' +
            '<div class="row input-group" style="margin:10px"><textarea class="col form-control" id="desc" placeholder="Description"></textarea></div>\n' +
            '<div class="row input-group" style="margin:10px"><input class="col form-control" type="url" id="img" placeholder="URL for character\'s picture">\n' +
            '<img id="preview" style="width: 80px;height: 80px;margin: 20px" src="" alt="Image preview" onerror=\'this.src="https://png.pngtree.com/element_our/20190604/ourmid/pngtree-office-preview-file-illustration-image_1468631.jpg"\'></div>\n' +
            '<button id="bt-validate" class="btn btn-primary">Validate</button>\n' + '</div>' +
            '<div id="flash" style="margin :20px"></div>'
    }

    /**
     * Allow display of alerts if there is a required information missing otherwise it allows character creation process to continue
     * @returns {Boolean} true if the informations has been correctly given false is there is a required information missing
     */
    static checkFields() {
        // No error spotted by default
        let error = false
        // Error message initialization
        let flash = ""
        // Required missing information treatement
        if (!$("#rname").val()) {
            flash += "<b>Real name</b>"
            error = true
        }
        if (!$("#nname").val()) {
            if (error)
                flash += ", "
            flash += "<b>Character's name</b>"
            error = true
        }
        if (!$("#hp").val()) {
            if (error)
                flash += ", "
            flash += "<b>Total health</b>"
            error = true
        }
        if (!$("#ap").val()) {
            if (error)
                flash += ", "
            flash += "<b>Magic Power</b>"
            error = true
        }
        if (!$("#shield").val()) {
            if (error)
                flash += ", "
            flash += "<b>Armor points</b>"
            error = true
        }
        if (!$("#weight").val()) {
            if (error)
                flash += ", "
            flash += "<b>Maximum weight</b>"
            error = true
        }

        // Show an alert if there are an error detected on the page
        if (error) {
            $("#flash").addClass("alert alert-danger")
            $("#flash").html(flash + " missing (* means required)")
        }
        return !error
    }

    /**
     * Allow to know if we are editing or creating a character
     * @param {Character} character the character we created/edited
     * @returns true if character is new, false if we edit an existing character
     */
    static isNew(character) {
        return true
    }

    /**
     * Allow the new character or the edits to be saved in the database
     * @param {Character} character the character we created/edited
     */
    static validate(character) {
        // Default image attribution
        if (!character.img)
            character.img = "https://img.icons8.com/windows/452/person-male.png"
        // If character is a new one save it onto the database
        if (EditCharacter.isNew(character)) {
            console.log("Saving...")
            character.save()
        } 
        // If character has been edited save the edits onto the database
        else {
            console.log("Editing...")
            character.edit()
        }

        // Redirection to the corresponding character's page (not working)
        HTMLHandler.goTo(Character)
    }
}
