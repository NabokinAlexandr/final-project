import {Post} from '../libs/post.js';
import {editUser} from './editUser.js';
function createPost(user) {
    console.log(user);
    const heading = document.querySelector('.js-post-heading').value,
    tags = document.querySelector('.js-post-tags').value.split('#').filter(tag => tag.trim() !== ''),
    file = document.querySelector('.js-post-photo').files[0],
    pictureUrl = '',
    reader = new FileReader(),
    date = new Date(),
    formatedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    reader.readAsDataURL(file);
    reader.onload = () => {
        user.posts.push(new Post(reader.result, formatedDate, heading, `post_${date.getTime()}`, tags));
        editUser(user);
    };
    reader.onerror = () => console.error(new Error(reader.error));

}
function removePost(deleteBtn, user) {
    const id = deleteBtn.parentElement.id,
    idx = user.posts.indexOf(user.posts.filter(post => post.id === id)[0]);
    if (idx > -1) {
        user.posts.splice(idx, 1);
        editUser(user);
    }
}
function createEvents(user) {
    document.querySelector('.js-add-post').addEventListener('submit', function(event) {
        event.preventDefault();
        createPost(user);
    });
    document.querySelector('.js-post-list').addEventListener('click', function(event) {
        if (event.target.classList.contains('js-remove-post')) {
            removePost(event.target, user);
        } else {
            return;
        }
    });
    document.querySelector('.js-user-profile-link').onclick = () => document.querySelector('#js-modal').classList.remove('hidden');
    document.querySelector('.js-modal-close').onclick = () => {
        document.querySelector('#js-modal').classList.add('hidden');
        location.replace('http://localhost:3000/#user-page');
    };
}
export {createEvents};
