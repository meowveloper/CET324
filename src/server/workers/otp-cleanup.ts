import { delete_expired_otps } from "@/src/server/services/db";

declare var self: Worker;

const cleanup = () => {
    const res = delete_expired_otps();
    if (res instanceof Error) {
        console.error("Failed to clean up expired OTPs:", res);
    } else {
        console.log("Cleaned up expired OTPs.");
    }
};

// Run cleanup every hour
setInterval(cleanup, 60 * 60 * 1000);

// Initial cleanup on start
cleanup();

self.onmessage = (event: MessageEvent) => {
    // This worker doesn't need to receive messages, but the onmessage handler is required.
};
