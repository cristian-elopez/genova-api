import jwt from "jsonwebtoken";

export const jwtGenerator = (id: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = {id};
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY!,
            { expiresIn: "4h" },
            (err: Error | null, token: string | undefined) => {
                if (err) {
                    console.log(err);
                    reject("Error generating token");
                } else {
                    resolve(token as string);
                }
            }
        )
    });
};