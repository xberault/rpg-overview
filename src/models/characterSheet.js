import {HTMLHandler} from "./htmlhandler";

export class CharacterSheet extends HTMLHandler {

    static goTo() {
        HTMLHandler.setLeft("");
        HTMLHandler.setRight("");
        HTMLHandler.rightNav("addCharacter.html");
        HTMLHandler.setTitle("Add new");
    }

}