import { type Register_API_Response, type Register_DTO } from "@/src/share/types";

export const register : (data: Register_DTO) => Promise<void> =
async (data) => {
    const res = await fetcher<Register_API_Response>('/api/register', 'POST' , { body : data });
    console.log(res);
}

async function fetcher<T>(url : string, method: Method_Type, { body }: Optionals_Type) : Promise<T | Error> {
    try {
        const options : RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            method,
            credentials: "include",
            body: (method === 'POST' && body) ? JSON.stringify(body) : undefined
        };

        
        const res = await fetch(url, options);
        if(!res.ok) return new Error('error fetching ' + url);
        const data = await res.json();
        return data as T;
    } catch (e) {
        if(e instanceof Error) return e;
        else return new Error('error fetching ' + url);
    }
}

type Method_Type = "GET" | "PUT" | "POST" | "DELETE";

type Optionals_Type = {
    body? : object
}
