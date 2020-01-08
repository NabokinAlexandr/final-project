import {Apis} from '../api/api.js';
function editUser(user) {
    const api = new Apis();
    api.editCurrentUser(user)
    .then(
        () => {
            api.editUser(user);
        }
    )
    .catch(err => console.error(new Error(err)));
}
export {editUser};
