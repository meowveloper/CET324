import type { Me_API_Response } from "@/src/share/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import fetcher from "../lib/custom/fetcher";

type AuthContextType = {
    email: string | null;
    is_loading: boolean;
    check_user: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [email, set_email] = useState<string | null>(null);
    const [is_loading, set_is_loading] = useState(true);

    const check_user = useCallback(async () => {
        set_is_loading(true);
        try {
            const data = await fetcher<Me_API_Response>('/api/me', 'GET', {});
            if (data instanceof Error) {
                console.error(data.message);
                set_email(null);
            } else {
                set_email(data.email);
            }
        } finally {
            set_is_loading(false);
        }
    }, []);

    useEffect(() => {
        check_user();
    }, [check_user]);

    return (
        <AuthContext.Provider value={{ email, is_loading, check_user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const use_auth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('use_auth must be used within an AuthProvider');
    }
    return context;
};
