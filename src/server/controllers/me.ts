import { error, success, verify_jwt_token } from "@/src/server/utils";
import type { Me_API_Response } from "@/src/share/types";

export const me_controller = async (req: Bun.BunRequest) => {
    const token = req.cookies.get('token');

    if (!token) {
        return error("Unauthorized");
    }

    const payload = await verify_jwt_token(token);

    if (payload instanceof Error) {
        console.error(payload)
        return error(payload.message);
    }

    return success<Me_API_Response>({ email: payload.email });
};

export const logout_controller = async (req: Bun.BunRequest) => {
    try {
        req.cookies.delete('token');
        return success('successfully logged out');
    } catch (e) {
        return error("something went wrong");
    }
};
