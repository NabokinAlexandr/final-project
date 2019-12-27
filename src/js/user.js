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
    createPost(url, date, heading, id) {
        this.posts.push(new Post(url, date, heading, id));
    }
    removePost(id) {
        const idx = this.posts.indexOf(this.posts.filter(post => post.id === id)[0]);
        if (idx > -1) {
            this.posts.splice(idx, 1);
        }
    }
}
export {User};
