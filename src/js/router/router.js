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
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName, route.name);
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
                    removeActiveRoute(link);
                    link.parentElement.classList.add('active');
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        }(this));
    }
}
export {Router};
