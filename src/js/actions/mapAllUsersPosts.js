import {Apis} from '../api/api.js';
import {homePageTemplate} from '../templates/home-page-template.js';
import {createClientEvents} from './client-actions.js';
function createHomePageTemplate(users, currentUser) {
    return new Promise((resolve, reject) => {
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
            return next.id.slice(5) - current.id.slice(5);
        });
        const api = new Apis();
        api.getUsers()
        .then (resp => {
            const allDbUsers = resp.data;
            resolve (`
                <div class='home-sort'>
                    <button class='sort-btn js-sort'>Sort by date</button>
                    <div>
                        <select class="js-filter">
                            <option value='' selected disabled>Choose author</option>
                            <option value='all'>All photographers</option>
                            ${allDbUsers.map(user => `<option value=${user.id}>${user.name}</option>`)};
                        </select>
                    </div>
                </div>
                <section class='home-posts js-all-posts'>
                    ${homePageTemplate(postsToMap, currentUser)}
                </section>
            `);
        })
        .catch(err => reject(new Error(err)));
    });
}
function mapToDom(template, currentUser) {
    const url = `./pages/home.html`,
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(currentUser) {
        if (this.readyState === 4 && this.status === 200) {
            document.querySelector('#app').innerHTML = this.responseText + template;
            createClientEvents();
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}
function mapAllUsersPosts(users, currentUser) {
    if (!currentUser) {
        const api = new Apis();
        api.getCurrentUser()
        .then(resp => {
            if (resp.data.length > 0) {
                const currentUser = resp.data[0];
                createHomePageTemplate(users, currentUser)
                .then(
                    result => mapToDom(result, currentUser),
                    error => console.error(new Error(error))
                );  
            }
        })
        .catch(err => console.error(new Error(err)));
    } else {
        createHomePageTemplate(users, currentUser)
        .then(
            result => mapToDom(result, currentUser),
            error => console.error(new Error(error))
        );  
    }
    
}
export {mapAllUsersPosts};
