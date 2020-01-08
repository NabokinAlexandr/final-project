import {mapUserData} from './mapUserData.js';
import {mapAllUsersPosts} from './mapAllUsersPosts.js';
import {Apis} from '../api/api.js';
(function() {
    window.addEventListener('hashchange', function() {
        const api = new Apis();
        if (window.location.hash.substr(1).replace('/#', '') === 'user-page') {
            api.getCurrentUser()
            .then(resp => {
                if (resp.data.length > 0) {
                    mapUserData(resp.data[0]);
                } else {
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
