const Validator = require('validator');
const _ = require('lodash');

module.exports = function ValidateMemesInput(data) {
    let errors = {};

    if(_.isEmpty(data.caption)) {
        if(_.isEmpty(data.media)) {
            errors.text = 'Meme can not be empty';
        }
    }
    return {
        errors,
        isValid: _.isEmpty(errors)
    };
};