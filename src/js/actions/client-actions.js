import {closeModal, openModal, openPhoto} from './commonActions.js';
import {toggleLike} from './postToggleLike.js';
import {Apis} from '../api/api.js';
import {search} from './search.js';
import {mapAllUsersPosts} from './mapAllUsersPosts.js';
function createSearchPageEvents (url) {
    const api = new Apis();
    api.getCurrentUser()
    .then(resp => {
        const currentUser = resp.data[0];
        document.querySelector('.js-search-post-close').addEventListener('click', function() {
            closeModal(document.querySelector('#modal-search-post'));
            location.replace(`http://localhost:3000/${url}`);
        });
        document.querySelector('.js-search-posts').addEventListener('click', function(event) {
            if (event.target.classList.contains('like-active')
            || event.target.classList.contains('like-default')) {
                toggleLike(event.target, currentUser, url);
            }
            if (event.target.classList.contains('post-cover')) {
                const popup = document.querySelector('#modal-search-post'),
                modal = document.querySelector('#modal-search-post .modal-content');
                openPhoto(event.target, popup, modal);
            }
        });
        document.querySelector('#search').addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                search(event.target.value);
            }
        });
    })
    .catch(err => console.error(new Error(err)));
}
function filterBy(query, currentUser) {
    const api = new Apis();
    if (query === 'all') {
        api.getUsers()
        .then (
            resp => {
                mapAllUsersPosts(resp.data, currentUser);
            }
        )
        .catch(err => console.error(new Error(err)));
    } else {
        api.getUser(query)
        .then (
            resp => {
                const user = resp.data;
                mapAllUsersPosts([user], currentUser);
            }
        )
        .catch(err => console.error(new Error(err)));
    }
}
function createClientEvents() {
    const api = new Apis();
    api.getCurrentUser()
    .then(resp => {
        const currentUser = resp.data[0];
        document.querySelector('.js-home-post-close').addEventListener('click', function() {
            closeModal(document.querySelector('#modal-home-post'));
            location.replace('http://localhost:3000/#home');
        });
        document.querySelector('.js-all-posts').addEventListener('click', function(event) {
            if (event.target.classList.contains('like-active')
            || event.target.classList.contains('like-default')) {
                toggleLike(event.target, currentUser);
            }
            if (event.target.classList.contains('post-cover')) {
                const popup = document.querySelector('#modal-home-post'),
                modal = document.querySelector('#modal-home-post .modal-content');
                openPhoto(event.target, popup, modal);
            }
        });
        document.querySelector('#search').addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                search(event.target.value);
            }
        });
        document.querySelector('.js-sort').addEventListener('click', function(event) {
            if (document.querySelector('.js-sort').classList.contains('rotate')) {
                document.querySelector('.js-sort').classList.remove('rotate');
                document.querySelector('.js-all-posts').classList.remove('reverse');
            } else {
                document.querySelector('.js-sort').classList.add('rotate');
                document.querySelector('.js-all-posts').classList.add('reverse');
            }
        });
        document.querySelector('.js-filter').addEventListener('change', function(event) {
            filterBy(event.target.options[event.target.selectedIndex].value, currentUser);
        });
    })
    .catch(err => console.error(new Error(err)));
}
export {createClientEvents, createSearchPageEvents};
