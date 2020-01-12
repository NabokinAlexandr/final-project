import {Apis} from '../api/api.js';
import {homePageTemplate} from '../templates/home-page-template.js';
import {createClientEvents} from './client-actions.js';
function createHomePageTemplate(users, currentUser) {
    let posts = [];
    users.forEach(user => {
        user.posts.forEach(post => {
            post.author = user.name;
            post.userPic = user.userPic;
            post.authorID = user.id;
        });
        posts = [...posts, ...user.posts];
    });
    const postsToMap = posts.sort((current, next) => {
        return current.date - next.date;
    }).reverse();
    return `
        <section class='home-posts js-all-posts'>
            ${homePageTemplate(postsToMap, currentUser)}
        </section>
    `;
}
function mapAllUsersPosts(users) {
    const api = new Apis();
    api.getCurrentUser()
    .then(resp => {
        const currentUser = resp.data[0];
        const template = createHomePageTemplate(users, currentUser),
        url = `./pages/home.html`,
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(currentUser) {
            if (this.readyState === 4 && this.status === 200) {
                document.querySelector('#app').innerHTML = this.responseText + template;
                createClientEvents();
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    })
    .catch(err => console.error(new Error(err)));
}
export {mapAllUsersPosts};
