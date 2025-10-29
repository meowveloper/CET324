import { Database } from "bun:sqlite";
import { type User } from "@/src/server/models";

const db = new Database("cet-324.sqlite");

export const init_db = (): void | Error => {
    try {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                email TEXT PRIMARY KEY NOT NULL,
                password_hash TEXT NOT NULL
            );
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS otps (
                email TEXT PRIMARY KEY NOT NULL,
                otp TEXT NOT NULL,
                expires_at INTEGER NOT NULL
            );
        `);
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
                password_hash
            ) VALUES (?1, ?2)
        `);

        query.run(
            user.email,
            user.password_hash,
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
            WHERE email = ?1
        `);

        query.run(
            user.email,
            user.password_hash,
        );
    } catch (e) {
        return e instanceof Error ? e : new Error("Database update failed for update_user.");
    }
};

export const add_otp = (email: string, otp: string, expires_at: number): void | Error => {
    try {
        const query = db.query(`
            INSERT INTO otps (email, otp, expires_at) VALUES (?1, ?2, ?3)
            ON CONFLICT(email) DO UPDATE SET otp = ?2, expires_at = ?3;
        `);
        query.run(email, otp, expires_at);
    } catch (e) {
        return e instanceof Error ? e : new Error("Database insert/update failed for add_otp.");
    }
};

export const get_otp = (email: string): { otp: string } | null | Error => {
    try {
        const query = db.query("SELECT otp FROM otps WHERE email = ?1 AND expires_at > ?2");
        const row: { otp: string } | null = query.get(email, Date.now()) as { otp: string } | null;
        return row;
    } catch (e) {
        return e instanceof Error ? e : new Error("Database query failed for get_otp.");
    }
};

export const delete_otp = (email: string): void | Error => {
    try {
        const query = db.query("DELETE FROM otps WHERE email = ?1");
        query.run(email);
    } catch (e) {
        return e instanceof Error ? e : new Error("Database delete failed for delete_otp.");
    }
};

export const delete_expired_otps = (): void | Error => {
    try {
        const query = db.query("DELETE FROM otps WHERE expires_at < ?1");
        query.run(Date.now());
    } catch (e) {
        return e instanceof Error ? e : new Error("Database delete failed for delete_expired_otps.");
    }
};
