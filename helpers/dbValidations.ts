import { sendEmail } from "../mailer/mailer";
import User, { IUser } from "../models/user";

export const emailExist = async (email: string): Promise<void> => {
    const emailExist: IUser | null = await User.findOne({ email });
    if(emailExist && emailExist.verified) {
        throw new Error(`El correo ${email} ya existe`)
    } else if(emailExist && !emailExist.verified) {
        await sendEmail(email, emailExist.code as string);
        throw new Error(`Usuario registrado. El código de verificación se ha enviado de nuevo a ${email}`);
    }
};