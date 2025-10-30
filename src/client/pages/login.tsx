import { Input } from "@/src/client/components/ui/input";
import { Label } from "@/src/client/components/ui/label"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/client/components/ui/card"
import { Button } from "@/src/client/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import use_captcha from "@/src/client/hooks/use-captcha";
import { Alert, AlertDescription } from "@/src/client/components/ui/alert";
import use_login from "@/src/client/hooks/use-login";
import { type FormEvent } from "react";
import localstorage_manager from "@/src/client/lib/custom/localstorage";
import { Spinner } from "@/src/client/components/ui/spinner";
import use_redirect_if_login from "@/src/client/hooks/use-redirect-if-login";

export default function Login_Page() {
    const {email, password, set_email, set_password, loading, login, error} = use_login()
    const { captcha, is_valid_captcha, set_captcha_answer, captcha_answer, captcha_error } = use_captcha();
    const navigate = useNavigate();

    use_redirect_if_login();

    async function handle_login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!is_valid_captcha(captcha, captcha_answer)) return;
        const success = await login({ email, password });
        if(success) {
            localstorage_manager.set('otp_email', email);
            navigate('/auth');
        }
    }
    return (
        <div className="w-full">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <NavLink to="/register" end>Register</NavLink>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <form onSubmit={handle_login}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    value={email}
                                    onChange={e => set_email(e.target.value)}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    value={password}
                                    onChange={e => set_password(e.target.value)}
                                    id="password"
                                    type="password"
                                    required />
                            </div>
                            {error && (
                                <Alert variant={'destructive'} className="border-none p-0">
                                    <AlertDescription>
                                        <p>{error}</p>
                                    </AlertDescription>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full">
                                {loading && <Spinner />} 
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {
                        captcha instanceof Error ? (
                            <div className="w-full">
                                Error generating captcha
                            </div>
                        ) : (
                            <div className="w-full space-y-1">
                                <p className="text-sm">
                                    {captcha.question}
                                </p>
                                <Input type="text" onChange={e => set_captcha_answer(e.target.value)} value={captcha_answer} placeholder="your answer" />
                                {captcha_error && (
                                    <Alert variant={'destructive'} className="border-none p-0">
                                        <AlertDescription>
                                            <p>{captcha_error}</p>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        )
                    }
                </CardFooter>
            </Card>
        </div>
    );

}
