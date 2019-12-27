import {Router} from './router.js';
import {Route} from './route.js';
(function() {
    function init() {
        const router = new Router([
            new Route('home', 'home.html', true),
            new Route('contacts', 'contacts.html'),
            new Route('user-page', 'user-page.html'),
            new Route('default', 'default.html')
        ]);
        router.init();
    }
    init();
}());
