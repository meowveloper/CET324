import { useState, type FormEvent } from "react";
import { type Register_API_Response, type Register_DTO } from "@/src/share/types";
import fetcher from "@/src/client/lib/custom/fetcher";

export default function use_register() {
    const [email, set_email] = useState<string>('');
    const [password, set_password] = useState<string>('');
    const [confirm_password, set_confirm_password] = useState<string>('');
    const [register_error, set_register_error] = useState<string>('');
    const [loading, set_loading] = useState<boolean>(false);

    async function register(data: Register_DTO) {
        try {
            set_loading(true);
            set_register_error('');
            if (password !== confirm_password) set_register_error('unmatched passwords');
            else {
                const res = await fetcher<Register_API_Response>('/api/register', 'POST', { body: data });
                if (res instanceof Error) set_register_error(res.message);
                else {
                    console.log(res.message);
                    set_register_error('');
                }
            }
        } finally {
            set_loading(false);
        }
    }

    return {
        email,
        set_email,
        password,
        set_password,
        confirm_password,
        set_confirm_password,
        loading,
        register_error,
        register
    }
}


