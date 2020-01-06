function userProfile(user) {
    return `
        <div id='js-modal' class='modal hidden'>
            <div class='modal-content'>
                <span class='modal-close js-modal-close'>&times;</span>
                <h2 class='modal-heading'>${user.name}</h2>
                <img class=${user.userPic.trim().length === '' ? 'user-pic hidden' : 'user-pic'} src= ${user.userPic}>
                <form class='form js-change-user-info'>
                    <label class='form-label' for='js-add-userpic'> Add or update your photo </label>
                    <input type='file' name='pic' accept='image/*' id='js-add-userpic' class='form-photo modal-button'>
                    <textarea class='form-textarea js-user-info' placeholder='Share your story'></textarea>
                    <label class='form-label'>Change your name</label>
                    <input type='text' class='form-input js-change-user-name' placeholder=${user.name}>
                    <label class='form-label'>Change your password</label>
                    <input type='password' class='form-input js-change-pass'>
                    <label class='form-label'>Confirm new password</label>
                    <input type='password' class='form-input js-confirm-new-pass'>
                    <button type='submit' class='form-button'>Change profile</button>
                    <button type='button' class='form-button js-remove-user'>Remove profile</button>
                    <div class="form-message js-user-form-message"></div>
                </form>
            </div>
        </div>
    `;
} 
export {userProfile};
