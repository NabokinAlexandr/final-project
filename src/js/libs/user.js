import {Post} from './post.js';
class User {
    constructor(userName, userPass, userId) {
        this.name = userName;
        this.pass = userPass;
        this.id = userId;
        this.userPic = '';
        this.data = '';
        this.posts = [];
    }
}
export {User};
