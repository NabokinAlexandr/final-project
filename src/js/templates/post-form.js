const postForm = `
<div id="post-modal" class="modal hidden">
    <div class="modal-content">
        <span class="js-post-close modal-close">&times;</span>
        <form class='form js-add-post form_small'>
            <label for='js-add-photo' class='form-label form-label_photo'> Add photo </label>
            <input type='text' placeholder='Add heading' class='form-input js-post-heading'></input>
            <input type='file' name='pic' accept='image/*' class='form-photo js-post-photo hidden' id='js-add-photo' required>
            <input type='text' placeholder='Add tags' class='form-input js-post-tags'></input>
            <button type='submit' class='form-button'>OK</button>
            <div class="form-message js-user-form-message"></div>
        </form>
    </div>
</div>
`;
export {postForm};
