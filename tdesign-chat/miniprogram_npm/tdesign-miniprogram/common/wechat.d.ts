export declare const getObserver: (context: any, selector: string) => Promise<WechatMiniprogram.IntersectionObserverObserveCallbackResult>;
/**
 * 背景：单页模式下, getWindowInfo、getAppBaseInfo、getDeviceInfo 等接口均返回 undefined。
 * 复现路径：分享到朋友圈，再打开单页模式的该页面，wx.getWindowInfo() 等接口返回 undefined
 * 代码片段：https://developers.weixin.qq.com/s/mzvZ8FmH7vVW
 */
export declare const getWindowInfo: () => WechatMiniprogram.WindowInfo | WechatMiniprogram.SystemInfo;
export declare const getAppBaseInfo: () => WechatMiniprogram.SystemInfo | WechatMiniprogram.AppBaseInfo;
export declare const getDeviceInfo: () => WechatMiniprogram.SystemInfo | WechatMiniprogram.DeviceInfo;
