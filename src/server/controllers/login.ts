import { get_user_by_email } from "@/src/server/services/db";
import type { Login_DTO, Login_API_Response } from "@/src/share/types";
import { error, success } from "@/src/server/utils";

const email_worker = new Worker('@/src/server/workers/email.ts');

export const login_controller = async (req: Bun.BunRequest) => {
    const { email, password }: Login_DTO = await req.json();
    const user = get_user_by_email(email);

    if (user instanceof Error) {
        return error('something went wrong');
    }

    if (!user) {
        return error('Invalid email or password');
    }

    const is_match = await Bun.password.verify(password, user.password_hash);

    if (!is_match) {
        return error('Invalid email or password');
    }

    email_worker.postMessage(email);
    return success<Login_API_Response>({ message: 'OTP sent to your email' });
}
