import { Database } from "bun:sqlite";
import { type User } from "@/src/server/models";

const db = new Database("cet-324.sqlite");

export const init_db = (): void | Error => {
    try {
        const query = db.query(`
            CREATE TABLE IF NOT EXISTS users (
                email TEXT PRIMARY KEY NOT NULL,
                password_hash TEXT NOT NULL
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
