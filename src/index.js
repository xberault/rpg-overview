import {Character} from "./models/characters.js";
import {EditCharacter} from "./models/editcharacter.js";

import {HTMLHandler} from "./models/htmlhandler.js";
import {Classes} from "./models/classes.js";
import './styles/main.css';


$(window).on('load hashchange', function (e) {
    console.log("connected")
    try {
        router_hash(window.location.hash);
    } catch (err) {
        console.error(err)

    }
});

/**
 * navigate to the hash passed on parameter
 * @param page page location hash
 */
function router_hash(page) {
    HTMLHandler.setRight(''); // clear right bar
    switch (page) {
        case '':
        case '#':
        case '#home':
            HTMLHandler.nav('index.html');
            Character.goTo();
            break;
        case '#characters':
            Character.goTo();
            break;
        case '#classes':
            Classes.goTo();
            break;
        case "#addnew":
            EditCharacter.goTo()
            break;
        default:
            HTMLHandler.nav('404.html');
    }
}

