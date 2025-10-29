import { serve } from "bun";
import index from "@/src/index.html";
import { init_db } from "@/src/server/services/db";
import { register_controller } from "./server/controllers/register";
import { otp_controller } from "@/src/server/controllers/otp";
import { logout_controller, me_controller } from "@/src/server/controllers/me";
import { login_controller } from "@/src/server/controllers/login";

const res = init_db();
if(res instanceof Error) throw res;

new Worker("@/src/server/workers/otp-cleanup.ts");

const server = serve({
    routes: {
        "/*": index,

        "/api/register": {
            POST: async (req) => await register_controller(req),
        },

        "/api/login": {
            POST: async (req) => await login_controller(req),
        },

        "/api/verify-otp": {
            POST: async (req) => await otp_controller(req),
        },

        "/api/me": {
            GET: async (req) => await me_controller(req),
        },
        
        "/api/logout": {
            GET: async (req) => await logout_controller(req)
        }
    },

    development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: true,
    },

    error(error) {
        console.log(error);
        return Response.json({ message: error.message }, {status: 500});
	},
});


console.log(`🚀 Server running at ${server.url}`);

