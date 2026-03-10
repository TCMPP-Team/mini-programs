/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
/// <reference types="miniprogram-api-typings" />
interface WxWorkSystemInfo extends WechatMiniprogram.SystemInfo {
    environment?: 'wxwork';
}
interface SystemInfo extends WxWorkSystemInfo {
}
export declare const systemInfo: WechatMiniprogram.WindowInfo | SystemInfo;
export declare const appBaseInfo: WechatMiniprogram.AppBaseInfo | SystemInfo;
export declare const deviceInfo: WechatMiniprogram.DeviceInfo | SystemInfo;
declare type Context = WechatMiniprogram.Page.TrivialInstance | WechatMiniprogram.Component.TrivialInstance;
export declare const debounce: (func: any, wait?: number) => (...rest: any[]) => void;
export declare const throttle: (func: any, wait?: number, options?: any) => (...args: any[]) => void;
export declare const classNames: (...args: any[]) => string;
export declare const styles: (styleObj: any) => string;
export declare const getAnimationFrame: (context: any, cb: Function) => any;
export declare const getRect: (context: any, selector: string, needAll?: boolean) => Promise<any>;
interface TreeNode {
    children?: TreeNode[];
    [key: string]: any;
}
export declare const getTreeDepth: (tree: TreeNode[], key?: string) => any;
export declare const isIOS: () => boolean;
/**
 * 判断是否是为企微环境
 * 企微环境 wx.getSystemInfoSync() 接口会额外返回 environment 字段（微信中不返回）
 * https://developer.work.weixin.qq.com/document/path/91511
 */
export declare const isWxWork: boolean;
export declare const isPC: boolean;
export declare const addUnit: (value?: string | number) => string | undefined;
/**
 * 计算字符串字符的长度并可以截取字符串。
 * @param char 传入字符串（maxcharacter条件下，一个汉字表示两个字符）
 * @param max 规定最大字符串长度
 * @returns 当没有传入maxCharacter/maxLength 时返回字符串字符长度，当传入maxCharacter/maxLength时返回截取之后的字符串和长度。
 */
export declare const getCharacterLength: (type: string, char: string | number, max?: number) => {
    length: number;
    characters: string;
};
export declare const chunk: (arr: any[], size: number) => any[][];
export declare const getInstance: (context?: Context, selector?: string) => WechatMiniprogram.Component.TrivialInstance;
export declare const unitConvert: (value: number | string | null | undefined) => number;
export declare const setIcon: (iconName: any, icon: any, defaultIcon: any) => {
    [x: string]: any;
};
export declare const toCamel: (str: any) => any;
export declare const getCurrentPage: <T>() => T & WechatMiniprogram.OptionalInterface<WechatMiniprogram.Page.ILifetime> & WechatMiniprogram.Page.InstanceProperties & WechatMiniprogram.Page.InstanceMethods<WechatMiniprogram.IAnyObject> & WechatMiniprogram.Page.Data<WechatMiniprogram.IAnyObject> & WechatMiniprogram.IAnyObject;
export declare const uniqueFactory: (compName: any) => () => string;
export declare const calcIcon: (icon: string | Record<string, any>, defaultIcon?: string) => Record<string, any>;
export declare const isOverSize: (size: any, sizeLimit: any) => boolean;
export declare const rpx2px: (rpx: any) => number;
export declare const nextTick: () => Promise<void>;
export {};
