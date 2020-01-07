import {postForm} from '../templates/post-form.js';
import {userProfile} from '../templates/user-profile.js';
import {postTemplate} from '../templates/post-template.js';
import {createEvents} from './userEvents.js';
function userPageTemplate(user) {
    return `
        <section class='user-section'>
            ${postForm}
            <a href='#js-modal' class='user-profile-link js-user-profile-link'>Edit profile</a>
            <article class='user-info'>
                <h2 class='user-name'> ${user.name} </h2>
                <div>
                    <img class=${user.userPic.trim().length === '' ? 'user-pic hidden' : 'user-pic'} src= ${user.userPic}>
                    <p class='user-data'> ${user.data} </p>
                </div>
            </article>
            <section class='user-posts-list js-post-list'>
                ${postTemplate(user)}
            </section>
        </section>
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
