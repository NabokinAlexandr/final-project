import {mapUserData} from './mapUserData.js';
import {mapAllUsersPosts} from './mapAllUsersPosts.js';
import {Apis} from '../api/api.js';
(function() {
    window.addEventListener('hashchange', function() {
        const api = new Apis();
        if (window.location.hash.substr(1).replace('/#', '').includes('user_')) {
            api.getCurrentUser()
            .then(resp => {
                if (resp.data.length > 0) {
                    location.replace(`http://localhost:3000/#user_${resp.data[0].id}`);
                    mapUserData(resp.data[0]);
                } else {
                    location.replace(`http://localhost:3000/#user_unknown`);
                    mapUserData();
                }
            })
            .catch(err => console.error(new Error(err)));
            
        }
        if (window.location.hash.substr(1).replace('/#', '') === 'home') {
            api.getUsers()
            .then(resp => {
                if (resp.data.length > 0) {
                    mapAllUsersPosts(resp.data);
                } else {
                    return;
                }
            })
            .catch(err => console.error(new Error(err)));
        }
    });
}());
