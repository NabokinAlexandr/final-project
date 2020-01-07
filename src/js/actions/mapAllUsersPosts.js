import {Apis} from '../api/api.js';
import {homePageTemplate} from '../templates/home-page-template.js';
function createHomePageTemplate(users, currentUser) {
    let posts = [];
    users.forEach(user => {
        user.posts.forEach(post => {
            post.author = user.name;
            post.userPic = user.userPic;
        });
        posts = [...posts, ...user.posts];
    });
    const postsToMap = posts.sort((current, next) => {
        return current.date - next.date;
    }).reverse();
    return `
        <section class='users-posts-lists'>
            ${homePageTemplate(postsToMap, currentUser)}
        </section>
    `;
}
function mapAllUsersPosts(users) {
    const api = new Apis();
    api.getCurrentUser()
    .then(resp => {
        const template = createHomePageTemplate(users, resp.data[0]),
        url = `./pages/home.html`,
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.querySelector('#app').innerHTML = this.responseText + template;
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}
export {mapAllUsersPosts};
