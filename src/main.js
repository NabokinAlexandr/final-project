import './js/actions/menu.js';
import './js/router/router-initiation.js';
import './js/actions/addUser.js';
import './js/actions/logInOut.js';
import './js/actions/mapUserData.js';
import {Apis} from './js/api/api.js';
import {mapUserData} from './js/actions/mapUserData.js';
import {mapAllUsersPosts} from './js/actions/mapAllUsersPosts.js';
import './js/actions/hashChange.js';
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
                if (window.location.hash.substr(1).replace('/#', '') === 'user-page') {
                    mapUserData(resp.data[0]);
                }
                if (window.location.hash.substr(1).replace('/#', '') === 'js-modal') {
                    location.replace('http://localhost:3000/#user-page');
                }
            } else {
                document.querySelector('#js-reg-form').classList.remove('hidden');
                document.querySelector('#js-login-form').classList.remove('hidden');
                document.querySelector('#js-logout').classList.add('hidden');
                document.querySelector('.js-user-link').classList.add('hidden');
                if (window.location.hash.substr(1).replace('/#', '') === 'user-page') {
                    mapUserData();
                }
                if (window.location.hash.substr(1).replace('/#', '') === 'js-modal') {
                    location.replace('http://localhost:3000/#user-page');
                }
            }
        })
        .catch(err => console.error(new Error(err)));
        if (window.location.hash.substr(1).replace('/#', '') === 'home' || window.location.hash.substr(1) === '') {
            api.getUsers()
            .then(resp => {
                if (resp.data.length > 0) {
                    mapAllUsersPosts(resp.data);
                } else {
                    return;
                }
            })
            .catch(err => console.error(new Error(err)));   
        }
    };
}());
