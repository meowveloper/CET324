
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
        if(!res.ok) {
            const error = await res.json();
            if('message' in error) return new Error(error.message);
            else return new Error('something went wrong');
        }
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

export default fetcher;
