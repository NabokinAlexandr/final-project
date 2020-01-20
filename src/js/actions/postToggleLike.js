import {Apis} from '../api/api.js';
import {editUser} from './editUser.js';
import {mapUserData} from './mapUserData.js';
import {mapAllUsersPosts} from './mapAllUsersPosts.js';
import {search} from './search.js';
function editTargetUser(user) {
    const api = new Apis();
    api.editUser(user)
    .catch(err => console.err(new Error(err)));
}
function postUpdate(post) {
    const likeActive = post.getElementsByClassName('like-active')[0],
    likeDefault = post.getElementsByClassName('like-default')[0],
    count = post.getElementsByClassName('likes-count')[0];
    if (likeActive) {
        likeActive.className = 'like-default';
        count.innerHTML = `${Number(count.innerHTML) - 1}`;
    }
    if (likeDefault) {
        likeDefault.className = 'like-active';
        count.innerHTML = `${Number(count.innerHTML) + 1}`;
    }
    
}
function toggleLike(target, currentUser) {
    const likeID = currentUser.id,
    post = target.parentElement.parentElement,
    api = new Apis();
    api.getUsers()
    .then(resp => {
        const users = resp.data;
        users.forEach(user => {
            const targetPost = user.posts.filter(p => p.id === post.id);
            if (targetPost.length > 0) {
                const likeToCheck = targetPost[0].likes.filter(like => like === likeID);
                if (likeToCheck.length > 0) {
                    const idx = targetPost[0].likes.indexOf(likeToCheck[0]);
                    targetPost[0].likes.splice(idx, 1);
                } else {
                    targetPost[0].likes.push(likeID);
                }
                if (user.id === likeID) {
                    editUser(user);
                    
                } else {
                    editTargetUser(user);
                }
                postUpdate(post, currentUser);
                return;
            }
        });
    })
    .catch(err => console.error(new Error(err)));
}
export {toggleLike};
