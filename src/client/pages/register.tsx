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
import { NavLink } from "react-router";
import use_captcha from "@/src/client/hooks/use-captcha";
import { Alert, AlertDescription } from "@/src/client/components/ui/alert";
import { useState, type FormEvent } from "react";
import { register } from "../lib/custom/register";

export default function Register_Page() {
    const { captcha, is_valid_captcha, set_captcha_answer, captcha_answer, captcha_error } = use_captcha();

    const [email, set_email] = useState<string>('');
    const [password, set_password] = useState<string>('');
    const [confirm_password, set_confirm_password] = useState<string>('');
    const [register_error, set_register_error] = useState<string>('');
    return (
        <div className="w-full">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle>Register a new account</CardTitle>
                    <CardDescription>
                        Enter your email below to register a new account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <NavLink to="/login" end>Login</NavLink>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <form onSubmit={e => handle_register(e)}>
                        <div className="flex flex-col gap-6 mb-3">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={e => set_email(e.target.value)}
                                    value={email}
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
                                    onChange={e => set_password(e.target.value)}
                                    value={password}
                                    id="password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                </div>
                                <Input
                                    onChange={e => set_confirm_password(e.target.value)}
                                    value={confirm_password}
                                    id="confirm_password"
                                    type="password"
                                    required
                                />
                                {register_error && (
                                    <Alert variant={'destructive'} className="border-none p-0">
                                        <AlertDescription>
                                            <p>{register_error}</p>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
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
                                <p className="text-sm">
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
    async function handle_register(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!is_valid_captcha(captcha, captcha_answer)) return;
        if (password !== confirm_password) set_register_error('unmatched passwords');
        await register({ email, password });
    }
}
