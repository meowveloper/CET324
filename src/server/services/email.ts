import nodemailer from 'nodemailer';
import sgMail from "@sendgrid/mail"
sgMail.setApiKey(Bun.env.SEND_GRID_API_KEY!);

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

export const send_email_with_grid = async (to: string, subject: string, text: string, html: string) : Promise<void | Error> => {
    try {
        const msg = {
            from: Bun.env.SEND_GRID_EMAIL!,
            to,
            subject,
            html,
            text,
        }
        await sgMail.send(msg);
    } catch (e) {
        return e instanceof Error ? e : new Error('error sending emails');
    }
}
