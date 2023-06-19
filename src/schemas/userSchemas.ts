import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
	password: Joi.string().required()
})

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
	password: Joi.string().required()
})