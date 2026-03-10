import { TdPopoverProps } from './type';
import { SuperComponent } from '../common/src/index';
export interface PopoverProps extends TdPopoverProps {
}
export default class Popover extends SuperComponent {
    behaviors: string[];
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    properties: TdPopoverProps;
    data: {
        prefix: string;
        classPrefix: string;
        _placement: string;
        contentStyle: string;
        arrowStyle: string;
    };
    controlledProps: {
        key: string;
        event: string;
    }[];
    observers: {
        visible(val: boolean): void;
        'placement, realVisible'(v: boolean): void;
    };
    methods: {
        onScroll(): void;
        updateVisible(visible: boolean): void;
        onOverlayTap(): void;
        getToward(placement: string): {
            isHorizontal: string;
            isVertical: string;
            isBase: string;
            isEnd: boolean;
        };
        calcArrowStyle(placement: string, contentDom: any, popoverDom: any): string;
        calcContentPosition(placement: string, triggerRect: any, contentRect: any): {
            top: number;
            left: number;
        };
        alignCrossAxis(start: number, triggerSize: number, contentSize: number, align: 'start' | 'end' | 'center'): number;
        calcPlacement(placement: string, triggerRect: any, contentRect: any): any;
        computePosition(): Promise<void>;
    };
}
