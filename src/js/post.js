class Post {
    constructor(url, date, heading, id) {
        this.heading = heading;
        this.date = date;
        this.id = id;
        this.pic = url;
        this.likes = [];
    }
    toggleLike(userID) {
        const likeToCheck = this.likes.filter(like => like === userID);
        if (likeToCheck.length > 0) {
            const idx = this.likes.indexOf(likeToCheck[0]);
            this.likes.splice(idx, 1);
        } else {
            this.likes.push(userID);
        }
    }

    countLikes() {
        return this.likes.length;
    }
}
export {Post};
