import {SignJWT} from 'jose'


export const success = <T extends Object>(data : T) => Response.json(data);

export const error = (message: string) => Response.json({ message }, { status : 500 });

export const get_hashed_password : (password: string) => Promise<string> = 
    async (password) => await Bun.password.hash(password, {
            algorithm: 'argon2id',
            memoryCost: 65536, // 64 MiB
            timeCost: 3, // Number of iterations
    })
;


export const get_jwt_token : (email : string) => Promise<string | Error> =
    async (email) => {
        const jwt_secret = Bun.env.JWT_SECRET;
        if(!jwt_secret) return new Error('jwt secret is missing');
        const secret = new TextEncoder().encode(jwt_secret); 
        const token = await new SignJWT({ email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(secret)
        ;
        return token;
    }
;

export const set_token_cookie : (cookie_map: Bun.CookieMap, token : string) => void = (map, token) => map.set('token', token, { httpOnly : true, secure: true, sameSite: "strict" });
