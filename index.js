const main_nav = document.getElementsByTagName('myDiv');

window.addEventListener("scroll", () => {
    var y = window.scrollY;
    if (y >= 100){
        main_nav.classList.add('disappear');
        return;
    }
    else{
        main_nav.classList.remove('disappear');
        // note that this is a class defined in your CSS.
    }
});
