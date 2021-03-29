export class HTMLHandler {


    static goTo() {
        // to implement on child
    }

    static nav(to) {
        console.log("main nav to: " + to)
        $.get(to, function (pageContent) {
            $('.content').html(pageContent);
        }).fail(HTMLHandler.failedGet)
    }

    static leftNav(to) {
        console.log("left nav to: " + to)
        $.get(to, function (pageContent) {
            $('#left').html(pageContent);
            console.log(pageContent)
        }).fail(HTMLHandler.failedGet)
    }

    static setLeft(html) {
        console.log("set left nav called")
        $('#left').html(html);
    }

    static rightNav(to) {
        console.log("right nav to: " + to)
        $.get(to, function (pageContent) {
            $('#right').html(pageContent);
        }).fail(HTMLHandler.failedGet)
    }

    static failedGet() {
        console.log('failed loading')
        const refresh = '<a class="refreshpage" href=".">refresh page</a>'
        $('#main').html('Oops, something went wrong, make sure you are online.<br>' + refresh);
    }

    static setTitle(title) {
        $("#main_title").text(title);
        $(".active").removeClass("active")
        $("#nav-" + title).addClass("active")
    }

    static loadPage(path) {
        const response = fetch(path);
        const resHtml = $(response).text();
        return resHtml;
    }


}