import { send_email, send_email_with_grid } from "@/src/server/services/email";
import otp_storage from "@/src/server/otp-storage";
import { OTP_EXPIRE_DURATION } from "@/src/share/consts";

declare var self: Worker;


self.onmessage = async (event: MessageEvent) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otp_storage.set(event.data, otp);
    await send_otp(event.data, otp);

    // delete otp after 15 mins
    setTimeout(() => {
        otp_storage.delete(event.data); 
    }, OTP_EXPIRE_DURATION);
};

const send_otp = async (to: string, otp: string) => {
    console.log('sending OTP to ' + to);
    const subject = `One time code/password for authentication`;
    const text = `Your one time code is "${otp}"`
    const html = `<div>Your one time code is <code>${otp}</code></div>`;
    const info = await send_email_with_grid(to, subject, text, html);
    if(info instanceof Error) console.log('failed to send otp' + info.message, info);
    else console.log('successfully send otp to ' + to);
}
