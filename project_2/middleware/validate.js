const {check, validationResult} = require('express-validator')
const userValidationRules = () => {
    return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Must be a valid email'),
    check('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    check('hobbies').isArray().withMessage('Hobbies must be an array'),
    check('location.city').notEmpty().withMessage('City is required'),
    check('location.country').notEmpty().withMessage('Country is required')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))
    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate
}