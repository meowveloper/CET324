import { send_email } from "@/src/server/services/email";
import otp_storage from "@/src/server/otp-storage";

declare var self: Worker;


self.onmessage = async (event: MessageEvent) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otp_storage.set(event.data, otp);
    await send_otp(event.data, otp);

    // delete otp after 15 mins
    setTimeout(() => {
        otp_storage.delete(event.data); 
    }, 1000 * 60 * 15);
};

const send_otp = async (to: string, otp: string) => {
    const subject = `One time code/password for authentication`;
    const text = `Your one time code is "${otp}"`
    const html = `<div>Your one time code is <code>${otp}</code></div>`;
    const info = await send_email(to, subject, text, html);
    if(info instanceof Error) throw new Error('failed to send otp');
    else console.log('successfully send otp. message_id: ', info.message_id);
}
