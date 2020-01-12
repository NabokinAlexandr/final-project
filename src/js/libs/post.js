class Post {
    constructor(url, date, heading, id, tags) {
        this.heading = heading;
        this.date = date;
        this.id = id;
        this.pic = url;
        this.tags = tags ? tags : [];
        this.likes = [];
    }
}
export {Post};
