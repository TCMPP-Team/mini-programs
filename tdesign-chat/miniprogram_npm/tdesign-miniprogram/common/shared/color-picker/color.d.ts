import tinyColor from 'tinycolor2/esm/tinycolor';
import { GradientColors, GradientColorPoint } from './gradient';
export interface ColorObject {
    alpha: number;
    css: string;
    hex: string;
    hex8: string;
    hsl: string;
    hsla: string;
    hsv: string;
    hsva: string;
    rgb: string;
    rgba: string;
    saturation: number;
    value: number;
    isGradient: boolean;
    linearGradient?: string;
}
interface ColorStates {
    s: number;
    v: number;
    h: number;
    a: number;
}
interface GradientStates {
    colors: GradientColorPoint[];
    degree: number;
    selectedId: string;
    css?: string;
}
/**
 * 将渐变对象转换成字符串
 * @param object
 * @returns
 */
export declare const gradientColors2string: (object: GradientColors) => string;
/**
 * 去除颜色的透明度
 * @param color
 * @returns
 */
export declare const getColorWithoutAlpha: (color: string) => any;
export declare const genId: () => string;
/**
 * 生成一个渐变颜色
 * @param left
 * @param color
 * @returns
 */
export declare const genGradientPoint: (left: number, color: string) => GradientColorPoint;
export declare class Color {
    states: ColorStates;
    originColor: string;
    isGradient: boolean;
    gradientStates: GradientStates;
    constructor(input: string);
    update(input: string): void;
    get saturation(): number;
    set saturation(value: number);
    get value(): number;
    set value(value: number);
    get hue(): number;
    set hue(value: number);
    get alpha(): number;
    set alpha(value: number);
    get rgb(): string;
    get rgba(): string;
    get hsv(): string;
    get hsva(): string;
    get hsl(): string;
    get hsla(): string;
    get hex(): any;
    get hex8(): any;
    get cmyk(): string;
    get css(): string;
    get linearGradient(): string;
    get gradientColors(): GradientColorPoint[];
    set gradientColors(colors: GradientColorPoint[]);
    get gradientSelectedId(): string;
    set gradientSelectedId(id: string);
    get gradientDegree(): number;
    set gradientDegree(degree: number);
    get gradientSelectedPoint(): GradientColorPoint;
    getFormatsColorMap(): {
        HEX: any;
        CMYK: string;
        RGB: string;
        RGBA: string;
        HSL: string;
        HSLA: string;
        HSV: string;
        HSVA: string;
        CSS: string;
        HEX8: any;
    };
    updateCurrentGradientColor(): false | this;
    updateStates(input: string): void;
    getRgba(): {
        r: number;
        g: number;
        b: number;
        a: tinyColor.ColorFormats.RGBA;
    };
    getCmyk(): {
        c: number;
        m: number;
        y: number;
        k: number;
    };
    getHsva(): tinyColor.ColorFormats.HSVA;
    getHsla(): tinyColor.ColorFormats.HSLA;
    /**
     * 判断输入色是否与当前色相同
     * @param color
     * @returns
     */
    equals(color: string): boolean;
    /**
     * 校验输入色是否是一个有效颜色
     * @param color
     * @returns
     */
    static isValid(color: string): boolean;
    static hsva2color(h: number, s: number, v: number, a: number): any;
    static hsla2color(h: number, s: number, l: number, a: number): any;
    static rgba2color(r: number, g: number, b: number, a: number): any;
    static hex2color(hex: string, a: number): any;
    /**
     * 对象转颜色字符串
     * @param object
     * @param format
     * @returns
     */
    static object2color(object: any, format: string): any;
    /**
     * 是否是渐变色
     * @param input
     * @returns
     */
    static isGradientColor: (input: string) => boolean;
    /**
     * 比较两个颜色是否相同
     * @param color1
     * @param color2
     * @returns
     */
    static compare: (color1: string, color2: string) => boolean;
}
/**
 * 获取对外输出的color对象
 * @param color
 * @returns
 */
export declare const getColorObject: (color: Color) => ColorObject;
export default Color;
