import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: Bun.env.SMTP_HOST,
    port: Number(Bun.env.SMTP_PORT),
    secure: Number(Bun.env.SMTP_PORT) === 465,
    auth: {
        user: Bun.env.SMTP_USER,
        pass: Bun.env.SMTP_PASS,
    },
});

export type EmailSuccess = {
    message_id: string;
};

type SendEmail = (to: string, subject: string, text: string, html: string) => Promise<EmailSuccess | Error>;

export const send_email: SendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"CET-324 Authentication System"`,
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
