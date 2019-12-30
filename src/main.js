import {User} from './js/user.js';
import {Validator} from './js/validator.js';
import {Apis} from './js/api/api.js';
import './js/router/router-initiation.js';
(function() {
    function register(event) {
        event.preventDefault();
        const name = event.target.querySelector('#js-reg-name').value,
        pass = event.target.querySelector('#js-reg-pass').value,
        passConfirmed = event.target.querySelector('#js-reg-confirm-pass').value,
        nameValidator = new Validator('string', name, 'Name'),
        passValidator = new Validator('string', pass, 'Password'),
        nameIsValid = nameValidator.validate(),
        passIsValid = passValidator.validate(),
        passIsEqual = pass === passConfirmed,
        messageBlock = event.target.querySelector('js-reg-form-message');

        if (nameIsValid.status === 'fail') {
            const p = document.createElement('p');
            p.innerHTML = nameIsValid.text;
            p.classList.add('error');
            messageBlock.appendChild(p);
        } else {
            if (!passIsEqual) {
                const p = document.createElement('p');
                p.innerHTML = 'Passwords are not equal';
                p.classList.add('error');
                messageBlock.appendChild(p);
            }
        }
    }
    document.querySelector('#js-reg-form').addEventListener('submit', register);
}());
