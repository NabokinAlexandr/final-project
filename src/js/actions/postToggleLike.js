import {Apis} from '../api/api.js';
function toggleLike(postID, authorID, currentUserID) {
    const api = new Apis();
    api.getUser(authorID)
    .then(resp => {
        const author = resp.data[0];
        
    })
}
export {toggleLike};
