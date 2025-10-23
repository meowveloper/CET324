import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export type EmailSuccess = {
    message_id: string;
};

type SendEmail = (to: string, subject: string, text: string, html: string) => Promise<EmailSuccess | Error>;

export const send_email: SendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Auth System" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            text,
        });

        return { message_id: info.messageId };
    } catch (error) {
        return error instanceof Error ? error : new Error('Failed to send email');
    }
};
