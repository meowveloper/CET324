import { useState } from "react";
import { type VerifyOTP_API_Response, type VerifyOTP_DTO } from "@/src/share/types";
import fetcher from "@/src/client/lib/custom/fetcher";

export default function use_otp() {
    const [otp, set_otp] = useState<string>('');
    const [error, set_error] = useState<string>('');
    const [loading, set_loading] = useState<boolean>(false);

    async function verify_otp(data: VerifyOTP_DTO): Promise<boolean> {
        try {
            set_loading(true);
            set_error('');
            const res = await fetcher<VerifyOTP_API_Response>('/api/verify-otp', 'POST', { body: data });
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
        otp,
        set_otp,
        loading,
        error,
        verify_otp
    }
}
