import { SuperComponent, RelationsOptions, ComponentsOptionsType } from '../common/src/index';
import { PickerItemOption } from './type';
export default class PickerItem extends SuperComponent {
    relations: RelationsOptions;
    options: ComponentsOptionsType;
    externalClasses: string[];
    properties: import("./type").TdPickerItemProps;
    observers: {
        'options, keys'(): void;
    };
    data: {
        prefix: string;
        classPrefix: string;
        offset: number;
        duration: number;
        value: string;
        curIndex: number;
        columnIndex: number;
        keys: {};
        formatOptions: PickerItemOption[];
        enableVirtualScroll: boolean;
        visibleOptions: any[];
        virtualStartIndex: number;
        virtualOffsetY: number;
        totalHeight: number;
        itemHeight: number;
        visibleItemCount: number;
        wrapperPaddingY: number;
    };
    lifetimes: {
        created(): void;
        detached(): void;
    };
    methods: {
        onClickItem(event: WechatMiniprogram.TouchEvent): void;
        onTouchStart(event: any): void;
        onTouchMove(event: any): void;
        onTouchEnd(event: any): void;
        formatOption(options: PickerItemOption[], columnIndex: number, format: any): any[];
        updateSelected(index: number, trigger: boolean): void;
        update(): void;
        /**
         * 计算虚拟滚动的可见范围
         * @param offset 当前滚动偏移量
         * @param totalCount 总选项数量
         * @param itemHeight 单个选项高度
         * @param isFastScroll 是否为快速滑动
         */
        computeVirtualRange(offset: number, totalCount: number, itemHeight: number, isFastScroll?: boolean): {
            startIndex: number;
            endIndex: number;
        };
        /**
         * 更新虚拟滚动的可见选项
         * @param offset 当前滚动偏移量（可选，不传则使用 data.offset）
         * @param isFastScroll 是否为快速滑动
         */
        updateVisibleOptions(offset?: number, isFastScroll?: boolean): void;
        getCount(): any;
        getCurrentSelected(): {
            index: number;
            value: any;
            label: any;
        };
    };
}
