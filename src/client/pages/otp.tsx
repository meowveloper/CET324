import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/src/client/components/ui/input-otp";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/client/components/ui/card"
import { useEffect, useRef, useState } from "react";
import { OTP_EXPIRE_DURATION } from "@/src/share/consts";
import localstorage_manager from "../lib/custom/localstorage";

export default function OTP_Page() {
    const initial_expires_in = Number(localstorage_manager.get('otp_expires_in'))
    const [otp, set_otp] = useState<string>("");
    const [expires_in, set_expires_in] = useState<number>((initial_expires_in) ? initial_expires_in : OTP_EXPIRE_DURATION);
    const interval_ref = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if(interval_ref.current === null && expires_in > 0) {
            interval_ref.current = setInterval(() => {
                set_expires_in(old => (old - 1000) <= 0 ? 0 : (old - 1000));
            }, 1000)   
        }

        return () => {
            if(interval_ref.current) {
                clearInterval(interval_ref.current);
                interval_ref.current = null;
            }
        }
    },[]);

    useEffect(() => {
        console.log('setting otp expires in');
        localstorage_manager.set('otp_expires_in', `${expires_in}`);
    }, [expires_in]);

    const minutes = Math.floor(expires_in / 1000 / 60);
    const seconds = Math.floor((expires_in / 1000) % 60);

    return (
        <div className="w-full">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle>Submit your one time password</CardTitle>
                    <CardDescription>
                        We have sent a one time password to your email. Submit that to login to your account. The code will be expire in { ' ' }
                        { expires_in <= 0 ? '00:00' : `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}` }
                        
                    </CardDescription>

                    <CardContent className="flex flex-col gap-3 items-center mt-5">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(otp) => set_otp(otp)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}
