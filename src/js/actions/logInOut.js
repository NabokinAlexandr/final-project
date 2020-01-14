import {Apis} from '../api/api.js';
import {mapAllUsersPosts} from './mapAllUsersPosts.js';
(function() {
    function passAuthentification(name, pass) {
        const api = new Apis(),
        p = document.createElement('p'),
        messageBlock = document.querySelector('#js-login-form .js-login-form-message');
        while (messageBlock.hasChildNodes()) {
            messageBlock.removeChild(messageBlock.firstChild);
        }
        api.getUsers()
        .then (
            resp => {
                const currentUser = resp.data.filter(user => user.name === name && user.pass === pass);
                if (currentUser.length > 0) {
                    api.setCurrentUser(currentUser[0]);
                    document.querySelector('.js-first-screen').classList.add('hidden');
                    document.querySelector('#modal-login').classList.add('hidden');
                    mapAllUsersPosts(resp.data, currentUser);
                } else {
                    p.innerHTML = 'User credentials are invalid. Please, check your password and name';
                    p.classList.add('error');
                    messageBlock.appendChild(p);
                }
            }
        )
        .catch(err => console.error(new Error(err)));
    }
    function logOut() {
        const api = new Apis();
        api.getCurrentUser()
        .then(
            resp => {
                const currentUser = resp.data[0];
                api.removeCurrentUser(currentUser.id);
                document.querySelector('.js-first-screen').classList.remove('hidden');
            }
        )
        .then (() => location.replace('http://localhost:3000'))
        .catch(err => console.error(new Error(err)));
    }
    document.querySelector('#js-login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        passAuthentification(document.querySelector('#js-login-name').value, document.querySelector('#js-login-pass').value);
    });
    document.querySelector('#js-logout').addEventListener('click', function(){
        logOut();
    });
}());
