document.addEventListener( 'DOMContentLoaded', function () {
    var root = document.body.style;
    console.log(root);
  
    // Initialize variables
    root.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  
    // Scroll events
    window.addEventListener('scroll',scroll,false);
    function scroll() {
      root.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    }
  });