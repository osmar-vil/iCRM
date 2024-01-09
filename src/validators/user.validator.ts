import { Joi, Segments, celebrate } from "celebrate";

export class UserValidator {
    create = celebrate({
        [Segments.BODY]: {
            name: Joi.string().trim().required(),
            last_name: Joi.string().trim(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        }
    })
}