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

export default function Register_Page() {
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
                    <CardContent>
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
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
