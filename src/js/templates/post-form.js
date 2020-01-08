const postForm = `
    <form class='form js-add-post'>
        <input type='text' placeholder='Add heading' class='form-input js-post-heading'></input>
        <label for='js-add-photo' class='form-label'> Add photo </label>
        <input type='file' name='pic' accept='image/*' class='form-photo js-post-photo hidden' id='js-add-photo' required>
        <input type='text' placeholder='Add tags' class='form-input js-post-tags'></input>
        <button type='submit' class='form-button'>OK</button>
    </form>
`;
export {postForm};
