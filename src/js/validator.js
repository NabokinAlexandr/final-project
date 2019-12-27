class Validator {
    constructor(type, inputValue, field) {
        this.type = type;
        this.data = inputValue;
        this.field = field;
        this.message = '';
    }
    validate() {
        if (this.checkType()) {
            this.createMessage('Thank you for registration!');
        } else {
            this.createError(this.message);
        }
    }
    checkType() {
        if (this.type === typeof(inputValue)) {
            this.checkValue ();
        } else {
            this.message = `${this.field} is not valid`;
            return false;
        }
    }

    checkValue() {
        if (this.data.trim().length === 0) {
            this.message = `${this.field} field can't be empty`;
            return false;
        } else {
            if (this.field === 'password') {
                this.passValidate();
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
