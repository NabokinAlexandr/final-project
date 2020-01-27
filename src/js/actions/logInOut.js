import {Apis} from '../api/api.js';
import {homePageAllPosts} from './homePageAllPosts.js';
import {openModal, closeModal} from './commonActions.js';
import {createUserPage} from './createUserPage.js';
(function() {
    function userAuthentification(name, pass) {
        const api = new Apis(),
        p = document.createElement('p'),
        messageBlock = document.querySelector('#js-login-form .js-login-form-message');
        let users, currentUser;
        while (messageBlock.hasChildNodes()) {
            messageBlock.removeChild(messageBlock.firstChild);
        }
        api.getUsers()
        .then (
            resp => {
                users = resp.data,
                currentUser = users.filter(user => user.name === name && user.pass === pass);
                if (currentUser.length > 0) {
                    api.setCurrentUser(currentUser[0]);
                } 
            }
        )
        .then ( 
            () => {
                if (currentUser.length > 0) {
                    if (window.location.hash.substr(1).replace('/#', '').includes('user_')) {
                        location.replace(`http://localhost:3000/#user_${currentUser[0].id}`);
                        createUserPage(currentUser[0]);
                    }
                    if (window.location.hash.substr(1).replace('/#', '') === 'home' || window.location.hash.substr(1) === '') {
                        homePageAllPosts(users, currentUser[0]);
                    }
                    closeModal(document.querySelector('.js-first-screen'));
                    document.querySelector('#modal-login').classList.add('hidden');
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
            }
        )
        .then (
            () => {
                openModal(document.querySelector('.js-first-screen'));
            }
        )
        .catch(err => console.error(new Error(err)));
    }
    document.querySelector('#js-login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        userAuthentification(document.querySelector('#js-login-name').value, document.querySelector('#js-login-pass').value);
    });
    document.querySelector('#js-logout').addEventListener('click', function(){
        logOut();
    });
}());
