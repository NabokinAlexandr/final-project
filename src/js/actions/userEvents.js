import {Post} from '../libs/post.js';
import {Validator} from '../libs/validator.js';
import {editUser} from './editUser.js';
import {Apis} from '../api/api.js';
function createPost(user) {
    const heading = document.querySelector('.js-post-heading').value,
    tags = document.querySelector('.js-post-tags').value.split('#').filter(tag => tag.trim() !== ''),
    file = document.querySelector('.js-post-photo').files[0],
    reader = new FileReader(),
    date = new Date(),
    formatedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
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
function checkPass(userPass, confirmedPass) {
    const passValidator = new Validator(userPass, 'Password'),
    passIsValid = passValidator.validate(),
    passIsEqual = userPass === confirmedPass;
    let status = true, message = 'Your profile was updated!';
    if (!passIsEqual) {
        message = 'Passwords are not equal';
        status = false;
    } else if (passIsValid.status === 'fail') {
        message = passIsValid.text;
        status = false;
    }
    return {
        status: status,
        message: message
    };
}
function changeUserProfile(user) {
    const userName = document.querySelector('.js-change-user-name').value,
    userInfo = document.querySelector('.js-user-info').value,
    userPic = document.querySelector('#js-add-userpic').files ? document.querySelector('#js-add-userpic').files[0] : null,
    userPass = document.querySelector('.js-change-pass').value,
    confirmedPass = document.querySelector('.js-confirm-new-pass').value,
    messageBlock = document.querySelector('.js-user-form-message'),
    p = document.createElement('p');
    let status = true, message = 'Your profile was updated!';
    //  check if user password was changed
    if (userPass && userPass.trim() !== '' || confirmedPass && confirmedPass.trim() !== '') {
        //  check if new pass is valid
        const result = checkPass(userPass, confirmedPass);
        status = result.status;
        message = result.message;
        //  if new pass is valid - change user pass
        user.pass = result.status === true ? userPass : user.pass;
    }
    //  if userPic was changed - add userPic
    if (userPic) {
        const reader = new FileReader();
        reader.readAsDataURL(userPic);
        reader.onload = () => {
            user.userPic = reader.result;
        };
        reader.onerror = () => console.error(new Error(reader.error));
    }
    //  if text fields were changed - change user name, data
    user.data = userInfo ? userInfo.trim() : user.data;
    user.name = userName && userName.trim !== '' ? userName : user.name;
    //  remove old messages, create new error or success message
    while (messageBlock.hasChildNodes()) {
        messageBlock.removeChild(messageBlock.firstChild);
    }
    p.innerHTML = message;
    //  if all is ok - set new user to backend and show success message, else - show error message
    if (status === true) {
        editUser(user);
        messageBlock.appendChild(p);
    } else {
        p.classList.add('error');
        messageBlock.appendChild(p);
    }
}
function removeUser(user) {
    const api = new Apis();
    api.removeCurrentUser(user.id)
    .then(
        ()=> {
            api.removeUser(user.id);
            document.querySelector('#js-reg-form').classList.remove('hidden');
            document.querySelector('#js-login-form').classList.remove('hidden');
            document.querySelector('#js-logout').classList.add('hidden');
            document.querySelector('.js-user-link').classList.add('hidden');
        })
    .then (()=>location.replace('http://localhost:3000'))
    .catch(err => console.error(new Error(err)));
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
    document.querySelector('.js-change-user-info').addEventListener('submit', function(event) {
        event.preventDefault();
        changeUserProfile(user);
    });
    document.querySelector('.js-remove-user').addEventListener('click', function() {
        removeUser(user);
    }); 
}
export {createEvents};
