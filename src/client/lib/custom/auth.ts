import { type Register_API_Response, type Register_DTO } from "@/src/share/types";
import fetcher from "@/src/client/lib/custom/fetcher";

export const register : (data: Register_DTO) => Promise<Register_API_Response | Error> =
    async (data) => {
        return fetcher<Register_API_Response>('/api/register', 'POST' , { body : data });
    }
;




