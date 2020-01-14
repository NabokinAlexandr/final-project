import {Apis} from '../api/api.js';
import {homePageTemplate} from '../templates/home-page-template.js';
import {createSearchPageEvents} from './client-actions.js';
function mapSearchPage(posts, hashLocation) {
    const api = new Apis();
    api.getCurrentUser()
    .then(resp => {
        const currentUser = resp.data[0];
        const template = `
            <div class='search-cover'>
                <h2 class='search-tags'>${hashLocation}</h2>
                <form class="form form-search form_small">
                    <input type="text" id="search" class="form-input">
                    <label for="#search" class="search-label"></label>
                </form>
                <div class='search-blur'></div>
            </div>
            <section class='search-posts js-search-posts'>
                ${homePageTemplate(posts, currentUser)}
            </section>
        `;
        if (!window.location.hash.substr(1).replace('/#', '').includes(`${hashLocation}`)) {
            location.replace(`http://localhost:3000/${hashLocation}`);
        }
        document.querySelector('#app').innerHTML = template;
        createSearchPageEvents(hashLocation);
    })
    .catch(err => console.error(new Error(err)));
    
}
function search(queries) {
    const api = new Apis();
    api.getUsers()
    .then(resp => {
        const users = resp.data,
        result = [];
        users.forEach(user => {
            user.posts.forEach(post => {
                queries.split(' ').forEach(query => {
                    const targetTag = post.tags.filter(tag => tag === query.trim() || `#${tag}` === query.trim());
                    if (targetTag.length > 0) {
                        post.author = user.name;
                        post.userPic = user.userPic;
                        post.authorID = user.id;
                        result.push(post);
                    }
                });
            });
        });
        const hashLocation = queries;
        mapSearchPage(result, hashLocation);
    })
    .catch(err => console.error(new Error(err)));
}
export {search, mapSearchPage};
