import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, code: string): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        from: process.env.EMAIL_USER
    });
    const mailOptions = {
        name: process.env.PROYECT_NAME,
        adress: process.env.EMAIL_USER,
        to,
        subject: `Código de verificacion para ${process.env.PROYECT_NAME}`,
        text: `
            Hola!
            Por medio de este correo te hemos enviado un código de verificación para tu cuenta de ${process.env.PROYECT_NAME}.
            El código es: ${code}
            Gracias!
            ${process.env.PROYECT_NAME}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch (error) {
        console.log("Error sending email", error);
    }
};