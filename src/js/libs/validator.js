class Validator {
    constructor(inputValue, field) {
        this.data = inputValue;
        this.field = field;
        this.message = '';
    }
    validate() {
        if (this.checkValue()) {
            return this.createMessage('Thank you for registration!');
        } else {
            return this.createError(this.message);
        }
    }
    checkValue() {
        if (this.data.trim().length === 0) {
            this.message = `${this.field} field can't be empty`;
            return false;
        } else {
            if (this.field.toLowerCase() === 'password') {
                return this.passValidate();
            } else {
                return true;
            }
        }
    }

    passValidate() {
        if (this.data.trim().length < 5) {
            this.message = `${this.field} should contain at least 5 symbols`;
            return false;
        } else {
            if (this.data.match('^[A-Za-z0-9]+$')) {
                return true;
            } else {
                this.message = `${this.field} should contain only letters and numbers`;
                return false;
            }
        }
    }

    createError(err) {
        return {
            text: err,
            status: 'fail'
        };
    }

    createMessage(message) {
        return {
            text: message,
            status: 'passed'
        };
    }
}
export {Validator};
