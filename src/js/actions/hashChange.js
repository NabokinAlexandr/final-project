import {createUserPage} from './createUserPage.js';
import {homePageAllPosts} from './homePageAllPosts.js';
import {Apis} from '../api/api.js';
(function() {
    window.addEventListener('hashchange', function() {
        const api = new Apis();
        if (window.location.hash.substr(1).replace('/#', '').includes('user_')) {
            api.getCurrentUser()
            .then(resp => {
                if (resp.data.length > 0) {
                    location.replace(`http://localhost:3000/#user_${resp.data[0].id}`);
                    createUserPage(resp.data[0]);
                } else {
                    location.replace(`http://localhost:3000/#user_unknown`);
                    createUserPage();
                }
            })
            .catch(err => console.error(new Error(err)));
            
        }
        if (window.location.hash.substr(1).replace('/#', '') === 'home') {
            api.getUsers()
            .then(resp => {
                if (resp.data.length > 0) {
                    homePageAllPosts(resp.data);
                } else {
                    return;
                }
            })
            .catch(err => console.error(new Error(err)));
        }
    });
}());
