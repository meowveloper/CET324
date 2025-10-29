import { serve } from "bun";
import index from "@/src/index.html";
import { init_db } from "@/src/server/services/db";
import { register_controller } from "./server/controllers/register";
import { otp_controller } from "./server/controllers/otp";

const res = init_db();
if(res instanceof Error) throw res;

new Worker("@/src/server/workers/otp-cleanup.ts");

const server = serve({
    routes: {
        "/*": index,

        "/api/register": {
            POST: async (req) => await register_controller(req),
        },

        "/api/verify-otp": {
            POST: async (req) => await otp_controller(req),
        },
    },

    development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: false,
    },

    error(error) {
        console.log(error);
        return Response.json({ message: error.message }, {status: 500});
	},
});


console.log(`🚀 Server running at ${server.url}`);

