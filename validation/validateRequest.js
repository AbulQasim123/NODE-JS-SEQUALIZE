const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters',
        'string.max': 'Name must be at most 30 characters'
    }),

    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email format is invalid'
    }),

    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 6 characters'
    }),

    bio: Joi.string().min(6).required().messages({
        'string.empty': 'Bio cannot be empty',
        'string.min': 'Bio must be at least 6 characters'
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email format is invalid'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password cannot be empty'
    }),
});

module.exports = { registerSchema, loginSchema };


// Default validator
// const registerSchema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//     age: Joi.number().integer().min(18).max(100).optional()
// });