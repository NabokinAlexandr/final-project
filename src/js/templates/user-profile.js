function userProfile(user) {
    return `
        <div id='js-modal' class='modal hidden'>
            <div class='modal-content'>
                <span class='modal-close js-modal-close'>&times;</span>
                <h2 class='modal-heading'>${user.name}</h2>
                <img class=${user.userPic.trim().length === '' ? 'user-pic hidden' : 'user-pic'} src= ${user.userPic}>
                <form class='form js-change-user-pic'>
                    <label class='form-label' for='js-add-userpic'> Add or update your photo </label>
                    <input type='file' name='pic' accept='image/*' id='js-add-userpic' class='form-photo modal-button hidden'>
                </form>
                <form class='form js-change-user-info'>
                    <fieldset>
                        <legend class='form-heading'> Change profile </legend>
                        <label class='form-label'>Change your name</label>
                        <input type='text' class='form-input js-change-user-name' placeholder=${user.name}>
                        <label class='form-label'>Add info about yourself</label>
                        <textarea class='form-textarea js-user-info'></textarea>
                        <button type='submit' class='form-button'>OK</button>
                        <div class="form-message js-user-form-message"></div>
                    </fieldset>
                </form>
                <form class='form js-change-user-password'>
                    <fieldset>
                        <legend class='form-heading'> Change password </legend>
                        <label class='form-label'> Old password </label>
                        <input type='password' class='form-input js-old-pass'>
                        <label class='form-label'>New password</label>
                        <input type='password' class='form-input js-change-pass'>
                        <label class='form-label'>Confirm new password</label>
                        <input type='password' class='form-input js-confirm-new-pass'>
                        <button type='submit' class='form-button'>OK</button>
                        <div class="form-message js-user-form-message"></div>
                    </fieldset>
                </form>
                <form class='form js-remove-user'>
                    <fieldset>
                        <legend class='form-heading'> Remove profile </legend>
                        <label class='form-label'>Password</label>
                        <input type='password' class='form-input js-confirm-pass'>
                        <button type='submit' class='form-button form-button_red'> Remove profile </button>
                        <div class="form-message js-user-form-message"></div>
                    </fieldset>
                </form>
            </div>
        </div>
    `;
} 
export {userProfile};
