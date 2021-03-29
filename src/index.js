import {Character} from "./models/characters.js";
import {HTMLHandler} from "./models/htmlhandler.js";
import {Classes} from "./models/classes.js";
import './styles/main.css';


$(window).on('load hashchange', function (e) {
    console.log("connected")
    try {
        SPARouter_hash(window.location.hash);
    } catch (err) {
        console.error(err)

    }
});


function SPARouter_hash(page) {
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
        default:
            HTMLHandler.nav('404.html');
    }
}


