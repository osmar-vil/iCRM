import { Joi, Segments, celebrate } from "celebrate";

export class UserValidator {
    create = celebrate({
        [Segments.BODY]: {
            name: Joi.string().trim().required(),
            last_name: Joi.string().trim(),
            email: Joi.string().email().required(),
            password: Joi.string().trim().min(8).required(),
        }
    })

    auth = celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().trim().min(8).required(),
        }
    })

    update = celebrate({
        [Segments.BODY]: {
            name: Joi.string().trim(),
            last_name: Joi.string().trim(),
            email: Joi.string().email(),
            password: Joi.string().trim().min(8),
        }
    })
}