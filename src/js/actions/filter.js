import {homePageAllPosts} from './homePageAllPosts.js';
import {Apis} from '../api/api.js';
function filter(query, currentUser) {
    const api = new Apis();
    if (query === 'all') {
        api.getUsers()
        .then (
            resp => {
                if (window.location.hash.substr(1).replace('/#', '').includes('home') ||
                window.location.hash.substr(1).replace('/', '') === '') {
                    homePageAllPosts(resp.data, currentUser);
                } else {
                    location.replace('http://localhost:3000/#home');
                }
            }
        )
        .catch(err => console.error(new Error(err)));
    } else {
        api.getUser(query)
        .then (
            resp => {
                const user = resp.data;
                location.replace(`http://localhost:3000/#photographer=${user.name}`);
                if (user.posts.length > 0) {
                    homePageAllPosts([user], currentUser);
                } else {
                    document.querySelector('.js-all-posts').innerHTML = '<h2 class="home-no-results">This user has no posts yet</h2>';
                }
            }
        )
        .catch(err => console.error(new Error(err)));
    }
}
export {filter};
