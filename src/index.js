$(window).on('load hashchange', function(e) {
    console.log("conneted")
    try {
      SPARouter_hash(window.location.hash);
    } catch (err) {
      console.error(err)

    }
  });



function SPARouter_hash(page) {
    switch(page) {
      case '':
      case '#':
      case '#home':
        nav('index.html');
        leftNav("characters.html")
        break;
      case '#characters':
        leftNav('characters.html');
        break;
      case '#classes':
        rightNav('classes.html');
        break;
      default:
        SPANav('404.html');
    }
  }

function nav(to) {
    console.log("left nav to: " + to )
    $.get(to, function(pageContent) {
       $('.content').html(pageContent);
     }).fail(failedGet)
 }

function leftNav(to) {
    console.log("left nav to: " + to )
    $.get(to, function(pageContent) {
       $('#left').html(pageContent);
       console.log(pageContent)
     }).fail(failedGet)
 }
 function rightNav(to) {
    console.log("right nav to: " + to )
    $.get(to, function(pageContent) {
       $('#right').html(pageContent);
     }).fail(failedGet)
 }

 function failedGet() {
     console.log('failed loading')
   const refresh = '<a class="refreshpage" href=".">refresh page</a>'
   $('.content').html('Oops, something went wrong, make sure you are online.<br>' + refresh);
 }
