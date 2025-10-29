import { useState } from "react";
import { type Login_API_Response, type Login_DTO } from "@/src/share/types";
import fetcher from "@/src/client/lib/custom/fetcher";

export default function use_login() {
    const [email, set_email] = useState<string>('');
    const [password, set_password] = useState<string>('');
    const [error, set_error] = useState<string>('');
    const [loading, set_loading] = useState<boolean>(false);

    async function login(data: Login_DTO) {
        try {
            set_loading(true);
            set_error('');
            const res = await fetcher<Login_API_Response>('/api/login', 'POST', { body: data });
            if (res instanceof Error) {
                set_error(res.message);
                return false;
            }
            
            console.log(res.message);
            set_error('');
            return true;
        } finally {
            set_loading(false);
        }
    }

    return {
        email,
        set_email,
        password,
        set_password,
        loading,
        error,
        login
    }
}
