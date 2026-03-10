import { RelationsOptions, SuperComponent } from '../common/src/index';
export default class PullDownRefresh extends SuperComponent {
    pixelRatio: number;
    startPoint: {
        pageX: number;
        pageY: number;
    } | null;
    isPulling: boolean;
    /** 开始刷新 - 刷新成功/失败 最大间隔时间setTimeout句柄 */
    maxRefreshAnimateTimeFlag: number;
    /** 关闭动画耗时setTimeout句柄 */
    closingAnimateTimeFlag: number;
    /** 恢复刷新状态句柄 */
    refreshStatusTimer: any;
    externalClasses: string[];
    behaviors: string[];
    options: {
        multipleSlots: boolean;
        pureDataPattern: RegExp;
    };
    relations: RelationsOptions;
    properties: import("./type").TdPullDownRefreshProps;
    data: {
        prefix: string;
        classPrefix: string;
        distanceTop: number;
        barHeight: number;
        tipsHeight: number;
        refreshStatus: number;
        loosing: boolean;
        enableToRefresh: boolean;
        scrollTop: number;
        _maxBarHeight: number;
        _loadingBarHeight: number;
    };
    lifetimes: {
        attached(): void;
        detached(): void;
    };
    observers: {
        value(val: any): void;
        barHeight(val: any): void;
        maxBarHeight(v: any): void;
        loadingBarHeight(v: any): void;
    };
    methods: {
        updateDistanceTop(): void;
        resetTimer(): void;
        onScrollToBottom(): void;
        onScrollToTop(): void;
        onScroll(e: any): void;
        onTouchStart(e: WechatMiniprogram.Component.TrivialInstance): void;
        onTouchMove(e: WechatMiniprogram.Component.TrivialInstance): void;
        onTouchEnd(e: WechatMiniprogram.Component.TrivialInstance): void;
        onDragStart(e: WechatMiniprogram.ScrollViewDragStart): void;
        onDragging(e: WechatMiniprogram.ScrollViewDragging): void;
        onDragEnd(e: WechatMiniprogram.ScrollViewDragEnd): void;
        doRefresh(): void;
        setRefreshBarHeight(value: number): Promise<unknown>;
        setScrollTop(scrollTop: number): void;
        scrollToTop(): void;
    };
}
