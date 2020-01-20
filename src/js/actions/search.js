import {Apis} from '../api/api.js';
import {homePageTemplate} from '../templates/home-page-template.js';
function mapSearhResult(posts, hashLocation) {
    const api = new Apis();
    api.getCurrentUser()
    .then(resp => {
        const currentUser = resp.data[0];
        if (posts.length > 0) {
            document.querySelector('.js-all-posts').innerHTML = homePageTemplate(posts, currentUser);
        } else {
            document.querySelector('.js-all-posts').innerHTML = '<h2 class="home-no-results">Results not found</h2>';
        }
        location.replace(`http://localhost:3000/#query=${hashLocation}`);
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
        mapSearhResult(result, hashLocation);
    })
    .catch(err => console.error(new Error(err)));
}
export {search};
