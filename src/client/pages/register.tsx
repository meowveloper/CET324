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

export default function Register_Page() {
    const { captcha, is_valid_captcha, set_captcha_answer, captcha_answer, captcha_error } = use_captcha();
    return (
        <div>
            <div className="w-full lg:w-5/12 mx-auto my-32">
                <Card className="w-full max-w-sm">
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
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="confirm_password">Confirm Password</Label>
                                    </div>
                                    <Input id="confirm_password" type="password" required />
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
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button onClick={handle_register} type="button" className="w-full">
                            Register
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
    async function handle_register() {
        is_valid_captcha(captcha, captcha_answer);
    }
}
