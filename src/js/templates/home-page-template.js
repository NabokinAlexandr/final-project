function homePageTemplate(posts, currentUser) {
    return `${posts.map(post => {
        return `
        <article class='user-post post' id=${post.id}>
            <div class='post-cover'>
                <div class='post-userpic'
                    style="background: ${post.userPic.trim() !== '' ? `url(${post.userPic})` : 'rgba(70, 72, 74, .3)'}; background-size: cover;"
                ></div>
                <span class='post-author'>${post.author}</span>
                <span class='post-heading'>${post.heading}</span>
                <span class='likes-count'>${post.likes.length}</span>
                <div class=${post.likes.filter(like => like === currentUser.id).length > 0 ? 'like-active' : 'like-default'}></div>
                <ul class='post-tags hidden'>
                    ${post.tags.map(tag => {
                        return `<li>#${tag}</li>`;
                    })}
                </ul>
            </div>
            <img class='post-img' src=${post.pic} alt=${post.heading}>
        </article>`;
    })}`;
} 
export {homePageTemplate};
