const Joi = require('joi');

const bookSchema = Joi.object({
    book: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        year: Joi.number().required(),
        price:Joi.number().required().min(0),
        ISBN: Joi.string().required(),
        description: Joi.string().optional().allow(''),
        image: Joi.string().optional().allow(''),
    }).required()
})

module.exports.bookSchema = bookSchema;