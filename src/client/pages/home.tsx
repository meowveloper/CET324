
import { Button } from "@/src/client/components/ui/button";
import { NavLink } from "react-router";
import { use_auth } from "@/src/client/context/auth-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/src/client/components/ui/avatar"
import fetcher from "@/src/client/lib/custom/fetcher";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/client/components/ui/card"
import type { Logout_Api_Response } from "@/src/share/types";
import { Spinner } from "@/src/client/components/ui/spinner";
import { useState } from "react";


export default function Home_Page() {
    const auth_context = use_auth();
    const [loading, set_loading] = useState<boolean>(false)

    return (
        <div className="container mx-auto p-8 text-center relative z-10">
            <div className="flex justify-center items-center gap-8 mb-8">
                <Card className="w-full max-w-sm mx-auto">
                    <CardHeader>
                        <div className="uppercase">
                            {auth_context.email ? (
                                'you are logged in!!'
                            ) : (
                                'you are not logged in!!'
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 items-center mt-5">
                        {
                            auth_context.email
                                ?
                                (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                {auth_context.email}
                                            </div>
                                        </div>
                                        <Button onClick={logout}>
                                            {loading && <Spinner />}
                                            Logout
                                        </Button>
                                    </div>
                                )
                                :
                                (
                                    <Button>
                                        <NavLink to={'/login'}>Go to login page</NavLink>
                                    </Button>
                                )
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    );
    async function logout () {
        set_loading(true);
        await fetcher<Logout_Api_Response>('/api/logout', 'GET', {});
        await auth_context.check_user();
        set_loading(false);
    }
}

