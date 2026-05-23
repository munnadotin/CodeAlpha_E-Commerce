import slugify from "slugify";
import crypto from "crypto";

export const generateSlug = (name: string) => {
    const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
    });

    const unique = crypto.randomBytes(2).toString("hex");
    return `${slug.slice(0, 50)}-${unique}`;
};