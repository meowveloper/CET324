export type Register_DTO = {
    email: string;
    password: string;
}

export type Register_API_Response = {
    message: string;
}

export type VerifyOTP_DTO = {
    email: string;
    otp: string;
}

export type VerifyOTP_API_Response = {
    message: string;
}

export type Me_API_Response = {
    email: string;
}

export type Login_DTO = {
    email: string;
    password: string;
}

export type Login_API_Response = {
    message: string;
}

export type Logout_Api_Response = {
    message: string;
}
