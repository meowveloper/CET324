import { add_user, get_user_by_email } from "@/src/server/services/db";
import type { Register_DTO, Register_API_Response } from "@/src/share/types";
import { error, get_hashed_password, success } from "@/src/server/utils";

const email_worker = new Worker('@/src/server/workers/email.ts');

export const register_controller = async (req: Bun.BunRequest) => {
    const { email, password }: Register_DTO = await req.json();
    const old_user = get_user_by_email(email);
    if (old_user instanceof Error) return error('something went wrong');
    if (old_user) return error('user already exists');
    const password_hash = await get_hashed_password(password);
    const new_user = add_user({ email, password_hash });
    if (new_user instanceof Error) return error(new_user.message);
    email_worker.postMessage(email);
    return success<Register_API_Response>({ message: 'you have registered' });
}
