function homePageTemplate(posts, currentUser) {
    return `${posts.map(post => {
        return `
        <article class='user-post post' id=${post.id} data-id=${post.authorID}>
            <div class='post-cover'>
                <img class=${post.userPic.trim() === '' ? 'post-userpic_default' : 'post-userpic'} src=${post.userPic}>
                <span class='post-author'>${post.author}</span>
                <span class='post-heading'>${post.heading}</span>
                <span class='likes-count'>${post.likes.length}</span>
                <div class='post-likes js-like'>
                    <div class=${post.likes.filter(like => like === currentUser.id).length > 0 ? 'like-active' : 'like-default'}></div>
                </div>
            </div>
            <img class='post-img' src=${post.pic}>
        </article>`;
    })}`;
} 
export {homePageTemplate};
