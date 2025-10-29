import sgMail from "@sendgrid/mail"
sgMail.setApiKey(Bun.env.SEND_GRID_API_KEY!);


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
