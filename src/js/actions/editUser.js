import {Apis} from '../api/api.js';
import {mapUserData} from './mapUserData.js';
function editUser(user) {
    const api = new Apis();
    api.editCurrentUser(user)
    .then(
        () => {
            mapUserData(user);
            api.editUser(user);
        }
    )
    .catch(err => console.error(new Error(err)));
}
export {editUser};
