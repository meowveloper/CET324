const keys = ['otp_email', 'otp_expires_in'] as const;

const localstorage_manager = {
    get (key : typeof keys[number]) {
        return window.localStorage.getItem(key);
    },
    set(key: typeof keys[number], val: string) {
        window.localStorage.setItem(key, val);
    }
}

export default localstorage_manager;
