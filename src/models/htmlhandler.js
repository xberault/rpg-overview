/**
 * Allow user to interact with dom easily
 */
export class HTMLHandler {


    /**
     * Will allow to navigate to the child node
     */
    static goTo() {
        // to implement on child
    }

    /**
     * set the current page to the parameter
     * @param to url to navigate
     */
    static nav(to) {
        console.log("main nav to: " + to)
        $.get(to, function (pageContent) {
            $('.content').html(pageContent);
        }).fail(HTMLHandler.failedGet)
    }

    /**
     * set the left bar of page
     * @param to path to go
     */
    static leftNav(to) {
        console.log("left nav to: " + to)
        $.get(to, function (pageContent) {
            $('#left').html(pageContent);
            console.log(pageContent)
        }).fail(HTMLHandler.failedGet)
    }

    /**
     *  set the left side
     * @param html to set
     */
    static setLeft(html) {
        console.log("set left nav called")
        $('#left').html(html);
    }

    /**
     *  set the right side
     * @param html to set
     */
    static setRight(html) {
        console.log("set right nav called")
        $('#right').html(html);
    }

    /**
     * set the right bar of page
     * @param to path to go
     */
    static rightNav(to) {
        console.log("right nav to: " + to)
        $.get(to, function (pageContent) {
            $('#right').html(pageContent);
        }).fail(HTMLHandler.failedGet)
    }

    /**
     * executed when failed to nav to page
     */
    static failedGet() {
        console.log('failed loading')
        const refresh = '<a class="refreshpage" href=".">refresh page</a>'
        $('#main').html('Oops, something went wrong, make sure you are online.<br>' + refresh);
    }

    /**
     * set the main section title
     * @param title short string
     */
    static setTitle(title) {
        $("#main_title").text(title);
        $(".active").removeClass("active")
        if (title == "Add/Edit a character") {
            $("#nav-" + "editCharacter").addClass("active")
        } else
            $("#nav-" + title).addClass("active")
    }

    /**
     * @param path to html page
     * @returns {jQuery} dom contained
     */
    static loadPage(path) {
        const response = fetch(path);
        const resHtml = $(response).text();
        return resHtml;
    }


    /**
     * @param url to get
     * @param method to get content GET POST PUSH DELETE
     * @param callback function to call after data are collected
     * @returns {Promise<void>} return callback called on data contained with the request
     */
    static async sendRequest(url, method, callback) {
        const options = {
            method: method,
            headers: new Headers({'content-type': 'application/json'}),
        };

        let response = await fetch(url, options);
        await response.json().then(callback)
    }
}



