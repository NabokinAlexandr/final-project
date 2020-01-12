import {postForm} from '../templates/post-form.js';
import {userProfile} from '../templates/user-profile.js';
import {postTemplate} from '../templates/post-template.js';
import {createEvents} from './userEvents.js';
function userPageTemplate(user) {
    return `
        <section class='user-section user'>
            <div class='user-wallpaper' style="background: ${user.wallpaper && user.wallpaper !== '' ? `url(${user.wallpaper})` : 'rgba(70, 72, 74, .3)'}; background-size: cover;">
                <label for='js-add-wallpaper' class='form-label_photo user-wallpaper-btn'></label>
                <input type='file' name='pic' accept='image/*' class='form-photo js-wallpaper-photo hidden' id='js-add-wallpaper' required>
            </div>
            <article class='user-info'>
                <div>
                    <div class=${user.userPic.trim().length === '' ? 'user-pic hidden' : 'user-pic'}>
                        <img src= ${user.userPic} height='100%'>
                    </div>
                    <h2 class='user-name'> ${user.name} </h2>
                    <p class='user-data'> ${user.data} </p>
                </div>
            </article>
            <button class='form-button user-btn js-post-form'>Add photo</button>
            <div class='user-edit_cover'>
                <button class='user-profile-link js-user-profile-link'>Edit profile</button>
            </div>
            <section class='user-posts-list js-post-list'>
                ${postTemplate(user)}
            </section>
        </section>
        ${postForm}
        ${userProfile(user)}`;
}
function mapUserData(user) {
    if (user) {
        const template = userPageTemplate(user);
        document.querySelector('#app').innerHTML = template;
        createEvents(user);
    } else {
        document.querySelector('#app').innerHTML = '<h1>Please, log in or register</h1>';
    }
}
export {mapUserData};
