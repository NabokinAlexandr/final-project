(function() {
    function getActive(event) {
        event.target.classList.add("active");   
    }
    const aboutUs_menu = document.getElementsByClassName("js-menu");
    aboutUs_menu[0].addEventListener("click", getActive);
}());
