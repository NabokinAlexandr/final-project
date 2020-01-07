function homePageTemplate(posts, currentUser) {
    return `${posts.map(post => {
        return `
        <article class='user-post post' id=${post.id}>
            <h2 class='post-heading'>${post.heading}</h2>
            <time class='post-date'>${post.date}</time>
            <img class='post-userpic' src=${post.userPic}>
            <span class='post-author'>${post.author}</span>
            <img class='post-img' src=${post.pic}>
            <ul class='post-tags'>
                ${post.tags.map(tag => {
                    return `<li>#${tag}</li>`;
                })}
            </ul>
            <div class='post-likes'>
                <div class=${post.likes.filter(like => like === currentUser.id).length > 0 ? 'like-active' : 'like-default'}></div>
                <span>${post.likes.length}</span>
            </div>
        </article>`;
    })}`;
} 
export {homePageTemplate};
