import {closeModal, openModal, openPhoto} from './commonActions.js';
function createClientEvents(user) {
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
    document.querySelector('.js-home-post-close').addEventListener('click', function() {
        closeModal(document.querySelector('#modal-home-post'));
        location.replace(`http://localhost:3000/#home`);
    });
    document.querySelector('.js-all-posts').addEventListener('click', function(event) {
        if (event.target.classList.contains('js-like')) {
            return;
        }
        if (event.target.classList.contains('post-cover')) {
            const popup = document.querySelector('#modal-home-post'),
            modal = document.querySelector('#modal-home-post .modal-content');
            openPhoto(event.target, popup, modal);
        }
    });
}
export {createClientEvents, closeModal, openModal};
