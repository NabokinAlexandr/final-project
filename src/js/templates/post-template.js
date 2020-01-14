function postTemplate(user) {
    return `${user.posts.map(post => {
        return `
        <article class='user-post post post_user-page' id=${post.id}>
            <img class='post-img' src=${post.pic}>
            <div class='post-info'>
                <h2 class='post-name'>${post.heading}</h2>
                <span class='likes-count likes-count_black'>${post.likes.length}</span>
                <div class=${post.likes.filter(like => like === user.id).length > 0 ? 'like-active' : 'like-empty'}></div>
                <div class='post-delete-btn js-remove-post'></div>
                <ul class='post-tags hidden'>
                    ${post.tags.map(tag => {
                        return `<li>#${tag}</li>`;
                    })}
                </ul>
            </div>
        </article>`;
    })}`;
} 
export {postTemplate};
