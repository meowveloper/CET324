import { serve } from "bun";
import index from "@/src/index.html";
import { init_db } from "@/src/server/services/db";

const res = init_db();
if(res instanceof Error) throw res;
const server = serve({
    routes: {
        "/*": index,

        "/api/register": {
            async POST(req) {
                return Response.json({
                    message: 'you have registered'
                });
            }
        },
    },

    development: process.env.NODE_ENV !== "production" && {
        // Enable browser hot reloading in development
        hmr: true,

        // Echo console logs from the browser to the server
        console: true,
    },

    error(error) {
	    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
		    headers: {
			    'Content-Type': 'text/html',
		    },
	    });
	},
});


console.log(`🚀 Server running at ${server.url}`);
