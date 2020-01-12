import './js/actions/menu.js';
import './js/router/router-initiation.js';
import './js/actions/addUser.js';
import './js/actions/logInOut.js';
import './js/actions/mapUserData.js';
import {Apis} from './js/api/api.js';
import {mapUserData} from './js/actions/mapUserData.js';
import {mapAllUsersPosts} from './js/actions/mapAllUsersPosts.js';
import './js/actions/hashChange.js';
import {closeModal, openModal} from './js/actions/commonActions.js';
(function() {
    window.onload = function() {
        const api = new Apis();
        api.getCurrentUser()
        .then(resp => {
            if (resp.data.length > 0) {
                closeModal(document.querySelector('.js-first-screen'));
                document.querySelector('.js-post-close').addEventListener('click', function() {
                    closeModal(document.querySelector('#modal-post'));
                    location.replace(`http://localhost:3000/#user_${resp.data[0].id}`);
                });
                if (window.location.hash.substr(1).replace('/#', '').includes('user_')) {
                    location.replace(`http://localhost:3000/#user_${resp.data[0].id}`);
                    mapUserData(resp.data[0]);
                }
                if (window.location.hash.substr(1).replace('/#', '') === 'js-modal') {
                    location.replace(`http://localhost:3000/#user-${resp.data[0].id}`);
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
                    mapAllUsersPosts(resp.data);
                } else {
                    return;
                }
            })
            .catch(err => console.error(new Error(err)));   
        }
    };
}());
