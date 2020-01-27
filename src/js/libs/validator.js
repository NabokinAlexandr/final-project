class Validator {
    constructor(inputValue, fieldName) {
        this.data = inputValue;
        this.fieldName = fieldName;
        this.message = '';
    }
    validate() {
        if (this.checkValue()) {
            return {
                text: 'Thank you for registration!',
                status: 'passed'
            };
        } else {
            return {
                text: this.message,
                status: 'fail'
            };
        }
    }
    checkValue() {
        if (this.data.trim().length === 0) {
            this.message = `${this.fieldName} field can't be empty`;
            return false;
        } else {
            if (this.fieldName.toLowerCase() === 'password') {
                return this.passValidate();
            } else {
                return true;
            }
        }
    }

    passValidate() {
        if (this.data.trim().length < 5) {
            this.message = `${this.fieldName} should contain at least 5 symbols`;
            return false;
        } else {
            if (this.data.match('^[A-Za-z0-9]+$')) {
                return true;
            } else {
                this.message = `${this.fieldName} should contain only letters and numbers`;
                return false;
            }
        }
    }
}
export {Validator};
