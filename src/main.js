import './js/actions/menu.js';
import './js/router/router-initiation.js';
import './js/actions/addUser.js';
import './js/actions/logInOut.js';
import './js/actions/createUserPage.js';
import {Apis} from './js/api/api.js';
import {createUserPage} from './js/actions/createUserPage.js';
import {homePageAllPosts} from './js/actions/homePageAllPosts.js';
import './js/actions/hashChange.js';
import {closeModal, openModal} from './js/actions/commonActions.js';
(function() {
    window.onload = function() {
        document.querySelector('#js-reg').addEventListener('click', function() {
            openModal(document.querySelector('#modal-reg'));
        });
        document.querySelector('.js-reg-close').addEventListener('click', function() {
            closeModal(document.querySelector('#modal-reg'));
        });
        document.querySelector('#js-login').addEventListener('click', function() {
            openModal(document.querySelector('#modal-login'));
        });
        document.querySelector('.js-login-close').addEventListener('click', function() {
            closeModal(document.querySelector('#modal-login'));
        });
        document.querySelector('.js-photo-close').addEventListener('click', function() {
            closeModal(document.querySelector('#modal-photo'));
        });
        const api = new Apis();
        api.getCurrentUser()
        .then(resp => {
            if (resp.data.length > 0) {
                closeModal(document.querySelector('.js-first-screen'));
                if (window.location.hash.substr(1).replace('/#', '').includes('user_')) {
                    location.replace(`http://localhost:3000/#user_${resp.data[0].id}`);
                    createUserPage(resp.data[0]);
                }
            } else {
                openModal(document.querySelector('.js-first-screen'));
            }
        })
        .catch(err => console.error(new Error(err)));
        if (window.location.hash.substr(1).replace('/#', '') === 'home' || window.location.hash.substr(1) === '') {
            api.getUsers()
            .then(resp => {
                if (resp.data.length > 0) {
                    homePageAllPosts(resp.data);
                } else {
                    return;
                }
            })
            .catch(err => console.error(new Error(err)));   
        }
    };
}());
