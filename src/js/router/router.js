import {removeActiveRoute} from '../actions/menu.js';
class Router {
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    }
    init() {
        const r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', () => scope.hasChanged(scope, r));
            window.addEventListener('load', () => scope.hasChanged(scope, r));
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName, route.name);
                }
            }
        }(this, r));
    }
    hasChanged(scope, r) {
        if (window.location.hash.length > 0) {
            let isRoute = false;
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName, route.name);
                    isRoute = true;
                }
                if (isRoute === false 
                    && !window.location.hash.substr(1).includes('user_')
                    && !window.location.hash.substr(1).includes('photographer')
                    && !window.location.hash.substr(1).includes('query')) {
                    scope.goToRoute('not-found.html', 'not-found');
                }
            }
        } else {
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName, route.name);
                }
            }
        }
    }
    goToRoute(htmlName, name) {
        (function(scope) {
            const url = `./pages/${htmlName}`,
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                    const link = document.querySelector(`a[href='/#${name}']`);
                    if (link) {
                        removeActiveRoute(link);
                        link.parentElement.classList.add('active');
                    }
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        }(this));
    }
}
export {Router};
