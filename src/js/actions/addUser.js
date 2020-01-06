import {Validator} from '../libs/validator.js';
import {User} from '../libs/user.js';
import {Apis} from '../api/api.js';
(function() {
    function createUser(name, pass) {
        const id = `id_${(new Date()).getTime()}`,
        user = new User(name, pass, id),
        api = new Apis();
        api.addUser(user)
        .then(
            resp => {
                api.setCurrentUser(user);
            })
        .then(
            () => {
                document.querySelector('#js-reg-form').classList.add('hidden');
                document.querySelector('#js-login-form').classList.add('hidden');
                document.querySelector('#js-logout').classList.remove('hidden');
                document.querySelector('.js-user-link').classList.remove('hidden');
            })
        .catch(err => console.error(new Error(err)));
    }
    function validateRegForm() {
        const name = document.querySelector('#js-reg-name').value,
        pass = document.querySelector('#js-reg-pass').value,
        passConfirmed = document.querySelector('#js-reg-confirm-pass').value,
        nameValidator = new Validator(name, 'Name'),
        passValidator = new Validator(pass, 'Password'),
        nameIsValid = nameValidator.validate(),
        passIsValid = passValidator.validate(),
        passIsEqual = pass === passConfirmed,
        messageBlock = document.querySelector('#js-reg-form .js-reg-form-message'),
        p = document.createElement('p');
        let status = true;

        if (nameIsValid.status === 'fail') {
            p.innerHTML = nameIsValid.text;
            p.classList.add('error');
            status = false;
        } else {
            if (passIsValid.status === 'fail') {
                p.innerHTML = passIsValid.text;
                p.classList.add('error');
                status = false;
            } else {
                if (!passIsEqual) {
                    p.innerHTML = 'Passwords are not equal';
                    p.classList.add('error');
                    status = false;
                }  else {
                    p.innerHTML = passIsValid.text;
                    p.classList.add('valid');
                }
            }
        }
        while (messageBlock.hasChildNodes()) {
            messageBlock.removeChild(messageBlock.firstChild);
        }
        messageBlock.appendChild(p);
        return status;
    }
    document.querySelector('#js-reg-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateRegForm()) {
            createUser(document.querySelector('#js-reg-name').value, document.querySelector('#js-reg-pass').value);
        }
    });
}());
