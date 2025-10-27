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

export default function Login_Page() {
    const { captcha, is_valid_captcha, set_captcha_answer, captcha_answer, captcha_error } = use_captcha();
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
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
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
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handle_login} type="button" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );

    async function handle_login() {
        is_valid_captcha(captcha, captcha_answer);
    }
}
