import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    API: z.string().trim(),
    VERSION: z.string().trim(),

    PORT: z.string().trim().max(4).transform( x => Number(x) ).default("8080"),

    ADMINISTRATOR_EMAIL: z.string().email(),
    ADMINISTRATOR_PASSWORD: z.string().trim().min(8),

    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_TIME: z.string().min(1).transform( x => Number(x) ).default("1"),
})

const parse = envSchema.safeParse(process.env)

if (!parse.success) {
    const message: string[] = [ "Missing or invalid environment variable(s):" ];

    parse.error.errors.map(x => message.push(`  - ${x.path}: ${x.message}`));

    console.error( message.join("\n") );
    process.exit(1);
}

export const env = parse.data;