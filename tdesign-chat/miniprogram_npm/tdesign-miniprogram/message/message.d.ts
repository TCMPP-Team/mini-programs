/// <reference types="miniprogram-api-typings" />
import { SuperComponent, ComponentsOptionsType } from '../common/src/index';
import { MessageType, MessageProps } from './message.interface';
export default class Message extends SuperComponent {
    options: ComponentsOptionsType;
    properties: MessageProps;
    data: {
        prefix: string;
        classPrefix: string;
        messageList: any[];
    };
    index: number;
    instances: any[];
    gap: number;
    observers: {
        visible(value: any): void;
    };
    pageLifetimes: {
        show(): void;
    };
    lifetimes: {
        ready(): void;
    };
    /** 记录组件设置的项目 */
    memoInitialData(): void;
    /**
     * 设置消息信息
     * @param msg
     * @param theme
     */
    setMessage(msg: MessageProps, theme?: MessageType): void;
    /**
     * 新增消息
     * @param msgObj
     */
    addMessage(msgObj: MessageProps): void;
    /**
     * 获取消息显示top偏移距离
     * @param index
     * @returns
     */
    getOffsetHeight(index?: number): number;
    /**
     * 新增消息显示
     * @param options
     * @param id
     * @param offsetHeight
     * @returns
     */
    showMessageItem(options: MessageProps, id: string, offsetHeight: number): WechatMiniprogram.Component.TrivialInstance;
    close(id: any): void;
    /**
     * 移除指定消息，id为空则删除全部消息
     * @param id
     */
    hide(id?: string): void;
    /**
     * 移除全部消息
     */
    hideAll(): void;
    /**
     * 移除message实例
     */
    removeInstance(id: any): void;
    /**
     * 移除页面元素
     * @param id
     */
    removeMsg(id: any): void;
    handleClose(): void;
    handleLinkClick(): void;
    handleDurationEnd(): void;
}
