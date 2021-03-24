export class HTMLHandler{


    static goTo(){
        // to implement on child
        }

    static nav(to) {
        console.log("left nav to: " + to )
        $.get(to, function(pageContent) {
          $('.content').html(pageContent);
        }).fail(HTMLHandler.failedGet)
    }
  
    static leftNav(to) {
        console.log("left nav to: " + to )
        $.get(to, function(pageContent) {
          $('#left').html(pageContent);
          console.log(pageContent)
        }).fail(failedGet)
    }
    static rightNav(to) {
        console.log("right nav to: " + to )
        $.get(to, function(pageContent) {
          $('#right').html(pageContent);
        }).fail(failedGet)
    }
  
    static failedGet() {
        console.log('failed loading')
      const refresh = '<a class="refreshpage" href=".">refresh page</a>'
      $('.content').html('Oops, something went wrong, make sure you are online.<br>' + refresh);
    }
  }