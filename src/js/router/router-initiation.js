import {Router} from './router.js';
import {Route} from './route.js';
(function() {
    function init() {
        const router = new Router([
            new Route('home', 'home.html', true),
            new Route('contacts', 'contacts.html'),
            new Route('default1', 'default.html'),
            new Route('default2', 'default.html'),
            new Route('default3', 'default.html')
        ]);
        router.init();
    }
    init();
}());
