function getActive() {
    event.preventDefault();
    this.classList.add("active");   
}

el = document.getElementsByClassName("contacts");
el[0].addEventListener("click", getActive, false);

aboutUs_menu = document.getElementsByClassName("js-aboutUs_menu-li");
aboutUs_menu[0].addEventListener("click", getActive, false);
