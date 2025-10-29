import { get_jwt_token, set_token_cookie, success, error } from "@/src/server/utils";
import type { VerifyOTP_DTO, VerifyOTP_API_Response } from "@/src/share/types";
import { get_otp, delete_otp } from "@/src/server/services/db";

export const otp_controller = async (req: Bun.BunRequest) => {
    const { email, otp }: VerifyOTP_DTO = await req.json();

    if (!email || !otp) {
        return error("Email and OTP are required");
    }

    const stored_otp_res = get_otp(email);
    if(stored_otp_res instanceof Error) return error(stored_otp_res.message);

    if (!stored_otp_res) {
        return error("No OTP found for this user");
    }

    if (stored_otp_res.otp !== otp) {
        return error("Invalid OTP");
    }

    delete_otp(email);

    const token = await get_jwt_token(email);
    if (token instanceof Error) {
        return error(token.message);
    }

    const cookie_map = req.cookies;
    set_token_cookie(cookie_map, token);

    return success<VerifyOTP_API_Response>({ message: "OTP verified successfully" });
};
