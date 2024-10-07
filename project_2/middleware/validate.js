const {check, validationResult} = require('express-validator')
const userValidationRules = () => {
    return [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Must be a valid email'),
        check('registration_date').isISO8601().withMessage('Registration date must be a valid date'),
        check('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
        check('is_active').isBoolean().withMessage('Is active must be a boolean'),
        check('hobbies').notEmpty().withMessage('Hobbies must be an array'),
        check('location.city').notEmpty().withMessage('City is required'),
        check('location.country').notEmpty().withMessage('Country is required'),
        check('location')
        .exists()
        .withMessage('Location is required')
        .bail()
        .isObject()
        .withMessage('Location must be an object')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()) {
        return next()
    }
    console.error(errors)
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))
    return res.status(412).json({
        success: false,
        message: 'Validation failed',
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate
}