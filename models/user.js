const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
}

let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
}

let usernameLengthChecker = (username) => {
    if(!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
}

let validUsernameChecker = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 60) {
            return false;
        } else {
            return true;
        }
    }
}

let validPasswordChecker = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/);
        return regExp.test(password);
    }
}

let validNameChecker = (name) => {
    if (!name) {
        return false;
    } else {
        const regExp = new RegExp(/\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}[a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/);
        return regExp.test(name);
    }
}

let nameLengthChecker = (name) => {
    if (!name) {
        return false;
    } else {
        if (name.length < 1 || name.length > 35) {
            return false;
        } else {
            return true;
        }
    }
}

let jobTitleChecker = (jobTitle) => {
    if (!jobTitle) {
        return false;
    } else {
        const regExp = RegExp(/^([a-zA-Z ]){1,35}$/);
        return regExp.test(jobTitle);
    }
}

let jobLengthChecker = (jobTitle) => {
    if (!jobTitle) {
        return false;
    } else {
        if (jobTitle.length < 1 || jobTitle.length > 35) {
            return false;
        } else {
            return true;
        }
    }
}

const emailValidators = [
    {
        validator: emailLengthChecker, 
        message: 'Email must be at least 5 characters but no more than 30',
    },
    {
        validator: validEmailChecker, 
        message: 'Must be a valid email',
    }
];

const usernameValidators = [
    {
        validator: usernameLengthChecker, 
        message: 'Username must be at least 3 characters but no more than 15',
    },
    {
        validator: validUsernameChecker,
        message: 'Username must not contain special character',
    }
];

const nameValidators = [
    {
        validator: validNameChecker,
        message: 'Must be a real name',
    },
    {
        validator: nameLengthChecker,
        message: 'Must be at least 1 letter long but no more than 35',
    }
];

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters long but no more than 60',
    },
    {
        validator: validPasswordChecker,
        message: 'Password must contain at least: 1 special character, 1 uppercase letter, 1 lowercase letter and 1 number',
    }
];

const jobTitleValidators = [
    {
        validator: jobTitleChecker,
        message: 'Must be a valid job title',
    },
    {
        validator: jobLengthChecker,
        message: 'Must be at least 1 letter long but no more than 35',
    },
];

const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: usernameValidators,
    },
    fullName: {
        type: String,
        required: true,
        validate: nameValidators,
    },
    jobTitle: {
        type: String,
        required: true,
        validate: jobTitleValidators,
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidators,
    },
    participatingProjects: {
        type: Array,
    },
});

userSchema.pre('save', function (next) { // before saving the user
    if (!this.isModified('password')) { // check if their password has been changed
        return next();
    }

    bcrypt.hash(this.password, null, null, (err, hash) => { // if yes, then encrypt their new one
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);