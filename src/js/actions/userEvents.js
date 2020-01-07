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
function changeUserPic(user) {
    const userPic = document.querySelector('#js-add-userpic').files ? document.querySelector('#js-add-userpic').files[0] : null;
    if (userPic) {
        const reader = new FileReader();
        reader.readAsDataURL(userPic);
        reader.onload = () => {
            user.userPic = reader.result;
            editUser(user);
        };
        reader.onerror = () => console.error(new Error(reader.error));
    }
}
function changeUserPass(user) {
    const oldPass = document.querySelector('.js-old-pass').value,
    userPass = document.querySelector('.js-change-pass').value,
    confirmedPass = document.querySelector('.js-confirm-new-pass').value,
    messageBlock = document.querySelector('.js-change-user-password .js-user-form-message'),
    p = document.createElement('p');
    let status = true, message = 'Your profile was updated!';
    if (oldPass === user.pass) {
        if (userPass && userPass.trim() !== '' || confirmedPass && confirmedPass.trim() !== '') {
            const result = checkPass(userPass, confirmedPass);
            status = result.status;
            message = result.message;
            if (status === true) {
                user.pass = userPass;
                editUser(user);
            } else {
                p.classList.add('error');
            }
        }
    } else {
        p.classList.add('error');
        message = 'You entered an invalid current password! Please, check it and try to fill form again.';
    }
    while (messageBlock.hasChildNodes()) {
        messageBlock.removeChild(messageBlock.firstChild);
    }
    p.innerHTML = message;
    messageBlock.appendChild(p);
}
function changeUserProfile(user) {
    const userName = document.querySelector('.js-change-user-name').value,
    userInfo = document.querySelector('.js-user-info').value,
    messageBlock = document.querySelector('.js-change-user-info .js-user-form-message'),
    p = document.createElement('p');
    p.innerHTML = 'Your profile was updated!';
    user.data = userInfo ? userInfo.trim() : user.data;
    user.name = userName && userName.trim !== '' ? userName : user.name;
    while (messageBlock.hasChildNodes()) {
        messageBlock.removeChild(messageBlock.firstChild);
    }
    editUser(user);
    messageBlock.appendChild(p);
}
function removeUser(user) {
    const pass = document.querySelector('.js-remove-user .js-confirm-pass').value;
    if (pass === user.pass) {
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
    } else {
        const messageBlock = document.querySelector('.js-remove-user .js-user-form-message');
        messageBlock.innerHTML = '<p class="error">You entered an invalid password! If you really want to remove your account, check your password and try again.</p>';
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
    document.querySelector('.js-change-user-pic').addEventListener('change', function(event) {
        changeUserPic(user);
    });
    document.querySelector('.js-change-user-info').addEventListener('submit', function(event) {
        event.preventDefault();
        changeUserProfile(user);
    });
    document.querySelector('.js-change-user-password').addEventListener('submit', function(event) {
        event.preventDefault();
        changeUserPass(user);
    });
    document.querySelector('.js-remove-user').addEventListener('submit', function() {
        event.preventDefault();
        removeUser(user);
    });
}
export {createEvents};
