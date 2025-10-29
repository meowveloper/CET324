import { send_email_with_grid } from "@/src/server/services/email";
import { add_otp } from "@/src/server/services/db";
import { OTP_EXPIRE_DURATION } from "@/src/share/consts";

declare var self: Worker;

self.onmessage = async (event: MessageEvent) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = Date.now() + OTP_EXPIRE_DURATION;
    add_otp(event.data, otp, expires_at);
    await send_otp(event.data, otp);
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
