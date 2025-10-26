import { useEffect, useState } from "react";

export default function use_captcha() {
    const [captcha, set_captcha] = useState<Captcha | Error>(generate_captcha());
    const [captcha_answer, set_captcha_answer] = useState<string>('');
    const [captcha_error, set_captcha_error] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            set_captcha(generate_captcha());
        }, 6000 * 10 * 3)

        return () => clearInterval(interval);
    }, []);

    const is_valid_captcha : (captcha: Captcha | Error, captcha_answer: string) => boolean =
        () => {
            const is_valid = captcha instanceof Error ? false : Number(captcha_answer) === captcha.answer;
            set_captcha_error(is_valid ? '' : 'invalid captcha');
            return is_valid;
        }

    return { captcha, is_valid_captcha, captcha_answer, set_captcha_answer , captcha_error }
}

export interface Captcha {
    id: string;
    question: string;
    answer: number;
}

export const generate_captcha = (): Captcha | Error => {
    try {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        
        const captcha: Captcha = {
            id: `${new Date().getTime()}`,
            question: `Are you a human? Then, what is ${num1} + ${num2}?`,
            answer: num1 + num2,
        };

        return captcha;
    } catch (e) {
        return e instanceof Error ? e : new Error('Failed to generate CAPTCHA');
    }
};
