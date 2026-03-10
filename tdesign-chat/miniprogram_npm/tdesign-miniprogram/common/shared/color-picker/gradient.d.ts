export interface GradientColorPoint {
    id?: string;
    color?: string;
    left?: number;
}
export interface GradientColors {
    points: GradientColorPoint[];
    degree: number;
}
/**
 * 验证是否是渐变字符串
 * @param input
 * @returns
 */
export declare const isGradientColor: (input: string) => null | RegExpExecArray;
/**
 * 解析渐变字符串为 GradientColors 对象
 * @param input
 * @returns
 */
export declare const parseGradientString: (input: string) => GradientColors | boolean;
export default parseGradientString;
