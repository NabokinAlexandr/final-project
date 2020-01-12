function userProfile(user) {
    return `
        <div id='modal-profile' class='modal modal_overflow hidden'>
            <div class='modal-content'>
                <span class='modal-close js-profile-close'>&times;</span>
                <div class=${user.userPic.trim().length === '' ? 'hidden' : 'user-pic-small'}>
                    <img src= ${user.userPic} class='js-u-pic' height='100%'>
                </div>
                <h2 class='modal-heading'>${user.name}</h2>
                <form class='form form_nomargin js-change-user-pic'>
                    <label class='form-label form-label_photo' for='js-add-userpic'> Add or update your photo </label>
                    <input type='file' name='pic' accept='image/*' id='js-add-userpic' class='form-photo modal-button hidden'>
                </form>
                <a href='' class='form-anchor js-user-info'> Change profile </a>
                <form class='form js-change-user-info hidden'>
                    <label class='form-label'>Change your name</label>
                    <input type='text' class='form-input js-change-user-name' placeholder=${user.name}>
                    <label class='form-label'>Add info about yourself</label>
                    <textarea class='form-textarea js-user-info'></textarea>
                    <button type='submit' class='form-button'>OK</button>
                    <div class="form-message js-user-form-message"></div>
                </form>
                <a href='' class='form-anchor js-user-pass'> Change password </a>
                <form class='form js-change-user-password hidden'>
                    <label class='form-label'> Old password </label>
                    <input type='password' class='form-input js-old-pass'>
                    <label class='form-label'>New password</label>
                    <input type='password' class='form-input js-change-pass'>
                    <label class='form-label'>Confirm new password</label>
                    <input type='password' class='form-input js-confirm-new-pass'>
                    <button type='submit' class='form-button'>OK</button>
                    <div class="form-message js-user-form-message"></div>
                </form>
                <a href='' class='form-anchor js-user-remove'> Remove profile </a>
                <form class='form js-remove-user hidden'>
                    <label class='form-label'>Password</label>
                    <input type='password' class='form-input js-confirm-pass'>
                    <button type='submit' class='form-button form-button_red'> Remove profile </button>
                    <div class="form-message js-user-form-message"></div>
                </form>
            </div>
        </div>
    `;
} 
export {userProfile};
