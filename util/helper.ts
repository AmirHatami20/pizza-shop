export const toPersianNumber = (number: number | null | undefined, split: boolean = true): string => {
    if (number == null) return "۰";

    const convertDigits = (input: string): string =>
        input.replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

    if (split) {
        const withCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
        return convertDigits(withCommas);
    } else {
        return convertDigits(number.toString());
    }
};
