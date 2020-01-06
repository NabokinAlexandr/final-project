import {Apis} from '../api/api.js';
import {mapUserData} from './mapUserData.js';
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
                    document.querySelector('#js-reg-form').classList.add('hidden');
                    document.querySelector('#js-login-form').classList.add('hidden');
                    document.querySelector('#js-logout').classList.remove('hidden');
                    document.querySelector('.js-user-link').classList.remove('hidden');
                } else {
                    p.innerHTML = 'User credentials are invalid. Please, check your password and name';
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
                document.querySelector('#js-reg-form').classList.remove('hidden');
                document.querySelector('#js-login-form').classList.remove('hidden');
                document.querySelector('#js-logout').classList.add('hidden');
                document.querySelector('.js-user-link').classList.add('hidden');
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
