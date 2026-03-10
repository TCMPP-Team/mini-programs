import { SuperComponent } from '../common/src/index';
export default class Navbar extends SuperComponent {
    externalClasses: string[];
    timer: any;
    options: {
        multipleSlots: boolean;
    };
    properties: import("./type").TdNavbarProps;
    observers: {
        visible(this: Navbar, visible: any): void;
        'title,titleMaxLength'(this: any): void;
    };
    data: {
        prefix: string;
        classPrefix: string;
        boxStyle: string;
        showTitle: string;
        hideLeft: boolean;
        hideCenter: boolean;
        _menuRect: any;
        _leftRect: any;
        _boxStyle: {};
    };
    attached(): void;
    detached(): void;
    methods: {
        initStyle(): void;
        calcCenterStyle(leftRect: WechatMiniprogram.BoundingClientRectResult, menuRect: WechatMiniprogram.BoundingClientRectResult, defaultStyle: object): void;
        getLeftRect(): void;
        getMenuRect(): void;
        onMenuButtonBoundingClientRectWeightChange(): void;
        offMenuButtonBoundingClientRectWeightChange(): void;
        /**
         * 比较胶囊条和navbar内容，决定是否隐藏
         * @param capsuleRect API返回值，胶囊条的位置信息
         */
        queryElements(capsuleRect: WechatMiniprogram.OnMenuButtonBoundingClientRectWeightChangeListenerResult): void;
        goBack(): void;
    };
}
