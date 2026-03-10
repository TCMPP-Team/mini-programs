/**
 * rgb 转 cmyk
 * @param red
 * @param green
 * @param blue
 * @returns
 */
export declare const rgb2cmyk: (red: number, green: number, blue: number) => number[];
/**
 * cmyk 转 rgb
 * @param cyan
 * @param magenta
 * @param yellow
 * @param black
 * @returns
 */
export declare const cmyk2rgb: (cyan: number, magenta: number, yellow: number, black: number) => {
    r: number;
    g: number;
    b: number;
};
/**
 * 输入色转rgb
 * @param input
 * @returns
 */
export declare const cmykInputToColor: (input: string) => string;
