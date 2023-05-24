import joi from 'joi';

export const userSchema = joi.object({
    id:joi.number(),
    password:joi
    .string().required().min(5).max(20),
    email:joi
    .string().email().required(),
    image: joi.object().required(),
})