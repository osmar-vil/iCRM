import { User } from "../entity/user";
import { env } from "../validators/env.validator";
import bcryt from "bcrypt";

export const seeder = async () => {
    try {
        const admin = await User.findOneByOrFail({ email: env.ADMINISTRATOR_EMAIL });
    } catch (error) {
        const { identifiers: [{ id }] } = await User.insert({
            name: "System Admin",
            email: env.ADMINISTRATOR_EMAIL,
            created_by: 1,
            password: await bcryt.hash(env.ADMINISTRATOR_PASSWORD, 10)
        });
        User.update(id, { created_by: id });
    }
};