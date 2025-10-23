export interface User {
    email: string;
    password_hash: string;
    permissions: string[];
    is_verified: boolean;
    totp_secret: string | null;

    registration_otp: string | null;
    registration_otp_expires: Date | null;
}
