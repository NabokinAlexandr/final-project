function removeActiveRoute(target) {
    const menu = document.querySelector('.js-menu');
    const items = menu.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains('active')) {
            items[i].classList.remove('active');
        }
    }
    if (target.classList.contains('about')) {
        document.querySelector('.navigation-hide').classList.add('nav-active');
    } else {
        document.querySelector('.navigation-hide').classList.remove('nav-active');
    }
}
(function() {
    document.querySelector('.header-navi').addEventListener('click', function() {
        removeActiveRoute(event.target);
    });
}());
export {removeActiveRoute};
