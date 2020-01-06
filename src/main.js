import './js/actions/menu.js';
import './js/router/router-initiation.js';
import './js/actions/addUser.js';
import './js/actions/logInOut.js';
import './js/actions/mapUserData.js';
import {Apis} from './js/api/api.js';
(function() {
    window.onload = function() {
        const api = new Apis();
        api.getCurrentUser()
        .then(resp => {
            if (resp.data.length > 0) {
                document.querySelector('#js-reg-form').classList.add('hidden');
                document.querySelector('#js-login-form').classList.add('hidden');
                document.querySelector('#js-logout').classList.remove('hidden');
                document.querySelector('.js-user-link').classList.remove('hidden');
            } else {
                document.querySelector('#js-reg-form').classList.remove('hidden');
                document.querySelector('#js-login-form').classList.remove('hidden');
                document.querySelector('#js-logout').classList.add('hidden');
                document.querySelector('.js-user-link').classList.add('hidden');
            }
        })
        .catch(err => console.error(new Error(err)));
    };
}());
