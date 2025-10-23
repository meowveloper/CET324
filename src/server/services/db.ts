import { Database } from "bun:sqlite";
import { type User } from "@/src/server/models";

const db = new Database("cet-324.sqlite");

export const init_db = (): void | Error => {
    try {
        const query = db.query(`
            CREATE TABLE IF NOT EXISTS users (
                email TEXT PRIMARY KEY NOT NULL,
                password_hash TEXT NOT NULL,
                permissions TEXT NOT NULL,
                is_verified INTEGER NOT NULL DEFAULT 0,
                totp_secret TEXT,
                registration_otp TEXT,
                registration_otp_expires TEXT
            );
        `);
        query.run();
    } catch (e) {
        return e instanceof Error ? e : new Error("Database initialization failed");
    }
};


// We need to handle the conversion between the DB row and the User object
const row_to_user = (row: any): User | Error => {
    try {
        return {
            email: row.email,
            password_hash: row.password_hash,
            permissions: JSON.parse(row.permissions), // This can throw
            is_verified: Boolean(row.is_verified),
            totp_secret: row.totp_secret,
            registration_otp: row.registration_otp,
            registration_otp_expires: row.registration_otp_expires ? new Date(row.registration_otp_expires) : null
        };
    } catch (e) {
        return e instanceof Error ? e : new Error("Failed to parse user data from database row.");
    }
};

export const get_user_by_email = (email: string): User | null | Error => {
    try {
        const query = db.query("SELECT * FROM users WHERE email = ?1");
        const row: unknown = query.get(email);

        if (!row) {
            return null;
        }
        return row_to_user(row);
    } catch (e) {
        return e instanceof Error ? e : new Error("Database query failed for get_user_by_email.");
    }
};

export const add_user = (user: User): void | Error => {
    try {
        const query = db.query(`
            INSERT INTO users (
                email,
                password_hash,
                permissions,
                is_verified,
                totp_secret,
                registration_otp,
                registration_otp_expires
            ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
        `);

        query.run(
            user.email,
            user.password_hash,
            JSON.stringify(user.permissions),
            Number(user.is_verified),
            user.totp_secret,
            user.registration_otp,
            user.registration_otp_expires?.toISOString() ?? null
        );
    } catch (e) {
        return e instanceof Error ? e : new Error("Database insert failed for add_user.");
    }
};

export const update_user = (user: User): void | Error => {
    try {
        const query = db.query(`
            UPDATE users
            SET
                password_hash = ?2,
                permissions = ?3,
                is_verified = ?4,
                totp_secret = ?5,
                registration_otp = ?6,
                registration_otp_expires = ?7
            WHERE email = ?1
        `);

        query.run(
            user.email,
            user.password_hash,
            JSON.stringify(user.permissions),
            Number(user.is_verified),
            user.totp_secret,
            user.registration_otp,
            user.registration_otp_expires?.toISOString() ?? null
        );
    } catch (e) {
        return e instanceof Error ? e : new Error("Database update failed for update_user.");
    }
};
