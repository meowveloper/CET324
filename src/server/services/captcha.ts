export interface Captcha {
    question: string;
    answer: number;
}

export const generate_captcha = (): Captcha | Error => {
    try {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        
        const captcha: Captcha = {
            question: `What is ${num1} + ${num2}?`,
            answer: num1 + num2,
        };

        return captcha;
    } catch (e) {
        return e instanceof Error ? e : new Error('Failed to generate CAPTCHA');
    }
};
